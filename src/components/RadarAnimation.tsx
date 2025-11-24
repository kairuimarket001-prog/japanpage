import { useEffect, useRef } from 'react';

interface RadarAnimationProps {
  className?: string;
}

export default function RadarAnimation({ className = "" }: RadarAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    speed: number;
    angle: number;
    distance: number;
    opacity: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = canvas.height / (2 * window.devicePixelRatio);
    const maxRadius = Math.min(centerX, centerY) * 0.9;

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * maxRadius;
      particlesRef.current.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        speed: 0.2 + Math.random() * 0.5,
        angle: angle,
        distance: distance,
        opacity: 0.3 + Math.random() * 0.7,
        size: 1 + Math.random() * 2
      });
    }

    let scanAngle = 0;
    let pulsePhase = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      scanAngle += 0.02;
      pulsePhase += 0.03;

      for (let i = 0; i < 4; i++) {
        const radius = maxRadius * (0.25 + i * 0.25);
        const pulseEffect = 1 + Math.sin(pulsePhase + i * 0.5) * 0.05;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * pulseEffect, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 - i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const gradient = ctx.createRadialGradient(
        centerX + Math.cos(scanAngle) * maxRadius * 0.3,
        centerY + Math.sin(scanAngle) * maxRadius * 0.3,
        0,
        centerX,
        centerY,
        maxRadius
      );
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.4)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(30, 64, 175, 0)');

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(scanAngle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxRadius, -Math.PI / 6, Math.PI / 6);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(scanAngle) * maxRadius,
        centerY + Math.sin(scanAngle) * maxRadius
      );
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      particlesRef.current.forEach((particle, index) => {
        particle.angle += particle.speed * 0.01;
        particle.distance += Math.sin(pulsePhase + index * 0.1) * 0.5;

        if (particle.distance > maxRadius) {
          particle.distance = 0;
          particle.angle = Math.random() * Math.PI * 2;
        }

        particle.x = centerX + Math.cos(particle.angle) * particle.distance;
        particle.y = centerY + Math.sin(particle.angle) * particle.distance;

        const angleToParticle = Math.atan2(particle.y - centerY, particle.x - centerX);
        const angleDiff = Math.abs(((scanAngle - angleToParticle + Math.PI) % (Math.PI * 2)) - Math.PI);

        let particleOpacity = particle.opacity;
        if (angleDiff < Math.PI / 6) {
          particleOpacity = Math.min(1, particle.opacity + 0.5);
        }

        const distanceFromCenter = particle.distance / maxRadius;
        const layerOpacity = 1 - distanceFromCenter * 0.3;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${particleOpacity * layerOpacity})`;
        ctx.fill();

        if (angleDiff < Math.PI / 8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(96, 165, 250, 0.8)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${particleOpacity * 0.6})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
