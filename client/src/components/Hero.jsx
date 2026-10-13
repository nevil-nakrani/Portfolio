import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import { MagneticButton, CountUp } from './AnimationPrimitives';
import AnimatedText from './AnimatedText';

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

// Enhanced particle canvas with mouse interaction
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    const COUNT = 100;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6
        ? '124,58,237'
        : Math.random() > 0.3
          ? '6,182,212'
          : '236,72,153',
      baseAlpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          const force = (150 - mDist) / 150;
          p.x += (mdx / mDist) * force * 2;
          p.y += (mdy / mDist) * force * 2;
          p.alpha = p.baseAlpha + force * 0.5;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

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
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 0.12 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
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
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { value: '2',  suffix: '+', label: 'Years Experience' },
  { value: '15', suffix: '+', label: 'Projects Built'   },
  { value: '5',  suffix: '+', label: 'AI Integrations'  },
  { value: '3',  suffix: '+', label: 'Odoo Modules'     },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" id="home" ref={containerRef}>
      <ParticleCanvas />
      <motion.div className="container hero-content" style={{ y: bgY, opacity }}>

        <motion.div className="hero-badge" {...fadeUp(0.1)}>
          <span className="dot" />
          Available for Work
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <AnimatedText
            text="Hi, I'm"
            tag="h1"
            mode="word"
            className="hero-name-line1"
            staggerDelay={0.08}
          />
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <AnimatedText
            text="Nevil Nakrani"
            tag="h1"
            mode="letter"
            className="hero-name-line2"
            staggerDelay={0.03}
          />
        </motion.div>

        <motion.div className="hero-typewriter" {...fadeUp(0.5)}>
          <span className="typed-text">{typed}</span>
          <span className="cursor" />
        </motion.div>

        <motion.p className="hero-desc" {...fadeUp(0.6)}>
          I build powerful, intelligent full-stack web applications. From MERN stack platforms and Odoo ERP modules to LangChain-powered AI chatbots — I craft solutions that scale and impress.
        </motion.p>

        <motion.div className="hero-buttons" {...fadeUp(0.7)}>
          <MagneticButton strength={0.2}>
            <a href="#projects" className="btn btn-primary">
              View Projects <FiArrowDown />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </MagneticButton>
          <div style={{ display: 'flex', gap: '16px' }}>
            <MagneticButton strength={0.4}>
              <a
                href="https://github.com/nevil-nakrani"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-icon-round"
              >
                <FiGithub />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <a
                href="https://linkedin.com/in/nevil-nakrani"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-icon-round"
              >
                <FiLinkedin />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div className="hero-stats" {...fadeUp(0.8)}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
            >
              <div className="stat-number">
                <CountUp target={s.value} suffix={s.suffix} duration={2} />
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
