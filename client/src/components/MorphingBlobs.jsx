import { useRef, useEffect } from 'react';

/**
 * MorphingBlobs — Canvas-based organic morphing blob animation
 * Replaces the static CSS orbs with dynamic, living shapes
 */
export default function MorphingBlobs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Blob definition
    const blobs = [
      {
        x: 0.2, y: 0.2,
        radius: 200,
        color: { r: 124, g: 58, b: 237, a: 0.08 },
        speed: 0.0006,
        phase: 0,
        noiseScale: 0.5,
      },
      {
        x: 0.8, y: 0.4,
        radius: 160,
        color: { r: 6, g: 182, b: 212, a: 0.06 },
        speed: 0.0008,
        phase: Math.PI * 0.7,
        noiseScale: 0.6,
      },
      {
        x: 0.3, y: 0.8,
        radius: 180,
        color: { r: 236, g: 72, b: 153, a: 0.05 },
        speed: 0.0005,
        phase: Math.PI * 1.4,
        noiseScale: 0.4,
      },
      {
        x: 0.7, y: 0.7,
        radius: 140,
        color: { r: 16, g: 185, b: 129, a: 0.04 },
        speed: 0.0007,
        phase: Math.PI * 0.3,
        noiseScale: 0.55,
      },
    ];

    const time = { value: 0 };

    const drawBlob = (blob, t) => {
      const cx = blob.x * canvas.width;
      const cy = blob.y * canvas.height;
      const { r, g, b, a } = blob.color;

      ctx.beginPath();

      const points = 8;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const noise1 = Math.sin(angle * 2 + t * blob.speed * 1000 + blob.phase) * 0.3;
        const noise2 = Math.cos(angle * 3 + t * blob.speed * 700) * 0.2;
        const noise3 = Math.sin(angle * 5 + t * blob.speed * 500 + blob.phase * 2) * 0.1;
        const radiusOffset = blob.radius * (1 + (noise1 + noise2 + noise3) * blob.noiseScale);

        const px = cx + Math.cos(angle) * radiusOffset;
        const py = cy + Math.sin(angle) * radiusOffset;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          // Smooth curve through points
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevNoise1 = Math.sin(prevAngle * 2 + t * blob.speed * 1000 + blob.phase) * 0.3;
          const prevNoise2 = Math.cos(prevAngle * 3 + t * blob.speed * 700) * 0.2;
          const prevNoise3 = Math.sin(prevAngle * 5 + t * blob.speed * 500 + blob.phase * 2) * 0.1;
          const prevRadius = blob.radius * (1 + (prevNoise1 + prevNoise2 + prevNoise3) * blob.noiseScale);

          const prevX = cx + Math.cos(prevAngle) * prevRadius;
          const prevY = cy + Math.sin(prevAngle) * prevRadius;

          const cpx = (prevX + px) / 2;
          const cpy = (prevY + py) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpx, cpy);
        }
      }

      ctx.closePath();

      // Create radial gradient
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.radius * 1.8);
      gradient.addColorStop(0, `rgba(${r},${g},${b},${a * 2})`);
      gradient.addColorStop(0.5, `rgba(${r},${g},${b},${a})`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = gradient;
      ctx.filter = 'blur(60px)';
      ctx.fill();
      ctx.filter = 'none';
    };

    const animate = (t) => {
      time.value = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slowly drift blob positions
      blobs.forEach((blob) => {
        blob.x += Math.sin(t * 0.0001 + blob.phase) * 0.00005;
        blob.y += Math.cos(t * 0.00012 + blob.phase) * 0.00005;
        // Keep within bounds
        blob.x = Math.max(0.05, Math.min(0.95, blob.x));
        blob.y = Math.max(0.05, Math.min(0.95, blob.y));
        drawBlob(blob, t);
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="morphing-blobs" />;
}
