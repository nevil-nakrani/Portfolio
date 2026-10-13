import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import profileImg from '../assets/profile.jpeg';
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticButton } from './AnimationPrimitives';
import TiltCard from './TiltCard';
import AnimatedText from './AnimatedText';

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
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
              {/* Floating decoration rings */}
              <motion.div
                className="about-ring about-ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="about-ring about-ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <motion.div
              className="about-badge"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="about-badge-value">2+</div>
              <div className="about-badge-label">Years of Experience</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <div className="about-content">
            <ScrollReveal delay={0.1}>
              <p className="about-subtitle">{'// about_me.js'}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <AnimatedText
                text="Crafting Intelligent Full-Stack Solutions"
                tag="h2"
                mode="word"
                className="about-title"
                staggerDelay={0.05}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="about-text">
                I'm a passionate full-stack developer with deep expertise in the <strong style={{ color: 'var(--accent-glow)' }}>MERN stack</strong> — building everything from RESTful APIs to interactive React frontends. I love turning complex problems into clean, performant solutions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="about-text">
                Beyond the MERN stack, I specialize in <strong style={{ color: 'var(--accent-cyan)' }}>Odoo ERP development</strong> — crafting custom modules, QWeb reports, and business workflow automations. I'm also deeply invested in <strong style={{ color: 'var(--accent-pink)' }}>LangChain AI integration</strong>, building intelligent chatbots and AI agents with memory and tool-calling capabilities.
              </p>
            </ScrollReveal>

            <StaggerContainer className="about-tags" stagger={0.04} delay={0.5}>
              {TAGS.map((tag) => (
                <StaggerItem key={tag}>
                  <motion.span
                    className="about-tag"
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {tag}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Highlights row */}
            <StaggerContainer className="about-highlights" stagger={0.1} delay={0.6}>
              {HIGHLIGHTS.map(h => (
                <StaggerItem key={h.title}>
                  <TiltCard className="glass-card about-highlight-card" intensity={10} scale={1.04}>
                    <div className="about-highlight-icon">{h.icon}</div>
                    <div className="about-highlight-title">{h.title}</div>
                    <div className="about-highlight-desc">{h.desc}</div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.7}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <MagneticButton strength={0.2}>
                  <a href="#contact" className="btn btn-primary">Let's Work Together</a>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <a href="/resume.pdf" className="btn btn-outline" download>
                    <FiDownload /> Download CV
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
