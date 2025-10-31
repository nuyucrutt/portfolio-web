import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import styles from '../styles/Home.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  languages: string[];
}

const Home: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [publicProjects, setPublicProjects] = useState<Project[]>([]);
  const [token, setToken] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showSlideshow, setShowSlideshow] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username: 'admin',
        password: 'password'
      });
      setToken(res.data.access_token);
      setShowSlideshow(false);
    } catch (error) {
      console.error('Login failed');
    }
  };

  const logout = () => {
    setToken('');
    setProjects([]);
    setShowSlideshow(true);
  };

  const fetchProjects = async () => {
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects');
    }
  };

  const fetchPublicProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/public-projects');
      setPublicProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch public projects');
    }
  };

  useEffect(() => {
    fetchPublicProjects();
  }, []);

  useEffect(() => {
    if (token) fetchProjects();
  }, [token]);

  useEffect(() => {
    if (publicProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % publicProjects.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [publicProjects]);

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
          {token && <button className={styles.logoutButton} onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>}
        </div>
      </nav>
      {showSlideshow && (
        <>
          {/* Public Projects Slideshow */}
          <div className={styles.slideshowSection}>
            {/*<h2 className={styles.sliderTitle}>My Portfolio</h2>*/}
            <h1 className={styles.sliderTitle}>NURHALIMAH</h1>
            <h1  style={{ fontSize: '12px', color: '' }} className={styles.sliderTitle}>Junior Full-Stack Software Engineering</h1>
            <div className={styles.slideshowContainer}>
              {publicProjects.map((project, index) => (
                <div
                  className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                  key={project.id}
                >
                  <img src={project.image} alt={project.title} className={styles.slideImage} />
                  <div className={styles.slideContent}>
                    <h3 className={styles.slideTitle}>{project.title}</h3>
                    <p className={styles.slideDescription}>{project.description}</p>
                    <div className={styles.slideLanguages}>
                      {project.languages.map((lang, idx) => (
                        <span key={idx} className={styles.slideLanguageTag}>{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.dots}>
              {publicProjects.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>

          <button className={styles.loginButton} onClick={login}>Login to View All Projects</button>
        </>
      )}

      {/* Full Projects Grid (after login) */}
      {!showSlideshow && token && (
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <div className={styles.projectCard} key={project.id}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.languages}>
                {project.languages.map((lang, index) => (
                  <span key={index} className={styles.languageTag}>{lang}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
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

export default Home;