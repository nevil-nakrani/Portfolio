import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import profileImg from '../assets/profile.jpeg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const TAGS = [
  'MERN Stack', 'Odoo Dev', 'LangChain', 'AI Chatbots',
  'REST APIs', 'MongoDB', 'Python', 'React', 'Node.js',
  'LangGraph', 'Docker', 'Git',
];

const HIGHLIGHTS = [
  { icon: <FiCode />,     title: '15+ Projects', desc: 'Full-stack apps, ERP modules & AI tools'  },
  { icon: <FiCpu />,      title: 'AI Powered',   desc: 'LangChain, Groq, Gemini integrations'     },
  { icon: <FiDatabase />, title: 'Odoo Expert',   desc: 'Custom module dev & QWeb reports'         },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">

          {/* LEFT — IMAGE */}
          <motion.div
            className="about-image-wrap"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-glow" />
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <img
                src={profileImg}
                alt="Profile"
                className="about-avatar"
              />
            </motion.div>
            <motion.div
              className="about-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="about-badge-value">2+</div>
              <div className="about-badge-label">Years of Experience</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <div className="about-content">
            <motion.p
              className="about-subtitle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {'// about_me.js'}
            </motion.p>

            <motion.h2 className="about-title" {...(inView ? fadeUp(0.2) : { initial: { opacity: 0 } })}>
              Crafting{' '}
              <span className="gradient-text">Intelligent</span>
              <br />
              Full-Stack Solutions
            </motion.h2>

            <motion.p
              className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm a passionate full-stack developer with deep expertise in the <strong style={{ color: 'var(--accent-glow)' }}>MERN stack</strong> — building everything from RESTful APIs to interactive React frontends. I love turning complex problems into clean, performant solutions.
            </motion.p>

            <motion.p
              className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Beyond the MERN stack, I specialize in <strong style={{ color: 'var(--accent-cyan)' }}>Odoo ERP development</strong> — crafting custom modules, QWeb reports, and business workflow automations. I'm also deeply invested in <strong style={{ color: 'var(--accent-pink)' }}>LangChain AI integration</strong>, building intelligent chatbots and AI agents with memory and tool-calling capabilities.
            </motion.p>

            <motion.div
              className="about-tags"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="about-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlights row */}
            <motion.div
              className="about-highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {HIGHLIGHTS.map(h => (
                <div key={h.title} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', color: 'var(--accent-glow)', marginBottom: 8 }}>{h.icon}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{h.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.desc}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a href="#contact" className="btn btn-primary">Let's Work Together</a>
              <a href="/resume.pdf" className="btn btn-outline" download>
                <FiDownload /> Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
