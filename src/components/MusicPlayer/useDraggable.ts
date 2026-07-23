import { useCallback, useEffect, useRef, useState } from 'react';
import type { Position } from './types';

interface UseDraggableOptions {
  storageKey?: string;
  initial?: Position;
  size?: { width: number; height: number };
  padding?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function loadInitial(storageKey: string | undefined, fallback: Position): Position {
  if (!storageKey) return fallback;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Position>;
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
      return { x: parsed.x, y: parsed.y };
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

export function useDraggable({
  storageKey,
  initial = { x: 24, y: 24 },
  size = { width: 60, height: 60 },
  padding = 8,
}: UseDraggableOptions = {}) {
  const [position, setPosition] = useState<Position>(() => loadInitial(storageKey, initial));
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const movedRef = useRef(false);
  const sizeRef = useRef(size);
  sizeRef.current = size;

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
    setPosition((prev) => clampToViewport(prev));
    const onResize = () => setPosition((prev) => clampToViewport(prev));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [clampToViewport]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(position));
    } catch {
      /* ignore */
    }
  }, [position, storageKey]);

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
    hasMoved: () => movedRef.current,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
