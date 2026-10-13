import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal — Section wrapper with parallax + staggered reveal
 */
export function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  const d = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: d.y,
        x: d.x,
        filter: 'blur(10px)',
        scale: 0.95,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection — Applies parallax depth effect on scroll
 */
export function ParallaxSection({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer — Staggers its children's animations
 */
export function StaggerContainer({ children, className = '', stagger = 0.1, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — Child of StaggerContainer
 */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * MagneticButton — Button that is magnetically attracted to cursor
 */
export function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CountUp — Animated number counter
 */
function CountUpInner({ num, suffix, duration }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const dur = duration * 1000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setValue(Math.round(eased * num));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [num, duration]);

  return <>{value}{suffix}</>;
}

export function CountUp({ target, suffix = '', duration = 2, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const num = parseInt(target, 10) || 0;

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <CountUpInner num={num} suffix={suffix} duration={duration} />
      ) : (
        <>0{suffix}</>
      )}
    </motion.span>
  );
}
