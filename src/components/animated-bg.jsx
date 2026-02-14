import React, { useRef, useEffect } from 'react';

const DEFAULT_WAVES = [
  { yBase: 0.3, amplitude: 50, frequency: 0.003, speed: 0.8, color: '160,60,255' },
  { yBase: 0.5, amplitude: 60, frequency: 0.0025, speed: 0.5, color: '130,50,210' },
  { yBase: 0.7, amplitude: 45, frequency: 0.004, speed: 0.9, color: '200,110,255' },
];

export default function AnimatedBG({ waves = DEFAULT_WAVES, speed = 1, segments = 140 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const getDPR = () => window.devicePixelRatio || 1;

    const resize = () => {
      const dpr = getDPR();
      width = window.innerWidth;
      height = window.innerHeight;
      // CSS size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // backing store size for crisp lines on high-DPI
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      // scale context to dpr so drawing uses CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // draw helper
    const drawWave = (points, color, blur, lineWidth, alpha) => {
      ctx.save();
      ctx.beginPath();
      ctx.filter = `blur(${blur}px)`;
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.restore();
    };

    let last = performance.now();
    let t = 0;

    const render = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); // clamp delta to avoid jumps
      last = now;
      t += dt * speed * 0.8;

      // clear to absolute black
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // temporarily work in device pixels for fill
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // set blending for glow layers
      ctx.globalCompositeOperation = 'lighter';

      waves.forEach((w) => {
        const points = [];
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width;
          const primary = Math.sin(x * w.frequency + t * w.speed);
          const secondary = Math.sin(x * (w.frequency * 0.5) + t * (w.speed * 1.3));
          const y = height * w.yBase + (primary + secondary) * w.amplitude;
          points.push({ x, y });
        }

        // layered glows (deep -> core)
        drawWave(points, w.color, 40, 28, 0.12);
        drawWave(points, w.color, 25, 18, 0.2);
        drawWave(points, w.color, 14, 12, 0.3);
        drawWave(points, w.color, 4, 4, 0.85);
      });

      rafRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        resize();
      }, 120);
    };

    // init
    resize();
    rafRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, [waves, speed, segments]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
