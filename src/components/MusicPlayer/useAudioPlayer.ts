import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchSongUrl } from './api';
import type { PlayMode, Track } from './types';

const VOLUME_KEY = 'gy_music_volume';
const MODE_KEY = 'gy_music_mode';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(() => {
    const raw = localStorage.getItem(VOLUME_KEY);
    const parsed = raw ? Number.parseFloat(raw) : NaN;
    return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0.6;
  });
  const [mode, setMode] = useState<PlayMode>(() => {
    const raw = localStorage.getItem(MODE_KEY) as PlayMode | null;
    return raw ?? 'loop';
  });
  const [errorText, setErrorText] = useState<string | null>(null);

  const currentTrack = index >= 0 ? queue[index] : undefined;

  if (!audioRef.current && typeof window !== 'undefined') {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
    audioRef.current.crossOrigin = 'anonymous';
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    localStorage.setItem(VOLUME_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

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

      let url = track.url ?? null;
      if (!url && track.source === 'netease') {
        url = await fetchSongUrl(track.id);
      }

      if (!url) {
        setLoading(false);
        setErrorText('该歌曲暂无可播放源，已自动跳过');
        setTimeout(() => {
          setIndex((current) => {
            const target = ((current + 1) % workingList.length + workingList.length) % workingList.length;
            void playIndex(target, workingList);
            return current;
          });
        }, 800);
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
    },
    [queue],
  );

  const playTrack = useCallback(
    async (track: Track, list?: Track[]) => {
      const workingList = list && list.length ? list : [track];
      setQueue(workingList);
      const target = workingList.findIndex((t) => t.id === track.id);
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
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
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
