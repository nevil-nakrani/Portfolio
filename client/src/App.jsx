import { useEffect } from 'react';
import Lenis from 'lenis';
import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import Experience from './components/Experience';
import Chatbot    from './components/Chatbot';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

export default function App() {
  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Ambient background */}
      <div className="grid-overlay" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

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
    </>
  );
}
