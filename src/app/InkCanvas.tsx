"use client";

import { useEffect, useRef } from "react";

/** One drifting ink wash: a pre-rendered radial sprite moved along a Lissajous path. */
type Blob = {
  sprite: HTMLCanvasElement;
  /** Anchor, as a fraction of the viewport. */
  x: number;
  y: number;
  /** Drift amplitude, as a fraction of the viewport. */
  ax: number;
  ay: number;
  /** Radians per millisecond. */
  sx: number;
  sy: number;
  phase: number;
  alpha: number;
};

const SPECS = [
  { x: 0.18, y: 0.22, ax: 0.07, ay: 0.05, sx: 0.000064, sy: 0.000047, r: 0.55, a: 0.3 },
  { x: 0.82, y: 0.16, ax: 0.06, ay: 0.07, sx: 0.000041, sy: 0.000072, r: 0.46, a: 0.24 },
  { x: 0.68, y: 0.72, ax: 0.09, ay: 0.06, sx: 0.000055, sy: 0.000038, r: 0.6, a: 0.2 },
  { x: 0.26, y: 0.84, ax: 0.05, ay: 0.08, sx: 0.000078, sy: 0.000059, r: 0.42, a: 0.16 },
];

const PALETTE = ["#1153a1", "#2a6cbb", "#7aa6d8", "#0a2f5e"];

function makeSprite(radius: number, color: string) {
  const size = Math.max(2, radius * 2);
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;

  const ctx = sprite.getContext("2d");
  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.45, `${color}66`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  return sprite;
}

export function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let blobs: Blob[] = [];
    let frame = 0;
    let running = false;

    const build = () => {
      // Sprite size tracks the viewport so the wash reads the same on any screen.
      const base = Math.max(width, height);
      blobs = SPECS.map((spec, index) => ({
        sprite: makeSprite(Math.round((base * spec.r) / 2), PALETTE[index % PALETTE.length]),
        x: spec.x,
        y: spec.y,
        ax: spec.ax,
        ay: spec.ay,
        sx: spec.sx,
        sy: spec.sy,
        phase: index * 1.7,
        alpha: spec.a,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "multiply";

      for (const blob of blobs) {
        const cx = (blob.x + Math.sin(time * blob.sx + blob.phase) * blob.ax) * width;
        const cy = (blob.y + Math.cos(time * blob.sy + blob.phase) * blob.ay) * height;
        const half = blob.sprite.width / 2;

        ctx.globalAlpha = blob.alpha;
        ctx.drawImage(blob.sprite, cx - half, cy - half);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resize = () => {
      // This is a soft-focus wash; extra backing-store pixels buy nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(performance.now());
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    // Under reduced motion the single frame drawn by resize() is the finished state.
    if (!reduceMotion) start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink" aria-hidden="true" />;
}
