'use client';
import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchCover, fetchSongUrl } from './api';
import type { PlayMode, Platform, Track } from './types';

const VOLUME_KEY = 'gy_music_volume';
const MODE_KEY = 'gy_music_mode';

/**
 * 移动端浏览器（iOS Safari / 部分 Android WebView）要求 <audio> 必须在
 * 用户手势的同步栈内首次调用 play() 才能"解锁"。若首帧解锁失败，之后
 * 经过任何 await 的异步 play() 都会被静音或阻塞。
 * 此函数在首次 pointer/touch 事件里同步调用 play()，用一个 1 帧静默
 * data URI 兑现"用户手势"的授权，之后所有编程式 play() 都可以出声。
 */
const SILENT_WAV =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

function attachAudioUnlock(audio: HTMLAudioElement) {
  let unlocked = false;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    const originalSrc = audio.src;
    const originalMuted = audio.muted;
    try {
      audio.muted = true;
      audio.src = SILENT_WAV;
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = originalMuted;
          if (originalSrc) audio.src = originalSrc;
        }).catch(() => {
          audio.muted = originalMuted;
          if (originalSrc) audio.src = originalSrc;
        });
      }
    } catch {
      /* ignore */
    }
    window.removeEventListener('touchstart', unlock, true);
    window.removeEventListener('touchend', unlock, true);
    window.removeEventListener('pointerdown', unlock, true);
    window.removeEventListener('click', unlock, true);
  };
  window.addEventListener('touchstart', unlock, { capture: true, passive: true });
  window.addEventListener('touchend', unlock, { capture: true, passive: true });
  window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
  window.addEventListener('click', unlock, { capture: true });
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(() => {
    const raw = storageGet(VOLUME_KEY);
    const parsed = raw ? Number.parseFloat(raw) : NaN;
    return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0.6;
  });
  const [mode, setMode] = useState<PlayMode>(() => {
    const raw = storageGet(MODE_KEY) as PlayMode | null;
    return raw ?? 'loop';
  });
  const [errorText, setErrorText] = useState<string | null>(null);

  const currentTrack = index >= 0 ? queue[index] : undefined;

  if (!audioRef.current && typeof window !== 'undefined') {
    const audio = new Audio();
    audio.preload = 'metadata';
    // 不能设置 crossOrigin='anonymous'：多数音源没有 CORS 头，
    // 设为 anonymous 会让浏览器拒绝加载媒体（iOS / Safari 表现为无声）。
    audio.setAttribute('playsinline', 'true');
    (audio as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    audioRef.current = audio;
    attachAudioUnlock(audio);
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    storageSet(VOLUME_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    storageSet(MODE_KEY, mode);
  }, [mode]);

  const patchTrack = useCallback((trackId: Track['id'], patch: Partial<Track>) => {
    setQueue((prev) => prev.map((t) => (t.id === trackId ? { ...t, ...patch } : t)));
  }, []);

  const playIndex = useCallback(
    async (nextIndex: number, list?: Track[]) => {
      const workingList = list ?? queue;
      if (!workingList.length) return;
      const safeIndex = ((nextIndex % workingList.length) + workingList.length) % workingList.length;
      const track = workingList[safeIndex];
      const audio = audioRef.current;
      if (!audio) return;

      setIndex(safeIndex);
      setErrorText(null);
      setLoading(true);
      setPlaying(false);
      setCurrentTime(0);
      setDuration(track.duration ?? 0);

      const url = await fetchSongUrl(track);

      if (!url) {
        setLoading(false);
        setErrorText('该歌曲在当前平台暂无版权，已自动跳过');
        setTimeout(() => {
          setIndex((current) => {
            const target = ((current + 1) % workingList.length + workingList.length) % workingList.length;
            void playIndex(target, workingList);
            return current;
          });
        }, 700);
        return;
      }

      audio.src = url;
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        console.warn('[MusicPlayer] play failed', err);
        setErrorText('播放失败，浏览器可能阻止了自动播放，请再点一次');
      } finally {
        setLoading(false);
      }

      // 异步补齐封面（GD Studio 需要按 picId 二次拉取）
      if (!track.cover && track.picId && track.source !== 'demo') {
        void fetchCover(track.picId, track.source as Platform).then((cover) => {
          if (cover) patchTrack(track.id, { cover });
        });
      }
    },
    [patchTrack, queue],
  );

  const playTrack = useCallback(
    async (track: Track, list?: Track[]) => {
      const workingList = list && list.length ? list : [track];
      setQueue(workingList);
      const target = workingList.findIndex((t) => t.id === track.id && t.source === track.source);
      await playIndex(target >= 0 ? target : 0, workingList);
    },
    [playIndex],
  );

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentTrack) {
      if (queue.length) await playIndex(0);
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setErrorText('播放失败，请再试一次');
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [currentTrack, playIndex, queue.length]);

  const next = useCallback(() => {
    if (!queue.length) return;
    if (mode === 'random') {
      const rand = Math.floor(Math.random() * queue.length);
      void playIndex(rand);
    } else {
      void playIndex(index + 1);
    }
  }, [index, mode, playIndex, queue.length]);

  const prev = useCallback(() => {
    if (!queue.length) return;
    void playIndex(index - 1);
  }, [index, playIndex, queue.length]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (mode === 'single') {
        audio.currentTime = 0;
        void audio.play();
        return;
      }
      if (mode === 'order' && index >= queue.length - 1) {
        setPlaying(false);
        return;
      }
      next();
    };
    const onError = () => {
      setErrorText('音频加载失败，尝试下一首');
      setTimeout(next, 500);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [index, mode, next, queue.length]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return useMemo(
    () => ({
      queue,
      index,
      currentTrack,
      playing,
      loading,
      currentTime,
      duration,
      volume,
      mode,
      errorText,
      setVolume,
      setMode,
      playTrack,
      playIndex,
      toggle,
      next,
      prev,
      seek,
    }),
    [
      queue,
      index,
      currentTrack,
      playing,
      loading,
      currentTime,
      duration,
      volume,
      mode,
      errorText,
      playTrack,
      playIndex,
      toggle,
      next,
      prev,
      seek,
    ],
  );
}

export type PlayerApi = ReturnType<typeof useAudioPlayer>;
