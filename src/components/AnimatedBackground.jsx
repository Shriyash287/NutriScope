import { useEffect, useRef, useCallback } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const frameRef = useRef(0);

  const createParticles = useCallback((width, height) => {
    const particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 120);

    for (let i = 0; i < count; i++) {
      const type = Math.random();
      let particle;

      if (type < 0.35) {
        // Nutrient dot particles
        particle = {
          type: 'dot',
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1,
          color: ['rgba(34,197,94,', 'rgba(132,204,22,', 'rgba(56,189,248,'][Math.floor(Math.random() * 3)],
          phase: Math.random() * Math.PI * 2,
        };
      } else if (type < 0.55) {
        // Floating leaf particles
        particle = {
          type: 'leaf',
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 5 + 3,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: -Math.random() * 0.2 - 0.05,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          phase: Math.random() * Math.PI * 2,
        };
      } else if (type < 0.7) {
        // Bubble particles
        particle = {
          type: 'bubble',
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 8 + 3,
          speedY: -Math.random() * 0.15 - 0.03,
          speedX: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.1 + 0.03,
          phase: Math.random() * Math.PI * 2,
        };
      } else if (type < 0.85) {
        // Vitamin capsule
        particle = {
          type: 'capsule',
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.12 + 0.03,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          color: Math.random() > 0.5 ? 'rgba(34,197,94,' : 'rgba(249,115,22,',
          phase: Math.random() * Math.PI * 2,
        };
      } else {
        // DNA / helix node
        particle = {
          type: 'dna',
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          speedY: (Math.random() - 0.5) * 0.15,
          amplitude: Math.random() * 30 + 20,
          frequency: Math.random() * 0.02 + 0.005,
          opacity: Math.random() * 0.2 + 0.05,
          phase: Math.random() * Math.PI * 2,
          baseX: Math.random() * width,
        };
      }
      particles.push(particle);
    }

    // Add connecting lines between close particles
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(window.innerWidth, window.innerHeight);
    };

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const drawLeaf = (ctx, x, y, size, rotation, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = 'rgba(34,197,94,0.6)';
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.6, -size * 0.6, size * 0.6, size * 0.3, 0, size);
      ctx.bezierCurveTo(-size * 0.6, size * 0.3, -size * 0.6, -size * 0.6, 0, -size);
      ctx.fill();
      // Leaf vein
      ctx.strokeStyle = 'rgba(132,204,22,0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.8);
      ctx.stroke();
      ctx.restore();
    };

    const drawCapsule = (ctx, x, y, size, rotation, opacity, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      const halfW = size * 0.4;
      const halfH = size;
      ctx.fillStyle = color + '0.7)';
      ctx.beginPath();
      ctx.roundRect(-halfW, -halfH, halfW * 2, halfH, [halfW]);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.roundRect(-halfW, 0, halfW * 2, halfH, [0, 0, halfW, halfW]);
      ctx.fill();
      ctx.restore();
    };

    const animate = (time) => {
      const t = time * 0.001;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(34,197,94,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Parallax from mouse
        const pdx = (mx - window.innerWidth / 2) * 0.008;
        const pdy = (my - window.innerHeight / 2) * 0.008;

        if (p.type === 'dot') {
          p.x += p.speedX + Math.sin(t + p.phase) * 0.1;
          p.y += p.speedY + Math.cos(t + p.phase) * 0.1;
          const drawX = p.x + pdx;
          const drawY = p.y + pdy;
          const pulse = Math.sin(t * 2 + p.phase) * 0.3 + 0.7;
          ctx.globalAlpha = p.opacity * pulse;
          ctx.fillStyle = p.color + (p.opacity * pulse) + ')';
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.fillStyle = p.color + (p.opacity * pulse * 0.3) + ')';
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'leaf') {
          p.x += p.speedX + Math.sin(t * 0.5 + p.phase) * 0.3;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed + Math.sin(t + p.phase) * 0.002;
          drawLeaf(ctx, p.x + pdx * 1.5, p.y + pdy * 1.5, p.radius, p.rotation, p.opacity);
          if (p.y < -20) {
            p.y = window.innerHeight + 20;
            p.x = Math.random() * window.innerWidth;
          }
        } else if (p.type === 'bubble') {
          p.x += p.speedX + Math.sin(t * 0.3 + p.phase) * 0.15;
          p.y += p.speedY;
          const drawX = p.x + pdx * 0.5;
          const drawY = p.y + pdy * 0.5;
          ctx.globalAlpha = p.opacity;
          ctx.strokeStyle = `rgba(56,189,248,${p.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.stroke();
          // Highlight
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.fillStyle = 'rgba(255,255,255,0.1)';
          ctx.beginPath();
          ctx.arc(drawX - p.radius * 0.3, drawY - p.radius * 0.3, p.radius * 0.3, 0, Math.PI * 2);
          ctx.fill();
          if (p.y < -20) {
            p.y = window.innerHeight + 20;
            p.x = Math.random() * window.innerWidth;
          }
        } else if (p.type === 'capsule') {
          p.x += p.speedX + Math.sin(t * 0.4 + p.phase) * 0.1;
          p.y += p.speedY + Math.cos(t * 0.3 + p.phase) * 0.1;
          p.rotation += p.rotationSpeed;
          drawCapsule(ctx, p.x + pdx, p.y + pdy, p.radius, p.rotation, p.opacity, p.color);
        } else if (p.type === 'dna') {
          p.y += p.speedY;
          const wave = Math.sin(p.y * p.frequency + t) * p.amplitude;
          const drawX = p.baseX + wave + pdx * 2;
          const drawY = p.y + pdy * 2;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = `rgba(132,204,22,${p.opacity})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fill();
          // Mirror strand
          ctx.fillStyle = `rgba(56,189,248,${p.opacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.baseX - wave + pdx * 2, drawY, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
          // Connecting rung
          if (Math.abs(wave) < p.amplitude * 0.3) {
            ctx.strokeStyle = `rgba(255,255,255,${p.opacity * 0.3})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p.baseX - wave + pdx * 2, drawY);
            ctx.stroke();
          }
        }

        // Wrap particles
        if (p.type !== 'dna') {
          if (p.x < -50) p.x = window.innerWidth + 50;
          if (p.x > window.innerWidth + 50) p.x = -50;
          if (p.y < -50) p.y = window.innerHeight + 50;
          if (p.y > window.innerHeight + 50) p.y = -50;
        } else {
          if (p.y < -50 || p.y > window.innerHeight + 50) {
            p.y = p.speedY > 0 ? -50 : window.innerHeight + 50;
            p.baseX = Math.random() * window.innerWidth;
          }
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [createParticles]);

  return (
    <div className="animated-bg">
      <canvas ref={canvasRef} />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
    </div>
  );
}
