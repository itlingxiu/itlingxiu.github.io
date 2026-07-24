'use client';

import { storageGet, storageSet, storageRemove } from '@/lib/safeStorage';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CustomerServiceOutlined,
  PauseOutlined,
  CaretRightOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  RetweetOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  RedoOutlined,
  SearchOutlined,
  FireOutlined,
  SoundOutlined,
  CloseOutlined,
  LoadingOutlined,
  ReloadOutlined,
  DragOutlined,
} from '@ant-design/icons';
import { DEMO_PLAYLIST, fetchAllCharts, fetchChartList, searchTracks } from './api';
import { useAudioPlayer } from './useAudioPlayer';
import { useDraggable } from './useDraggable';
import { PLATFORMS } from './types';
import type { PlayMode, Platform, Playlist, TabKey, Track } from './types';
import './index.less';

const PANEL_SIZE = { width: 360, height: 520 };
const BALL_SIZE = { width: 60, height: 60 };
const BALL_INITIAL = () => ({
  x: Math.max(24, (typeof window !== 'undefined' ? window.innerWidth : 1440) - 84),
  y: Math.max(24, (typeof window !== 'undefined' ? window.innerHeight : 900) - 180),
});
const PANEL_INITIAL = () => ({
  x: Math.max(24, (typeof window !== 'undefined' ? window.innerWidth : 1440) - PANEL_SIZE.width - 24),
  y: Math.max(24, (typeof window !== 'undefined' ? window.innerHeight : 900) - PANEL_SIZE.height - 24),
});

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const MODE_CONFIG: Record<PlayMode, { icon: React.ReactNode; label: string; next: PlayMode }> = {
  order: { icon: <ThunderboltOutlined />, label: '顺序', next: 'loop' },
  loop: { icon: <RetweetOutlined />, label: '列表循环', next: 'random' },
  random: { icon: <SyncOutlined />, label: '随机', next: 'single' },
  single: { icon: <RedoOutlined />, label: '单曲循环', next: 'order' },
};

const CHART_STORAGE_KEY = 'gy_music_chart_cache';
const CHART_TTL_MS = 6 * 60 * 60 * 1000;

interface ChartCache {
  time: number;
  data: Record<number, Playlist>;
}

function readChartCache(): ChartCache {
  try {
    const raw = storageGet(CHART_STORAGE_KEY);
    if (!raw) return { time: 0, data: {} };
    const parsed = JSON.parse(raw) as ChartCache;
    return parsed;
  } catch {
    return { time: 0, data: {} };
  }
}

function writeChartCache(cache: ChartCache) {
  try {
    storageSet(CHART_STORAGE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
}

const MusicPlayer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<TabKey>('playing');

  const ballDrag = useDraggable({
    storageKey: 'gy_music_ball_pos',
    initial: BALL_INITIAL(),
    size: BALL_SIZE,
    padding: 12,
  });
  const panelDrag = useDraggable({
    storageKey: 'gy_music_panel_pos',
    initial: PANEL_INITIAL(),
    size: PANEL_SIZE,
    padding: 12,
  });

  const player = useAudioPlayer();

  const [charts] = useState<Array<{ id: number; name: string; badge?: string }>>([
    { id: 3778678, name: '飙升榜', badge: '每日更新' },
    { id: 3779629, name: '新歌榜', badge: '每日更新' },
    { id: 19723756, name: '热歌榜', badge: '每周更新' },
    { id: 2884035, name: '原创榜', badge: '每周更新' },
  ]);
  const [activeChartId, setActiveChartId] = useState<number>(3778678);
  const [chartData, setChartData] = useState<Record<number, Playlist>>(() => readChartCache().data);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState('');
  const [searchPlatform, setSearchPlatform] = useState<Platform>(() => {
    const raw = storageGet('gy_music_search_platform');
    return (raw as Platform) || 'netease';
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<Track[]>([]);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    storageSet('gy_music_search_platform', searchPlatform);
  }, [searchPlatform]);

  useEffect(() => {
    void fetchAllCharts();
  }, []);

  const loadChart = useCallback(
    async (id: number, force = false) => {
      const cache = readChartCache();
      const isFresh = Date.now() - cache.time < CHART_TTL_MS;
      if (!force && isFresh && cache.data[id]) {
        setChartData(cache.data);
        return;
      }
      setChartLoading(true);
      setChartError(null);
      try {
        const playlist = await fetchChartList(id);
        const next: ChartCache = {
          time: Date.now(),
          data: { ...(isFresh ? cache.data : {}), [id]: playlist },
        };
        writeChartCache(next);
        setChartData(next.data);
      } catch (err) {
        console.warn('[MusicPlayer] load chart failed', err);
        setChartError('在线音源加载失败，已切换到本地演示歌单');
        setChartData((prev) => ({ ...prev, [id]: DEMO_PLAYLIST }));
      } finally {
        setChartLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!expanded) return;
    if (tab === 'chart' && !chartData[activeChartId]) {
      void loadChart(activeChartId);
    }
  }, [activeChartId, chartData, expanded, loadChart, tab]);

  useEffect(() => {
    if (tab !== 'search') return;
    if (!keyword.trim()) {
      setSearchResult([]);
      setSearchError(null);
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(null);
      try {
        const result = await searchTracks(keyword.trim(), searchPlatform, 30);
        setSearchResult(result.tracks);
      } catch (err) {
        console.warn('[MusicPlayer] search failed', err);
        setSearchError('该平台搜索暂时不可用，试试切换其他平台');
        setSearchResult([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [keyword, searchPlatform, tab]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!expanded) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        void player.toggle();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        player.next();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        player.prev();
      } else if (e.code === 'Escape') {
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, player]);

  const currentPlaylist = chartData[activeChartId];
  const activeList: Track[] = useMemo(() => currentPlaylist?.tracks ?? [], [currentPlaylist]);

  const openPanel = useCallback(() => {
    setExpanded(true);
    setPanelInitialIfNeeded();
  }, []);

  const setPanelInitialIfNeeded = () => {
    // Panel drag handles its own persisted position; no-op wrapper for readability.
  };

  const handleBallPointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      ballDrag.handlers.onPointerUp(event);
      if (!ballDrag.hasMoved()) {
        openPanel();
      }
    },
    [ballDrag, openPanel],
  );

  const progressPct = player.duration ? (player.currentTime / player.duration) * 100 : 0;

  const handleSeekClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!player.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    player.seek(ratio * player.duration);
  };

  const cycleMode = () => player.setMode(MODE_CONFIG[player.mode].next);

  const renderTrackRow = (track: Track, listIndex: number, list: Track[]) => {
    const isActive = player.currentTrack?.id === track.id;
    return (
      <button
        key={`${track.source}-${track.id}`}
        type="button"
        className={`gy-music-track ${isActive ? 'is-active' : ''}`}
        onClick={() => void player.playTrack(track, list)}
      >
        <span className="gy-music-track-index">{isActive && player.playing ? <SoundOutlined /> : listIndex + 1}</span>
        {track.cover ? (
          <img className="gy-music-track-cover" src={track.cover} alt="" loading="lazy" />
        ) : (
          <span className="gy-music-track-cover placeholder">
            <CustomerServiceOutlined />
          </span>
        )}
        <span className="gy-music-track-meta">
          <span className="gy-music-track-name" title={track.name}>{track.name}</span>
          <span className="gy-music-track-artist" title={track.artist}>{track.artist}</span>
        </span>
        {track.duration ? <span className="gy-music-track-time">{formatTime(track.duration)}</span> : null}
      </button>
    );
  };

  const renderPlaying = () => {
    if (!player.currentTrack) {
      return (
        <div className="gy-music-empty">
          <CustomerServiceOutlined className="gy-music-empty-icon" />
          <p>还没有正在播放的歌曲</p>
          <p className="gy-music-empty-hint">去「热榜」或「搜索」挑一首吧</p>
        </div>
      );
    }
    return (
      <div className="gy-music-playing">
        <div className="gy-music-playing-hero">
          <div className={`gy-music-playing-cover ${player.playing ? 'is-spin' : ''}`}>
            {player.currentTrack.cover ? (
              <img src={player.currentTrack.cover} alt="" />
            ) : (
              <CustomerServiceOutlined />
            )}
          </div>
          <div className="gy-music-playing-info">
            <div className="gy-music-playing-title" title={player.currentTrack.name}>{player.currentTrack.name}</div>
            <div className="gy-music-playing-artist" title={player.currentTrack.artist}>{player.currentTrack.artist}</div>
            {player.currentTrack.album ? (
              <div className="gy-music-playing-album" title={player.currentTrack.album}>专辑 · {player.currentTrack.album}</div>
            ) : null}
          </div>
        </div>

        <div className="gy-music-progress">
          <span className="gy-music-progress-time">{formatTime(player.currentTime)}</span>
          <div className="gy-music-progress-bar" onClick={handleSeekClick} role="slider" aria-valuemin={0} aria-valuemax={player.duration} aria-valuenow={player.currentTime} tabIndex={0}>
            <div className="gy-music-progress-fill" style={{ width: `${progressPct}%` }} />
            <div className="gy-music-progress-thumb" style={{ left: `${progressPct}%` }} />
          </div>
          <span className="gy-music-progress-time">{formatTime(player.duration)}</span>
        </div>

        <div className="gy-music-queue">
          <div className="gy-music-queue-title">
            <span>播放列表 · {player.queue.length} 首</span>
          </div>
          <div className="gy-music-queue-scroll">
            {player.queue.length ? (
              player.queue.map((t, i) => renderTrackRow(t, i, player.queue))
            ) : (
              <div className="gy-music-empty small">播放列表为空</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderChart = () => (
    <div className="gy-music-chart">
      <div className="gy-music-chart-tabs">
        {charts.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`gy-music-chip ${c.id === activeChartId ? 'is-active' : ''}`}
            onClick={() => setActiveChartId(c.id)}
          >
            <FireOutlined />
            <span>{c.name}</span>
            {c.badge ? <em>{c.badge}</em> : null}
          </button>
        ))}
        <button
          type="button"
          className="gy-music-chip refresh"
          onClick={() => void loadChart(activeChartId, true)}
          title="刷新榜单"
          aria-label="刷新榜单"
        >
          <ReloadOutlined />
        </button>
      </div>
      {chartError ? <div className="gy-music-inline-error">{chartError}</div> : null}
      <div className="gy-music-list">
        {chartLoading && !currentPlaylist ? (
          <div className="gy-music-empty">
            <LoadingOutlined className="gy-music-empty-icon" />
            <p>正在加载榜单…</p>
          </div>
        ) : activeList.length ? (
          activeList.map((t, i) => renderTrackRow(t, i, activeList))
        ) : (
          <div className="gy-music-empty">
            <FireOutlined className="gy-music-empty-icon" />
            <p>暂无数据</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="gy-music-search">
      <div className="gy-music-search-input">
        <SearchOutlined />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索歌曲 / 歌手 / 专辑"
          aria-label="搜索歌曲"
        />
        {keyword ? (
          <button type="button" className="gy-music-search-clear" onClick={() => setKeyword('')} aria-label="清空">
            <CloseOutlined />
          </button>
        ) : null}
      </div>
      {searchError ? <div className="gy-music-inline-error">{searchError}</div> : null}
      <div className="gy-music-list">
        {searchLoading ? (
          <div className="gy-music-empty">
            <LoadingOutlined className="gy-music-empty-icon" />
            <p>正在搜索…</p>
          </div>
        ) : keyword && !searchResult.length ? (
          <div className="gy-music-empty">
            <SearchOutlined className="gy-music-empty-icon" />
            <p>没有找到相关结果</p>
          </div>
        ) : !keyword ? (
          <div className="gy-music-empty">
            <SearchOutlined className="gy-music-empty-icon" />
            <p>输入关键词开始搜索</p>
            <p className="gy-music-empty-hint">支持歌曲名、歌手、专辑</p>
          </div>
        ) : (
          searchResult.map((t, i) => renderTrackRow(t, i, searchResult))
        )}
      </div>
    </div>
  );

  return (
    <>
      {!expanded && (
        <div
          className={`gy-music-ball ${ballDrag.dragging ? 'is-dragging' : ''} ${player.playing ? 'is-playing' : ''}`}
          style={{ left: ballDrag.position.x, top: ballDrag.position.y }}
          onPointerDown={ballDrag.handlers.onPointerDown}
          onPointerMove={ballDrag.handlers.onPointerMove}
          onPointerUp={handleBallPointerUp}
          onPointerCancel={ballDrag.handlers.onPointerCancel}
          role="button"
          aria-label="打开音乐播放器"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openPanel();
            }
          }}
        >
          <span className="gy-music-ball-ring" aria-hidden="true" />
          {player.currentTrack?.cover ? (
            <img src={player.currentTrack.cover} alt="" className={`gy-music-ball-cover ${player.playing ? 'is-spin' : ''}`} />
          ) : (
            <CustomerServiceOutlined className="gy-music-ball-icon" />
          )}
          {player.playing ? (
            <span className="gy-music-ball-eq" aria-hidden="true">
              <i /><i /><i />
            </span>
          ) : null}
        </div>
      )}

      {expanded && (
        <div
          className="gy-music-panel"
          style={{ left: panelDrag.position.x, top: panelDrag.position.y, width: PANEL_SIZE.width, height: PANEL_SIZE.height }}
          role="dialog"
          aria-label="音乐播放器"
        >
          <div
            className={`gy-music-panel-header ${panelDrag.dragging ? 'is-dragging' : ''}`}
            onPointerDown={panelDrag.handlers.onPointerDown}
            onPointerMove={panelDrag.handlers.onPointerMove}
            onPointerUp={panelDrag.handlers.onPointerUp}
            onPointerCancel={panelDrag.handlers.onPointerCancel}
          >
            <div className="gy-music-panel-title">
              <span className="gy-music-panel-drag" aria-hidden="true"><DragOutlined /></span>
              <span>光影音乐</span>
              <em>可拖拽 · Space 播放/暂停</em>
            </div>
            <button
              type="button"
              className="gy-music-icon-btn"
              aria-label="收起"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="gy-music-tabs" role="tablist">
            {(
              [
                { key: 'playing', label: '正在播放', icon: <CustomerServiceOutlined /> },
                { key: 'chart', label: '热榜', icon: <FireOutlined /> },
                { key: 'search', label: '搜索', icon: <SearchOutlined /> },
              ] as Array<{ key: TabKey; label: string; icon: React.ReactNode }>
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={tab === item.key}
                className={`gy-music-tab ${tab === item.key ? 'is-active' : ''}`}
                onClick={() => setTab(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="gy-music-panel-body">
            {tab === 'playing' && renderPlaying()}
            {tab === 'chart' && renderChart()}
            {tab === 'search' && renderSearch()}
          </div>

          {player.errorText ? (
            <div className="gy-music-panel-toast">{player.errorText}</div>
          ) : null}

          <div className="gy-music-controls">
            <button type="button" className="gy-music-icon-btn" onClick={cycleMode} title={MODE_CONFIG[player.mode].label} aria-label={`播放模式：${MODE_CONFIG[player.mode].label}`}>
              {MODE_CONFIG[player.mode].icon}
            </button>
            <button type="button" className="gy-music-icon-btn" onClick={player.prev} aria-label="上一首">
              <StepBackwardOutlined />
            </button>
            <button
              type="button"
              className="gy-music-play-btn"
              onClick={() => void player.toggle()}
              aria-label={player.playing ? '暂停' : '播放'}
              disabled={player.loading}
            >
              {player.loading ? <LoadingOutlined /> : player.playing ? <PauseOutlined /> : <CaretRightOutlined />}
            </button>
            <button type="button" className="gy-music-icon-btn" onClick={player.next} aria-label="下一首">
              <StepForwardOutlined />
            </button>
            <div className="gy-music-volume" title={`音量 ${Math.round(player.volume * 100)}%`}>
              <SoundOutlined />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={player.volume}
                onChange={(e) => player.setVolume(Number(e.target.value))}
                aria-label="音量"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
