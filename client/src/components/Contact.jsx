import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiTwitter } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { sendContact } from '../utils/api';
import AnimatedText from './AnimatedText';
import { ScrollReveal, MagneticButton, StaggerContainer, StaggerItem } from './AnimationPrimitives';

const CONTACT_ITEMS = [
  { icon: <FiMail />,    label: 'Email',    value: 'nakaraninevil2017@gmail.com'   },
  { icon: <FiMapPin />,  label: 'Location', value: 'Available Worldwide' },
  { icon: <FiGithub />,  label: 'GitHub',   value: 'github.com/nevil-nakrani' },
  { icon: <FiLinkedin />,label: 'LinkedIn', value: 'linkedin.com/in/nevil-nakrani' },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContact(form);
      toast.success('🎉 Message sent! Nevil will reply soon.', {
        style: { background: '#0f0f1e', color: '#f1f5f9', border: '1px solid rgba(124,58,237,0.3)' },
        iconTheme: { primary: '#7c3aed', secondary: '#fff' },
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Something went wrong. Try again!', {
        style: { background: '#0f0f1e', color: '#f1f5f9', border: '1px solid rgba(236,72,153,0.3)' },
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <Toaster position="top-right" />
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">📬 Contact</div>
            <AnimatedText
              text="Let's Work Together"
              tag="h2"
              mode="word"
              className="section-title"
              staggerDelay={0.08}
            />
            <p className="section-subtitle">
              Have a project in mind? Let's build something amazing together.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-grid">
          {/* Info */}
          <ScrollReveal direction="left">
            <h3 className="contact-info-title">
              Get In <span className="gradient-text">Touch</span>
            </h3>
            <p className="contact-info-sub">
              Whether you need a MERN stack app, an Odoo module, an AI chatbot, or just want to chat about tech — I'm here. Drop me a message and I'll get back within 24 hours.
            </p>

            <StaggerContainer className="contact-items" stagger={0.08} delay={0.2}>
              {CONTACT_ITEMS.map((item) => (
                <StaggerItem key={item.label}>
                  <motion.div
                    className="contact-item"
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="contact-item-icon"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="contact-item-label">{item.label}</div>
                      <div className="contact-item-value">{item.value}</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Social links */}
            <motion.div
              style={{ display: 'flex', gap: 12, marginTop: 36 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { icon: <FiGithub />,   href: 'https://github.com/nevil-nakrani'   },
                { icon: <FiLinkedin />, href: 'https://linkedin.com/in/nevil-nakrani' },
                { icon: <FiTwitter />,  href: 'https://twitter.com/nevil_nakrani'  },
              ].map((s, i) => (
                <MagneticButton key={i} strength={0.4}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social"
                    whileHover={{ y: -4, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {s.icon}
                  </motion.a>
                </MagneticButton>
              ))}
            </motion.div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right">
            <motion.form
              className="contact-form glass-card"
              style={{ padding: 36 }}
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                  <label className="form-label">Name *</label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                  <label className="form-label">Email *</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}>
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Project idea / Collaboration / Question..."
                />
              </div>

              <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                <label className="form-label">Message *</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </div>

              <MagneticButton strength={0.15}>
                <motion.button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(124,58,237,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sending ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </motion.button>
              </MagneticButton>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
