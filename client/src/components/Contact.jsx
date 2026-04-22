import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiTwitter } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { sendContact } from '../utils/api';

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

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContact(form);
      toast.success('🎉 Message sent! Alex will reply soon.', {
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">📬 Contact</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="contact-info-title">
              Get In <span className="gradient-text">Touch</span>
            </h3>
            <p className="contact-info-sub">
              Whether you need a MERN stack app, an Odoo module, an AI chatbot, or just want to chat about tech — I'm here. Drop me a message and I'll get back within 24 hours.
            </p>

            <div className="contact-items">
              {CONTACT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

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
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form glass-card"
            style={{ padding: 36 }}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project idea / Collaboration / Question..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                className="form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary form-submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? (
                <>Sending...</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
