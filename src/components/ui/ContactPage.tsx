import { useState, useEffect, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { TokyoScene } from '../scene/TokyoScene';
import { GlobalLoader } from './GlobalLoader';
import { MobileHeader } from './MobileHeader';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { siteConfig, navItems, contactContent, contactLinks as configContactLinks } from '../../content';

// Icon components for contact links
const contactIcons = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-10 7L2 7"/>
    </svg>
  ),
  website: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

// Map config contact links with icons
const contactLinks = configContactLinks.map(link => ({
  ...link,
  icon: contactIcons[link.iconType],
}));

export const ContactPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobileDetection();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
            {/* 3D Scene - Tokyo Model Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}>
              <Suspense fallback={null}>
                <TokyoScene />
              </Suspense>
            </div>

            {/* Gradient overlays for depth and readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Header Navigation */}
            {isMobile ? (
              <MobileHeader variant="dark" />
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
                          padding: '8px 20px',
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

                {/* Spacer */}
                <div style={{ width: '38px' }} />
              </motion.header>
            )}

            {/* Main Content - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? -20 : 0 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : (isMobile ? 0 : -60), y: isLoaded ? 0 : (isMobile ? -20 : 0) }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: isMobile ? '70px' : 'auto',
                bottom: isMobile ? 'auto' : '80px',
                left: isMobile ? '16px' : '40px',
                right: isMobile ? '16px' : 'auto',
                zIndex: 10,
                maxWidth: isMobile ? 'none' : '480px',
                maxHeight: isMobile ? 'calc(100vh - 180px)' : 'none',
                overflowY: isMobile ? 'auto' : 'visible',
                paddingBottom: isMobile ? '16px' : 0,
              }}
            >
              {/* Section Label */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 0.5 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '16px',
                }}
              >
                {contactContent.sectionLabel}
              </motion.span>
              
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  margin: 0,
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 300,
                  lineHeight: 0.95,
                  color: '#ffffff',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '-0.02em',
                  marginBottom: '32px',
                }}
              >
                {contactContent.titleMain}<span style={{ fontStyle: 'italic', fontWeight: 400 }}>{contactContent.titleItalic}</span>
              </motion.h1>

              {/* Contact Links */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '32px',
              }}>
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target={link.id !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 8 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '14px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.7)',
                    }}>
                      {link.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '2px',
                      }}>
                        {link.label}
                      </span>
                      <span style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                      }}>
                        {link.displayUrl || link.url.replace('https://', '').replace('mailto:', '')}
                      </span>
                    </div>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.4)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Projects Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(201, 169, 98, 0.02) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                }}
              >
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                }}>
                  {contactContent.projectsNote}{' '}
                  <a 
                    href={contactContent.projectsLinkUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: 'rgba(201, 169, 98, 0.9)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(201, 169, 98, 0.3)',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.7)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.3)'}
                  >
                    {contactContent.projectsLinkText}
                  </a>
                </p>
              </motion.div>
            </motion.div>

            {/* Right side decorative element (hidden on mobile) */}
            {!isMobile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '100px',
                    right: '40px',
                    width: '150px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
                    zIndex: 10,
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '100px',
                    right: '40px',
                    width: '1px',
                    height: '80px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    zIndex: 10,
                  }}
                />
              </>
            )}

            {/* Copyright notice (hidden on mobile) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.5)',
                  zIndex: 10,
                }}
              >
                {siteConfig.copyright.fullText}
              </motion.div>
            )}

            {/* Scene indicator (hidden on mobile) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 40 }}
                transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '80px',
                  right: '40px',
                  zIndex: 10,
                  textAlign: 'right',
                }}
              >
                <p style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px',
                }}>
                  {contactContent.sceneLabel}
                </p>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}>
                  {contactContent.sceneTitle}<span style={{ fontStyle: 'italic' }}>{contactContent.sceneTitleItalic}</span>
                </h3>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
