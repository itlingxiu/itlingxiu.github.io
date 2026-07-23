export interface Track {
  id: string | number;
  name: string;
  artist: string;
  album?: string;
  cover?: string;
  duration?: number;
  url?: string;
  source: 'netease' | 'demo' | 'external';
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
