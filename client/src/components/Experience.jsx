import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TIMELINE = [
  {
    year: '2024 – Present',
    role: 'Full-Stack Developer',
    org: 'Freelance / Remote',
    desc: 'Building MERN stack applications, integrating AI chatbots powered by LangChain and Groq, and developing custom Odoo ERP modules for clients across multiple industries.',
  },
  {
    year: '2024',
    role: 'Odoo Developer',
    org: 'ERP Solutions Studio',
    desc: 'Developed custom Odoo 19 modules including construction project management, inventory control, QWeb PDF reports, and automated business workflows using Python ORM.',
  },
  {
    year: '2023 – 2024',
    role: 'AI Integration Engineer',
    org: 'Personal Projects',
    desc: 'Experimented and shipped multiple AI-powered tools including LangGraph agents, RAG pipelines with ChromaDB, voice-to-text interfaces, and AI quiz generators.',
  },
  {
    year: '2022 – 2023',
    role: 'Junior MERN Developer',
    org: 'Tech Startup',
    desc: 'Contributed to full-stack development using React, Node.js, Express, and MongoDB. Built REST APIs, implemented JWT authentication, and worked on responsive UI design.',
  },
  {
    year: '2022',
    role: 'Computer Engineering',
    org: 'BVM Engineering College Vallabh Vidyanagar',
    desc: 'Completed Computer Science BTech degree with focus on software engineering, databases, and algorithms. Built first full-stack project — a web-based event management system.',
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">📅 Experience</div>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            From junior developer to AI integration engineer — a story of continuous learning and building.
          </p>
        </motion.div>

        <div className="timeline">
          {/* Animated draw-on line overlay */}
          <motion.div
            className="timeline-line-animated"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
            >
              {/* Dot with pulsing ring */}
              <motion.div
                className="timeline-dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.5, type: 'spring', stiffness: 220 }}
              >
                <span className="timeline-dot-ring" />
              </motion.div>

              <motion.div
                className="timeline-content glass-card"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-org">{item.org}</div>
                <p className="timeline-desc">{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
