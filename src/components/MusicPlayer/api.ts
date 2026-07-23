import type { Playlist, SearchResult, Track } from './types';

const API_ENDPOINTS = [
  'https://netease-cloud-music-api-alpha-mocha.vercel.app',
  'https://music-api-lyart.vercel.app',
  'https://netease-cloud-music-api-woad-sigma-32.vercel.app',
];

const STORAGE_KEY = 'gy_music_api_endpoint';
const REQUEST_TIMEOUT = 6000;

const CHART_PRESETS: Array<{ id: number; name: string; badge?: string }> = [
  { id: 3778678, name: '飙升榜', badge: '每日更新' },
  { id: 3779629, name: '新歌榜', badge: '每日更新' },
  { id: 19723756, name: '热歌榜', badge: '每周更新' },
  { id: 2884035, name: '原创榜', badge: '每周更新' },
];

function timeoutFetch(url: string, ms = REQUEST_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function tryEndpoints<T>(path: string, parse: (data: unknown) => T): Promise<T> {
  const preferred = localStorage.getItem(STORAGE_KEY);
  const ordered = preferred
    ? [preferred, ...API_ENDPOINTS.filter((e) => e !== preferred)]
    : API_ENDPOINTS;

  let lastError: unknown;
  for (const base of ordered) {
    try {
      const res = await timeoutFetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as unknown;
      const result = parse(json);
      localStorage.setItem(STORAGE_KEY, base);
      return result;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('All music API endpoints failed');
}

function normalizeArtist(artists: Array<{ name?: string } | undefined> | undefined): string {
  if (!artists || !artists.length) return '未知歌手';
  return artists
    .map((a) => a?.name ?? '')
    .filter(Boolean)
    .join(' / ');
}

interface RawTrack {
  id?: number | string;
  name?: string;
  ar?: Array<{ name?: string }>;
  artists?: Array<{ name?: string }>;
  al?: { name?: string; picUrl?: string };
  album?: { name?: string; picUrl?: string };
  dt?: number;
  duration?: number;
}

function mapTrack(raw: RawTrack): Track {
  return {
    id: raw.id ?? '',
    name: raw.name ?? '未知歌曲',
    artist: normalizeArtist(raw.ar ?? raw.artists),
    album: raw.al?.name ?? raw.album?.name,
    cover: raw.al?.picUrl ?? raw.album?.picUrl,
    duration: Math.round((raw.dt ?? raw.duration ?? 0) / 1000),
    source: 'netease',
  };
}

export async function fetchChartList(chartId: number): Promise<Playlist> {
  return tryEndpoints(`/playlist/detail?id=${chartId}`, (data) => {
    const d = data as {
      playlist?: {
        id?: number;
        name?: string;
        description?: string;
        coverImgUrl?: string;
        tracks?: RawTrack[];
        updateFrequency?: string;
      };
    };
    const playlist = d.playlist;
    if (!playlist) throw new Error('Invalid playlist response');
    return {
      id: playlist.id ?? chartId,
      name: playlist.name ?? '热榜',
      description: playlist.description,
      cover: playlist.coverImgUrl,
      updateFrequency: playlist.updateFrequency,
      tracks: (playlist.tracks ?? []).slice(0, 50).map(mapTrack),
    };
  });
}

export async function fetchAllCharts(): Promise<Array<{ id: number; name: string; badge?: string }>> {
  return CHART_PRESETS;
}

export async function searchTracks(keyword: string, limit = 30): Promise<SearchResult> {
  if (!keyword.trim()) return { tracks: [], total: 0 };
  return tryEndpoints(
    `/cloudsearch?keywords=${encodeURIComponent(keyword)}&limit=${limit}`,
    (data) => {
      const d = data as {
        result?: {
          songs?: RawTrack[];
          songCount?: number;
        };
      };
      const songs = d.result?.songs ?? [];
      return {
        tracks: songs.map(mapTrack),
        total: d.result?.songCount ?? songs.length,
      };
    },
  );
}

export async function fetchSongUrl(id: number | string): Promise<string | null> {
  try {
    return await tryEndpoints(`/song/url/v1?id=${id}&level=standard`, (data) => {
      const d = data as { data?: Array<{ url?: string | null }> };
      const url = d.data?.[0]?.url;
      return url ?? null;
    });
  } catch {
    return null;
  }
}

export const DEMO_TRACKS: Track[] = [
  {
    id: 'demo-1',
    name: 'Sunny',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    cover: 'https://www.bensound.com/bensound-img/sunny.jpg',
    url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
    source: 'demo',
    duration: 143,
  },
  {
    id: 'demo-2',
    name: 'Creative Minds',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    cover: 'https://www.bensound.com/bensound-img/creativeminds.jpg',
    url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
    source: 'demo',
    duration: 147,
  },
  {
    id: 'demo-3',
    name: 'Ukulele',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    cover: 'https://www.bensound.com/bensound-img/ukulele.jpg',
    url: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
    source: 'demo',
    duration: 146,
  },
  {
    id: 'demo-4',
    name: 'Memories',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    cover: 'https://www.bensound.com/bensound-img/memories.jpg',
    url: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
    source: 'demo',
    duration: 234,
  },
  {
    id: 'demo-5',
    name: 'Acoustic Breeze',
    artist: 'Bensound',
    album: 'Royalty Free Music',
    cover: 'https://www.bensound.com/bensound-img/acousticbreeze.jpg',
    url: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
    source: 'demo',
    duration: 157,
  },
];

export const DEMO_PLAYLIST: Playlist = {
  id: 'demo',
  name: '演示歌单',
  description: '在线音源不可用时的降级列表（Bensound 免版权音乐）',
  tracks: DEMO_TRACKS,
  updateFrequency: '本地内置',
};
