import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import './index.css';
import Preloader     from './components/Preloader';
import MagneticCursor from './components/MagneticCursor';
import MorphingBlobs from './components/MorphingBlobs';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Experience    from './components/Experience';
import Chatbot       from './components/Chatbot';
import Contact       from './components/Contact';
import Footer        from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Custom cursor */}
          <MagneticCursor />

          {/* Ambient background */}
          <MorphingBlobs />
          <div className="grid-overlay" />

          <Navbar />

          <main>
            <Hero       />
            <About      />
            <Skills     />
            <Projects   />
            <Experience />
            <Contact    />
          </main>

          <Footer  />
          <Chatbot />
        </motion.div>
      )}
    </>
  );
}
