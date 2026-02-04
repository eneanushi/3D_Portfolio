import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LucyScene } from '../scene/LucyScene';
import { GlobalLoader } from './GlobalLoader';
import { MobileHeader } from './MobileHeader';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { siteConfig, navItems, homeContent, assetsLink } from '../../content';

export const EntryScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobileDetection();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleNavigation = useCallback((path: string) => {
    if (path === location.pathname) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate(path);
    }, 400);
  }, [navigate, location.pathname]);

  const handleEnter = useCallback(() => {
    handleNavigation('/about');
  }, [handleNavigation]);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Simulate load delay for staggered animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isExiting && showContent) {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, isExiting, showContent]);

  return (
    <>
      <GlobalLoader isLoading={isLoading} onComplete={handleLoadComplete} />
      
      <AnimatePresence>
        {!isExiting && showContent && (
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
            {/* 3D Scene - Lucy Model with Spotlight Texture */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}>
              <Suspense fallback={null}>
                <LucyScene />
              </Suspense>
            </div>

            {/* Gradient overlay for text readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)',
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
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 40px',
                  zIndex: 10,
                }}
              >
                {/* Logo / Brand Mark - Initials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
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

                {/* Navigation Pills - Darker Cream Glass Effect */}
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
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
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
                        {/* Active indicator dot */}
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

                {/* Spacer to balance layout */}
                <div style={{ width: '38px' }} />
              </motion.header>
            )}

            {/* Name - Bottom Left - Large Typography */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -60 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '100px' : '60px',
                left: isMobile ? '20px' : '40px',
                right: isMobile ? '20px' : 'auto',
                zIndex: 10,
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {/* Pre-title */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 0.5 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  style={{
                    fontSize: isMobile ? '10px' : '11px',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {homeContent.preTitle}
                </motion.span>
                
                {/* Main Name */}
                <h1 style={{
                  margin: 0,
                  fontSize: isMobile ? 'clamp(40px, 12vw, 64px)' : 'clamp(48px, 8vw, 96px)',
                  fontWeight: 300,
                  lineHeight: 0.9,
                  color: '#ffffff',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '-0.02em',
                }}>
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
                    transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'block' }}
                  >
                    {homeContent.firstName}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
                    transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ 
                      display: 'block',
                      fontStyle: 'italic',
                      fontWeight: 400,
                    }}
                  >
                    {homeContent.lastName}
                  </motion.span>
                </h1>

                {/* Mobile: Tap to enter button */}
                {isMobile && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    onClick={handleEnter}
                    style={{
                      marginTop: '24px',
                      padding: '14px 28px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '100px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      width: 'fit-content',
                    }}
                  >
                    {homeContent.ctaText}
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Scroll/Enter Indicator - Bottom Right (Desktop only) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  right: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '16px',
                  zIndex: 10,
                }}
              >
                {/* Vertical text */}
                <motion.div
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                  }}
                >
                  {homeContent.desktopPrompt}
                </motion.div>
                
                {/* Animated line */}
                <motion.div
                  animate={{ 
                    height: ['20px', '40px', '20px'],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '1px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
              </motion.div>
            )}

            {/* Decorative corner elements (Desktop only) */}
            {!isMobile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '40px',
                    width: '120px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
                    zIndex: 10,
                  }}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '40px',
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    zIndex: 10,
                  }}
                />
              </>
            )}

            {/* Copyright notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '40px' : '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: isMobile ? '10px' : '11px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.65)',
                zIndex: 10,
              }}
            >
              {siteConfig.copyright.fullText}
            </motion.div>

            {/* Assets Link */}
            <motion.a
              href={assetsLink.path}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '16px' : '20px',
                left: isMobile ? '20px' : '40px',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.25)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'color 0.2s',
                textTransform: 'uppercase',
                padding: '4px 0',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
            >
              {assetsLink.label}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
