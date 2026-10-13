import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import { MagneticButton } from './AnimationPrimitives';

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
          className="footer-nav-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {LINKS.map((link, i) => (
            <MagneticButton key={link.href} strength={0.3}>
              <motion.a
                href={link.href}
                className="footer-nav-link"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, color: 'var(--accent-glow)' }}
              >
                {link.label}
              </motion.a>
            </MagneticButton>
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
            <MagneticButton key={s.label} strength={0.4}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label={s.label}
                whileHover={{ y: -5, scale: 1.2, boxShadow: '0 10px 30px rgba(124,58,237,0.3)' }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />

        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} <span>Nevil Nakrani</span>. Built with{' '}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            <FiHeart style={{ color: 'var(--accent-pink)', display: 'inline', verticalAlign: 'middle' }} />
          </motion.span>
          {' '}using MERN Stack
        </motion.p>
      </div>
    </footer>
  );
}
