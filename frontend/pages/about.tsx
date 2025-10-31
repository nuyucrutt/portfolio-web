import type { NextPage } from 'next';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const About: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
      <h1 className={styles.title}>About Me</h1>
      <div className={styles.aboutContent}>
        <img src="/profile.jpg" alt="Nurhalimah" className={styles.profileImage} />
        <p className={styles.aboutText}>
          Hi, I'm a passionate web developer with experience in React, Flask, and various other technologies.
          This portfolio showcases some of my projects.
        </p>
        {/*<h2 className={styles.title}>Technical Skills</h2>
        <ul className={styles.aboutText}>
          <strong>Programming Languages & Web Development:</strong> 
          <strong>HTML & CSS, React.js, Python</strong>
          <li><strong>Tools & Software:</strong> Microsoft Office (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, etc.), Git, Visual Studio Code, dll.</li>
          <li><strong>Database:</strong> MySQL</li>
          <li><strong>Finance & Accounting:</strong> Accounting Principles, Financial Report Audit, AB Tax Brevet</li>
          <li><strong>Administration & Documentation:</strong> Document Management, Procurement / Purchasing Administration</li>
        </ul>
        <h2 className={styles.title}>Soft Skills</h2>
        <ul className={styles.aboutText}>
          <li>Teamwork & Ability to Work Independently</li>
          <li>Time Management</li>
          <li>Adaptability</li>
          <li>Creativity</li>
        </ul>*/}
      </div>
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

export default About;
