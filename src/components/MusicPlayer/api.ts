import type { Platform, Playlist, SearchResult, Track } from './types';

/* ============================================================
 * 网易云榜单接口（每日/每周更新的热榜数据源，多镜像 fallback）
 * ========================================================== */
const NETEASE_ENDPOINTS = [
  'https://netease-cloud-music-api-alpha-mocha.vercel.app',
  'https://music-api-lyart.vercel.app',
  'https://netease-cloud-music-api-woad-sigma-32.vercel.app',
];

/* ============================================================
 * GD Studio 多平台聚合接口（搜索 / 播放地址 / 封面 / 歌词）
 * 覆盖：网易云 / QQ音乐 / 酷我 / 酷狗 / 咪咕
 * ========================================================== */
const GD_ENDPOINTS = [
  'https://music-api.gdstudio.xyz/api.php',
  'https://music-api.gdstudio.xyz/api.php',
];

const NETEASE_STORAGE_KEY = 'gy_music_api_endpoint';
const GD_STORAGE_KEY = 'gy_music_gd_endpoint';
const REQUEST_TIMEOUT = 8000;

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

async function tryEndpoints<T>(
  endpoints: string[],
  storageKey: string,
  buildUrl: (base: string) => string,
  parse: (data: unknown) => T,
): Promise<T> {
  const preferred = localStorage.getItem(storageKey);
  const ordered = preferred
    ? [preferred, ...endpoints.filter((e) => e !== preferred)]
    : [...new Set(endpoints)];

  let lastError: unknown;
  for (const base of ordered) {
    try {
      const res = await timeoutFetch(buildUrl(base));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as unknown;
      const result = parse(json);
      localStorage.setItem(storageKey, base);
      return result;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('All endpoints failed');
}

/* ------------------------- 网易云榜单 ------------------------- */

function normalizeArtist(artists: Array<{ name?: string } | undefined> | undefined): string {
  if (!artists || !artists.length) return '未知歌手';
  return artists
    .map((a) => a?.name ?? '')
    .filter(Boolean)
    .join(' / ');
}

interface RawNeteaseTrack {
  id?: number | string;
  name?: string;
  ar?: Array<{ name?: string }>;
  artists?: Array<{ name?: string }>;
  al?: { name?: string; picUrl?: string };
  album?: { name?: string; picUrl?: string };
  dt?: number;
  duration?: number;
}

function mapNeteaseTrack(raw: RawNeteaseTrack): Track {
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
  return tryEndpoints(
    NETEASE_ENDPOINTS,
    NETEASE_STORAGE_KEY,
    (base) => `${base}/playlist/detail?id=${chartId}`,
    (data) => {
      const d = data as {
        playlist?: {
          id?: number;
          name?: string;
          description?: string;
          coverImgUrl?: string;
          tracks?: RawNeteaseTrack[];
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
        tracks: (playlist.tracks ?? []).slice(0, 50).map(mapNeteaseTrack),
      };
    },
  );
}

export async function fetchAllCharts(): Promise<Array<{ id: number; name: string; badge?: string }>> {
  return CHART_PRESETS;
}

/* ------------------------- GD Studio 多平台 ------------------------- */

interface RawGdTrack {
  id?: string | number;
  name?: string;
  artist?: string[];
  album?: string;
  pic_id?: string;
  lyric_id?: string;
  url_id?: string;
  source?: string;
}

function mapGdTrack(raw: RawGdTrack, platform: Platform): Track {
  return {
    id: raw.id ?? raw.url_id ?? '',
    name: raw.name ?? '未知歌曲',
    artist: raw.artist && raw.artist.length ? raw.artist.filter(Boolean).join(' / ') : '未知歌手',
    album: raw.album,
    picId: raw.pic_id,
    lyricId: raw.lyric_id,
    source: platform,
  };
}

export async function searchTracks(
  keyword: string,
  platform: Platform = 'netease',
  count = 30,
): Promise<SearchResult> {
  if (!keyword.trim()) return { tracks: [], total: 0 };
  return tryEndpoints(
    GD_ENDPOINTS,
    GD_STORAGE_KEY,
    (base) =>
      `${base}?types=search&source=${platform}&name=${encodeURIComponent(keyword)}&count=${count}&pages=1`,
    (data) => {
      const list = (Array.isArray(data) ? data : []) as RawGdTrack[];
      const tracks = list.map((item) => mapGdTrack(item, platform));
      return { tracks, total: tracks.length };
    },
  );
}

export async function fetchCover(picId: string, source: Platform): Promise<string | null> {
  try {
    return await tryEndpoints(
      GD_ENDPOINTS,
      GD_STORAGE_KEY,
      (base) => `${base}?types=pic&source=${source}&id=${encodeURIComponent(picId)}&size=300`,
      (data) => {
        const d = data as { url?: string };
        return d.url ?? null;
      },
    );
  } catch {
    return null;
  }
}

/**
 * 解析播放地址。GD Studio 支持全部平台（含网易云榜单歌曲的 netease id）。
 * 若首选源失败，网易云歌曲再尝试官方镜像兜底。
 */
export async function fetchSongUrl(track: Track): Promise<string | null> {
  if (track.url) return track.url;
  if (track.source === 'demo') return track.url ?? null;

  const platform = track.source as Platform;

  const gdUrl = await tryEndpoints(
    GD_ENDPOINTS,
    GD_STORAGE_KEY,
    (base) => `${base}?types=url&source=${platform}&id=${encodeURIComponent(String(track.id))}&br=320`,
    (data) => {
      const d = data as { url?: string | null };
      const url = d.url;
      return url && url.length ? url.replace(/^http:/, 'https:') : null;
    },
  ).catch(() => null);

  if (gdUrl) return gdUrl;

  if (platform === 'netease') {
    return tryEndpoints(
      NETEASE_ENDPOINTS,
      NETEASE_STORAGE_KEY,
      (base) => `${base}/song/url/v1?id=${track.id}&level=standard`,
      (data) => {
        const d = data as { data?: Array<{ url?: string | null }> };
        const url = d.data?.[0]?.url;
        return url ? url.replace(/^http:/, 'https:') : null;
      },
    ).catch(() => null);
  }

  return null;
}

/* ------------------------- 本地降级歌单 ------------------------- */

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
