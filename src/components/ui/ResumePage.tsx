import { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileHomeScene } from '../scene/MobileHomeScene';
import { GlobalLoader } from './GlobalLoader';
import { MobileHeader } from './MobileHeader';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { 
  siteConfig, 
  navItems, 
  getResumeContent, 
  resumeSections, 
  resumeDownloadConfig 
} from '../../content';

export const ResumePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobileDetection();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [language, setLanguage] = useState<'en' | 'sq'>('en');
  const [activeSection, setActiveSection] = useState('intro');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get content from centralized config
  const t = getResumeContent(language);

  // Get sections with proper labels based on language
  const sections = resumeSections.map(section => ({
    id: section.id,
    label: language === 'en' ? section.labelEn : section.labelSq,
  }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleNavigation = (path: string) => {
    if (path === location.pathname) return;
    navigate(path);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeDownloadConfig.pdfPath;
    link.download = resumeDownloadConfig.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    window.open(resumeDownloadConfig.pdfPath, '_blank');
  };

  // Scroll to section on nav click
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = elementTop - containerTop + scrollContainerRef.current.scrollTop - 20;
      
      scrollContainerRef.current.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const containerTop = container.getBoundingClientRect().top;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const elementTop = element.getBoundingClientRect().top - containerTop;
          if (elementTop <= 100) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      <GlobalLoader isLoading={isLoading} onComplete={handleLoadComplete} />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              background: '#000000',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* 3D Scene - Mobile Home Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}>
              <Suspense fallback={null}>
                <MobileHomeScene />
              </Suspense>
            </div>

            {/* Gradient overlays */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.2) 70%, transparent 85%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Header Navigation */}
            {isMobile ? (
              <div style={{ position: 'relative', zIndex: 1000 }}>
                <MobileHeader variant="dark" />
                {/* Mobile Language Toggle */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '68px',
                  display: 'flex',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  overflow: 'hidden',
                  zIndex: 1001,
                  pointerEvents: 'auto',
                }}>
                  {(['en', 'sq'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '10px',
                        fontWeight: language === lang ? 600 : 400,
                        color: language === lang ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        background: language === lang ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 40px',
                  zIndex: 10,
                }}
              >
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  onClick={() => handleNavigation('/')}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: '0.03em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}>
                    {siteConfig.identity.initials}
                  </div>
                </motion.div>

                {/* Navigation Pills */}
                <nav
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0',
                    padding: '5px 6px',
                    background: 'linear-gradient(180deg, rgba(215, 210, 200, 0.92) 0%, rgba(200, 195, 185, 0.88) 100%)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    borderRadius: '100px',
                    border: '1px solid rgba(180, 175, 165, 0.5)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        onClick={() => handleNavigation(item.path)}
                        whileHover={{ 
                          backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                        }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          position: 'relative',
                          padding: '8px 18px',
                          borderRadius: '100px',
                          fontSize: '13px',
                          fontWeight: isActive ? 500 : 400,
                          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          color: isActive ? '#1a1a1a' : '#555555',
                          background: isActive ? 'rgba(255,255,255,0.95)' : 'transparent',
                          boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                          letterSpacing: '-0.01em',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {item.label}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              position: 'absolute',
                              bottom: '6px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '3px',
                              height: '3px',
                              borderRadius: '50%',
                              background: '#a89050',
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Language Toggle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    display: 'flex',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                  }}>
                    {(['en', 'sq'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: language === lang ? 600 : 400,
                          color: language === lang ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          background: language === lang ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.header>
            )}

            {/* Main Content Area */}
            <div style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              zIndex: 10,
              overflow: 'hidden',
            }}>
              {/* Left Side - Scrollable Content */}
              <motion.div
                ref={scrollContainerRef}
                initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : (isMobile ? 0 : -40), y: isLoaded ? 0 : (isMobile ? 20 : 0) }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: isMobile ? '1' : '0 0 55%',
                  padding: isMobile ? '0 16px 80px 16px' : '0 40px 100px 40px',
                  overflowY: 'auto',
                  maxHeight: isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 100px)',
                  scrollBehavior: 'smooth',
                }}
              >
                {/* Section Navigation - Sticky */}
                <div style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 20,
                  paddingTop: '8px',
                  paddingBottom: '16px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    display: 'flex',
                    gap: isMobile ? '2px' : '4px',
                    padding: '4px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    width: isMobile ? '100%' : 'fit-content',
                    overflowX: isMobile ? 'auto' : 'visible',
                  }}>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        style={{
                          padding: isMobile ? '6px 10px' : '8px 16px',
                          fontSize: isMobile ? '10px' : '11px',
                          fontWeight: activeSection === section.id ? 500 : 400,
                          color: activeSection === section.id ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          background: activeSection === section.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Introduction Section */}
                <div id="intro" style={{ marginBottom: '48px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h1 style={{
                      fontSize: 'clamp(36px, 5vw, 52px)',
                      fontWeight: 300,
                      color: '#ffffff',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      margin: '0 0 8px 0',
                    }}>
                      {t.intro.title}
                    </h1>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(201, 169, 98, 0.9)',
                      marginBottom: '20px',
                    }}>
                      {t.intro.subtitle}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.8,
                      marginBottom: '24px',
                      maxWidth: '500px',
                    }}>
                      {t.intro.description}
                    </p>

                    {/* Contact Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                      <a
                        href="https://www.linkedin.com/in/enea-nushi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          background: 'rgba(10, 102, 194, 0.12)',
                          border: '1px solid rgba(10, 102, 194, 0.25)',
                          borderRadius: '6px',
                          color: '#4d9de0',
                          fontSize: '11px',
                          fontWeight: 500,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="mailto:nushienea3@gmail.com"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '6px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '11px',
                          fontWeight: 500,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="M22 7l-10 7L2 7"/>
                        </svg>
                        Email
                      </a>
                    </div>

                    {/* Resume Download Button - Refined */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}>
                      <button
                        onClick={handleDownload}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.08) 100%)',
                          border: '1px solid rgba(201, 169, 98, 0.35)',
                          borderRadius: '8px',
                          color: 'rgba(201, 169, 98, 0.95)',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          letterSpacing: '0.02em',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 169, 98, 0.3) 0%, rgba(201, 169, 98, 0.15) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.08) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.35)';
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        {t.downloadResume}
                      </button>
                      <button
                        onClick={handlePreview}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 14px',
                          background: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        {t.previewResume}
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Work Experience Section */}
                <div id="experience" style={{ marginBottom: '48px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 300,
                      color: '#ffffff',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                      {t.workExperience.title}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {t.workExperience.jobs.map((job, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '16px 18px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.04)',
                          }}
                        >
                          <div style={{ marginBottom: '10px' }}>
                            <h3 style={{
                              fontSize: '14px',
                              fontWeight: 600,
                              color: '#ffffff',
                              margin: '0 0 4px 0',
                            }}>
                              {job.company}
                            </h3>
                            <p style={{
                              fontSize: '12px',
                              color: 'rgba(201, 169, 98, 0.85)',
                              fontWeight: 500,
                              margin: '0 0 2px 0',
                            }}>
                              {job.role}
                            </p>
                            <p style={{
                              fontSize: '10px',
                              color: 'rgba(255, 255, 255, 0.35)',
                              margin: 0,
                              letterSpacing: '0.5px',
                            }}>
                              {job.period}
                            </p>
                          </div>
                          <ul style={{
                            margin: 0,
                            padding: '0 0 0 14px',
                            listStyle: 'none',
                          }}>
                            {job.points.map((point, i) => (
                              <li
                                key={i}
                                style={{
                                  fontSize: '12px',
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  lineHeight: 1.6,
                                  marginBottom: '6px',
                                  position: 'relative',
                                  paddingLeft: '10px',
                                }}
                              >
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '7px',
                                  width: '3px',
                                  height: '3px',
                                  borderRadius: '50%',
                                  background: 'rgba(201, 169, 98, 0.5)',
                                }} />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Education Section */}
                <div id="education" style={{ marginBottom: '48px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 300,
                      color: '#ffffff',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                      {t.education.title}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {t.education.schools.map((school, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '16px 18px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.04)',
                          }}
                        >
                          <h3 style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#ffffff',
                            margin: '0 0 6px 0',
                          }}>
                            {school.name}
                          </h3>
                          <p style={{
                            fontSize: '13px',
                            color: 'rgba(255, 255, 255, 0.65)',
                            margin: '0 0 4px 0',
                          }}>
                            {school.degree}
                          </p>
                          <p style={{
                            fontSize: '12px',
                            color: 'rgba(201, 169, 98, 0.85)',
                            fontWeight: 500,
                            margin: '0 0 2px 0',
                          }}>
                            {school.gpa}
                          </p>
                          <p style={{
                            fontSize: '11px',
                            color: 'rgba(255, 255, 255, 0.35)',
                            margin: 0,
                          }}>
                            {school.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Skills Section */}
                <div id="skills" style={{ marginBottom: '48px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 300,
                      color: '#ffffff',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                      {t.skills.title}
                    </h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.35)',
                        marginBottom: '10px',
                      }}>
                        Key Skills
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {t.skills.keySkills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(59, 130, 246, 0.08)',
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              borderRadius: '5px',
                              fontSize: '11px',
                              fontWeight: 500,
                              color: '#60a5fa',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.35)',
                        marginBottom: '10px',
                      }}>
                        Specialized Areas
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {t.skills.specializedAreas.map((area) => (
                          <span
                            key={area}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(201, 169, 98, 0.08)',
                              border: '1px solid rgba(201, 169, 98, 0.15)',
                              borderRadius: '5px',
                              fontSize: '11px',
                              fontWeight: 500,
                              color: 'rgba(201, 169, 98, 0.85)',
                            }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Achievements Section */}
                <div id="achievements" style={{ marginBottom: '48px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 300,
                      color: '#ffffff',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                      {t.achievements.title}
                    </h2>

                    <div style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.35)',
                        marginBottom: '10px',
                      }}>
                        Awards & Recognition
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {t.achievements.awards.map((award, index) => (
                          <li
                            key={index}
                            style={{
                              fontSize: '12px',
                              color: 'rgba(255, 255, 255, 0.65)',
                              lineHeight: 1.6,
                              marginBottom: '8px',
                              paddingLeft: '16px',
                              position: 'relative',
                            }}
                          >
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              top: '5px',
                              width: '6px',
                              height: '6px',
                              borderRadius: '1px',
                              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.7), rgba(201, 169, 98, 0.3))',
                            }} />
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.35)',
                        marginBottom: '10px',
                      }}>
                        Certifications
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {t.achievements.certifications.map((cert, index) => (
                          <li
                            key={index}
                            style={{
                              fontSize: '12px',
                              color: 'rgba(255, 255, 255, 0.55)',
                              lineHeight: 1.6,
                              marginBottom: '6px',
                              paddingLeft: '16px',
                              position: 'relative',
                            }}
                          >
                            <span style={{
                              position: 'absolute',
                              left: 0,
                              top: '6px',
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: 'rgba(59, 130, 246, 0.5)',
                            }} />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Motto - Bottom Right (hidden on mobile) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  zIndex: 10,
                  textAlign: 'right',
                }}
              >
                <p style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '0.03em',
                  margin: 0,
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4)',
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(201, 169, 98, 0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  "{t.motto}"
                </p>
              </motion.div>
            )}

            {/* Attribution (hidden on mobile) */}
            {!isMobile && (
              <motion.a
                href="https://sketchfab.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '40px',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                  zIndex: 10,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >
                3D model via Sketchfab
              </motion.a>
            )}

            {/* Copyright notice (hidden on mobile) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  zIndex: 10,
                }}
              >
                {siteConfig.copyright.fullText}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
