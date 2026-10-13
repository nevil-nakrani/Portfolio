import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TiltCard from './TiltCard';
import AnimatedText from './AnimatedText';
import { ScrollReveal } from './AnimationPrimitives';

const PROJECTS = [
  {
    id: 1,
    icon: '🏥',
    title: 'Healthcare MERN Microservices',
    desc: 'Full-stack healthcare platform with MERN microservices architecture. Features JWT auth, AI-powered medical image analysis, LangChain/Groq chatbot, appointment booking, and Docker Compose orchestration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'LangChain', 'Groq', 'Flask'],
    category: 'MERN',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 2,
    icon: '🍔',
    title: 'Food Delivery App',
    desc: 'Full-stack MERN food delivery platform. Features secure JWT authentication, state management with Redux Toolkit, Razorpay payment gateway integration, and Cloudinary image uploads.',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB', 'Razorpay', 'Tailwind CSS'],
    category: 'MERN',
    github: 'https://github.com/nevil-nakrani/Food-Delivery-App',
    demo: '#',
  },
  {
    id: 3,
    icon: '🧵',
    title: 'TailorOS — Management Platform',
    desc: 'A comprehensive management website for professional tailors. Features a complete order tracking system seamlessly integrated with a LangGraph-powered AI agent, voice commands, and a draggable multi-tool interface.',
    tags: ['React', 'Node.js', 'MongoDB', 'LangGraph', 'Groq'],
    category: 'MERN',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 4,
    icon: '🧠',
    title: 'QuizApp — AI Quiz Generator',
    desc: 'MERN stack quiz platform with LangChain + Groq-powered question generation, real-time leaderboard, hint system, and full submission history tracking.',
    tags: ['React', 'Express', 'MongoDB', 'LangChain', 'Groq'],
    category: 'MERN',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 5,
    icon: '🏗️',
    title: 'Odoo Construction Module',
    desc: 'Custom Odoo 19 module for construction project management — job orders, material tracking, QWeb PDF reports, and business workflow automation.',
    tags: ['Odoo 19', 'Python', 'QWeb', 'XML Views', 'PostgreSQL'],
    category: 'Odoo',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 6,
    icon: '💬',
    title: 'RAG Chatbot System',
    desc: 'Production-ready Retrieval-Augmented Generation chatbot using ChromaDB vector store, LangChain, and Groq for document-aware Q&A over custom knowledge bases.',
    tags: ['LangChain', 'ChromaDB', 'Python', 'Flask', 'Groq'],
    category: 'AI',
    github: 'https://github.com',
    demo: '#',
  }
];

const FILTERS = ['All', 'MERN', 'Odoo', 'AI'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">🚀 Projects</div>
            <AnimatedText
              text="What I've Built"
              tag="h2"
              mode="word"
              className="section-title"
              staggerDelay={0.08}
            />
            <p className="section-subtitle">
              A selection of real-world projects spanning MERN applications, Odoo ERP modules, and AI-powered systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.93 }}
            >
              {f}
              {filter === f && (
                <motion.div
                  className="filter-btn-indicator"
                  layoutId="filterIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="projects-grid"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
          >
            {visible.map((project, i) => (
              <TiltCard
                key={project.id}
                className="project-card glass-card"
                intensity={6}
                scale={1.03}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="project-card-glow" />

                  <div className="project-header">
                    <motion.div
                      className="project-icon"
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {project.icon}
                    </motion.div>
                    <div className="project-links">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                        title="GitHub"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                        title="Live Demo"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink />
                      </motion.a>
                    </div>
                  </div>

                  <div className="project-title">{project.title}</div>
                  <p className="project-desc">{project.desc}</p>

                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <motion.span
                        key={tag}
                        className="project-tag"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
