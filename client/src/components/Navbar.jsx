import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [progress, setProgress]         = useState(0);
  const [activeSection, setActive]      = useState('');
  const [menuOpen, setMenuOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 60);

      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: progress / 100 }}
      />

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          <motion.a
            href="#"
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {'<Nevil />'}
          </motion.a>

          {/* Desktop links */}
          <motion.ul
            className="nav-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className={activeSection === link.href.slice(1) ? 'active' : ''}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
            <li>
              <motion.a
                href="#contact"
                className="btn btn-primary nav-cta"
                style={{ padding: '8px 22px', fontSize: '0.85rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hire Me
              </motion.a>
            </li>
          </motion.ul>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: '0.3s' }} />
            <span style={{ opacity: menuOpen ? 0 : 1,             transition: '0.3s' }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: '0.3s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 'var(--nav-height)', left: 0, right: 0,
              background: 'rgba(5,5,8,0.96)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', zIndex: 999,
              padding: '24px',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
