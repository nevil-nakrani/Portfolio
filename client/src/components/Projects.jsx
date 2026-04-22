import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: false,
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
    featured: true,
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">🚀 Projects</div>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle">
            A selection of real-world projects spanning MERN applications, Odoo ERP modules, and AI-powered systems.
          </p>
        </motion.div>

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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                <div className="project-card-glow" />

                {project.featured && (
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: 100, padding: '3px 10px',
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-glow)',
                    zIndex: 2,
                  }}>
                    ★ Featured
                  </div>
                )}

                <div className="project-header" style={{ marginTop: project.featured ? 28 : 0 }}>
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub">
                      <FiGithub />
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-link" title="Live Demo">
                      <FiExternalLink />
                    </a>
                  </div>
                </div>

                <div className="project-title">{project.title}</div>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
