'use client';

import { storageGet, storageSet } from '@/lib/safeStorage';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Position } from './types';

interface UseDraggableOptions {
  storageKey?: string;
  /** 无本地缓存时，在客户端挂载后用真实窗口尺寸计算默认位置 */
  getDefaultPosition?: () => Position;
  initial?: Position;
  size?: { width: number; height: number };
  padding?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function loadStored(storageKey: string | undefined): Position | null {
  if (!storageKey) return null;
  try {
    const raw = storageGet(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Position>;
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
      return { x: parsed.x, y: parsed.y };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function useDraggable({
  storageKey,
  getDefaultPosition,
  initial = { x: 24, y: 24 },
  size = { width: 60, height: 60 },
  padding = 8,
}: UseDraggableOptions = {}) {
  const storedOnInit = useRef(loadStored(storageKey));
  const [position, setPosition] = useState<Position>(() => storedOnInit.current ?? initial);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const movedRef = useRef(false);
  const sizeRef = useRef(size);
  sizeRef.current = size;
  const getDefaultRef = useRef(getDefaultPosition);
  getDefaultRef.current = getDefaultPosition;

  const clampToViewport = useCallback(
    (pos: Position): Position => {
      const maxX = Math.max(padding, window.innerWidth - sizeRef.current.width - padding);
      const maxY = Math.max(padding, window.innerHeight - sizeRef.current.height - padding);
      return {
        x: clamp(pos.x, padding, maxX),
        y: clamp(pos.y, padding, maxY),
      };
    },
    [padding],
  );

  useEffect(() => {
    const resolve = () => {
      if (!storedOnInit.current && getDefaultRef.current) {
        return clampToViewport(getDefaultRef.current());
      }
      return clampToViewport(storedOnInit.current ?? initial);
    };

    setPosition(resolve());
    setReady(true);

    const onResize = () => setPosition((prev) => clampToViewport(prev));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only resolve once on mount
  }, [clampToViewport]);

  useEffect(() => {
    if (!storageKey || !ready) return;
    try {
      storageSet(storageKey, JSON.stringify(position));
    } catch {
      /* ignore */
    }
  }, [position, storageKey, ready]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: position.x,
        originY: position.y,
      };
      movedRef.current = false;
      setDragging(true);
    },
    [position.x, position.y],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const state = dragState.current;
      if (!state) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (!movedRef.current && Math.hypot(dx, dy) > 3) movedRef.current = true;
      setPosition(clampToViewport({ x: state.originX + dx, y: state.originY + dy }));
    },
    [clampToViewport],
  );

  const endDrag = useCallback((event?: React.PointerEvent<HTMLElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
    dragState.current = null;
    setDragging(false);
  }, []);

  return {
    position,
    setPosition,
    dragging,
    ready,
    hasMoved: () => movedRef.current,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
