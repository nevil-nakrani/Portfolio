import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * AnimatedText — Reveals text word-by-word or letter-by-letter on scroll
 * @param {string} text - The text to animate
 * @param {'word'|'letter'} mode - Animation granularity
 * @param {string} className - Additional class names
 * @param {string} tag - HTML tag ('h1', 'h2', 'p', 'span', etc.)
 * @param {number} staggerDelay - Delay between each unit
 */
export default function AnimatedText({
  text,
  mode = 'word',
  className = '',
  tag = 'div',
  staggerDelay = 0.04,
  once = true,
  threshold = 0.3,
}) {
  const [ref, inView] = useInView({ threshold, triggerOnce: once });

  const units = mode === 'letter' ? text.split('') : text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -40,
      filter: 'blur(8px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const Tag = motion[tag] || motion.div;

  return (
    <Tag
      ref={ref}
      className={`animated-text ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        perspective: '600px',
      }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: mode === 'word' ? '0.3em' : '0',
            whiteSpace: unit === ' ' ? 'pre' : 'normal',
          }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </motion.span>
      ))}
    </Tag>
  );
}
