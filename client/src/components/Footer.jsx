import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';

const LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-logo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {'<Nevil />'}
        </motion.div>

        {/* Nav links */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-glow)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Socials */}
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: <FiGithub />,   href: 'https://github.com',   label: 'GitHub'   },
            { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: <FiTwitter />,  href: 'https://twitter.com',  label: 'Twitter'  },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="footer-social"
              aria-label={s.label}
              whileHover={{ y: -4, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} <span>Nevil Nakrani</span>. Built with <FiHeart style={{ color: 'var(--accent-pink)', display: 'inline', verticalAlign: 'middle' }} /> using MERN Stack
        </motion.p>
      </div>
    </footer>
  );
}
