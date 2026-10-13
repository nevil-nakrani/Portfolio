import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — Wraps children in a 3D perspective tilt card
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 15,
  glareEnabled = true,
  scale = 1.02,
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    damping: 20,
    stiffness: 250,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    damping: 20,
    stiffness: 250,
  });

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
      {/* Glare overlay */}
      {glareEnabled && (
        <motion.div
          className="tilt-glare"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
