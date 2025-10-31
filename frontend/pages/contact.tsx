import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import styles from '../styles/Home.module.css';

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About Me</Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      </nav>
      <h1 className={styles.title}>Contact Me</h1>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Send Message</button>
      </form>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/nuyucrutt" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/21-nurhalimah" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin />
            </a>
            <a href="https://wa.me/6282216402994" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
