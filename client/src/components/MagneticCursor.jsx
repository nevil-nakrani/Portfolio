import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
  const dotY = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });
  const ringX = useSpring(cursorX, { damping: 35, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 35, stiffness: 150, mass: 0.8 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    // Add magnetic effect to interactive elements
    const interactiveEls = document.querySelectorAll(
      'a, button, .btn, .glass-card, .project-card, .skill-card, .filter-btn, .skills-tab, input, textarea'
    );

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(
        'a, button, .btn, .glass-card, .project-card, .skill-card, .filter-btn, .skills-tab, input, textarea'
      );
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className={`cursor-ring ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''} ${hidden ? 'hidden' : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className={`cursor-dot ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''} ${hidden ? 'hidden' : ''}`}
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
