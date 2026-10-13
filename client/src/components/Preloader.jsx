import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out curve for natural feel
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(() => onComplete?.(), 800);
      return () => clearTimeout(timeout);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background particles */}
          <div className="preloader-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="preloader-particle"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 600 - 300,
                  y: Math.random() * 600 - 300,
                  scale: [0, 1, 0.5],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Logo reveal */}
          <motion.div
            className="preloader-logo"
            initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="preloader-bracket">&lt;</span>
            <motion.span
              className="preloader-name"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Nevil
            </motion.span>
            <span className="preloader-bracket"> /&gt;</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="preloader-progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="preloader-bar-track">
              <motion.div
                className="preloader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <motion.span className="preloader-pct">
              {progress}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
