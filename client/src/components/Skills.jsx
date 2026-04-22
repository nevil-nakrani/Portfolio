import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SKILL_GROUPS = {
  MERN: [
    { icon: '⚛️', name: 'React.js',    level: 'Advanced',     pct: 90 },
    { icon: '🟢', name: 'Node.js',     level: 'Advanced',     pct: 88 },
    { icon: '🚂', name: 'Express.js',  level: 'Advanced',     pct: 87 },
    { icon: '🍃', name: 'MongoDB',     level: 'Intermediate', pct: 82 },
    { icon: '🔷', name: 'Redux',       level: 'Intermediate', pct: 78 },
    { icon: '🔐', name: 'JWT Auth',    level: 'Advanced',     pct: 85 },
  ],
  Odoo: [
    { icon: '🟪', name: 'Odoo 18/19',        level: 'Intermediate', pct: 80 },
    { icon: '🐍', name: 'Python ORM',         level: 'Intermediate', pct: 78 },
    { icon: '📄', name: 'QWeb Reports',       level: 'Intermediate', pct: 75 },
    { icon: '🖼️', name: 'XML Views',          level: 'Intermediate', pct: 77 },
    { icon: '🔧', name: 'Custom Modules',     level: 'Intermediate', pct: 80 },
    { icon: '📡', name: 'XML-RPC / JsonRPC',  level: 'Beginner',     pct: 65 },
  ],
  'LangChain & AI': [
    { icon: '🦜', name: 'LangChain.js',    level: 'Intermediate', pct: 82 },
    { icon: '🤖', name: 'LangGraph',       level: 'Intermediate', pct: 76 },
    { icon: '🧠', name: 'Groq / Gemini',   level: 'Advanced',     pct: 85 },
    { icon: '📚', name: 'RAG Pipelines',   level: 'Intermediate', pct: 76 },
    { icon: '🗄️', name: 'Vector DBs',      level: 'Beginner',     pct: 65 },
    { icon: '💬', name: 'AI Chatbots',     level: 'Advanced',     pct: 88 },
  ],
  Tools: [
    { icon: '🐙', name: 'Git & GitHub',  level: 'Advanced',     pct: 90 },
    { icon: '🐳', name: 'Docker',        level: 'Beginner',     pct: 60 },
    { icon: '📮', name: 'Postman',       level: 'Advanced',     pct: 88 },
    { icon: '🐧', name: 'Linux CLI',     level: 'Intermediate', pct: 72 },
    { icon: '✏️', name: 'VS Code',       level: 'Advanced',     pct: 95 },
    { icon: '🌐', name: 'REST APIs',     level: 'Advanced',     pct: 90 },
  ],
};

const LEVEL_COLOR = {
  Advanced:     '#7c3aed',
  Intermediate: '#06b6d4',
  Beginner:     '#ec4899',
};

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      className="skill-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="skill-card-header">
        <div className="skill-icon">{skill.icon}</div>
        <div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-level" style={{ color: LEVEL_COLOR[skill.level] }}>
            {skill.level}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {skill.pct}%
        </div>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.pct / 100 } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('MERN');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const tabs = Object.keys(SKILL_GROUPS);

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">⚡ Skills</div>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            A diverse toolkit spanning full-stack development, ERP customization, and cutting-edge AI integration.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="skills-tabs">
          {tabs.map(tab => (
            <motion.button
              key={tab}
              className={`skills-tab${active === tab ? ' active' : ''}`}
              onClick={() => setActive(tab)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="skills-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {SKILL_GROUPS[active].map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
