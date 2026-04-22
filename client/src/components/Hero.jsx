import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';

const ROLES = [
  'MERN Stack Developer',
  'Odoo ERP Developer',
  'LangChain AI Engineer',
  'AI Chatbot Builder',
  'Full-Stack Developer',
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pauseMs = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase]     = useState('typing');

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), deletingSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '124,58,237' : '6,182,212',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { value: '2+',  label: 'Years Experience' },
  { value: '15+', label: 'Projects Built'   },
  { value: '5+',  label: 'AI Integrations'  },
  { value: '3+',  label: 'Odoo Modules'     },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section className="hero" id="home">
      <ParticleCanvas />
      <div className="container hero-content">

        <motion.div className="hero-badge" {...fadeUp(0.1)}>
          <span className="dot" />
          Available for Work
        </motion.div>

        <motion.h1 className="hero-name" {...fadeUp(0.2)}>
          <span className="line-1">Hi, I'm</span>
          <br />
          <span className="line-2">Nevil Nakrani</span>
        </motion.h1>

        <motion.div className="hero-typewriter" {...fadeUp(0.35)}>
          <span className="typed-text">{typed}</span>
          <span className="cursor" />
        </motion.div>

        <motion.p className="hero-desc" {...fadeUp(0.45)}>
          I build powerful, intelligent full-stack web applications. From MERN stack platforms and Odoo ERP modules to LangChain-powered AI chatbots — I craft solutions that scale and impress.
        </motion.p>

        <motion.div className="hero-buttons" {...fadeUp(0.55)}>
          <a href="#projects" className="btn btn-primary">
            View Projects <FiArrowDown />
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
          <a
            href="https://github.com/nevil-nakrani"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: '12px', borderRadius: '50%', width: 48, height: 48, justifyContent: 'center' }}
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/nevil-nakrani"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: '12px', borderRadius: '50%', width: 48, height: 48, justifyContent: 'center' }}
          >
            <FiLinkedin />
          </a>
        </motion.div>

        <motion.div className="hero-stats" {...fadeUp(0.65)}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
            >
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <FiArrowDown size={16} />
      </div>
    </section>
  );
}
