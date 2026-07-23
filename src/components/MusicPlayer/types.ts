export type Platform = 'netease' | 'tencent' | 'kuwo' | 'kugou' | 'migu';

export type TrackSource = Platform | 'demo';

export interface PlatformMeta {
  key: Platform;
  label: string;
  short: string;
  color: string;
}

export const PLATFORMS: PlatformMeta[] = [
  { key: 'netease', label: '网易云', short: '云', color: '#c20c0c' },
  { key: 'tencent', label: 'QQ音乐', short: 'Q', color: '#31c27c' },
  { key: 'kuwo', label: '酷我', short: '酷', color: '#ffe000' },
  { key: 'kugou', label: '酷狗', short: '狗', color: '#2f7bff' },
  { key: 'migu', label: '咪咕', short: '咕', color: '#ff4f81' },
];

export interface Track {
  id: string | number;
  name: string;
  artist: string;
  album?: string;
  cover?: string;
  duration?: number;
  url?: string;
  source: TrackSource;
  picId?: string;
  lyricId?: string;
}

export interface Playlist {
  id: string | number;
  name: string;
  description?: string;
  cover?: string;
  tracks: Track[];
  updateFrequency?: string;
}

export interface SearchResult {
  tracks: Track[];
  total: number;
}

export type PlayMode = 'order' | 'loop' | 'random' | 'single';

export type TabKey = 'playing' | 'chart' | 'search';

export interface Position {
  x: number;
  y: number;
}
