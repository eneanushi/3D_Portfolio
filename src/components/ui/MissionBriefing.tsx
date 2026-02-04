import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { TreeScene } from '../scene/TreeScene';
import { GlobalLoader } from './GlobalLoader';
import { MobileHeader } from './MobileHeader';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { siteConfig, navItems } from '../../content';

const objectives = [
  {
    id: 'work',
    title: 'Work Experience',
    description: 'Discover my professional journey',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Explore technical achievements',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch with me',
  },
];

const controls = [
  { key: 'W', action: 'Forward' },
  { key: 'S', action: 'Backward' },
  { key: 'A', action: 'Rotate Left' },
  { key: 'D', action: 'Rotate Right' },
  { key: 'Shift', action: 'Run' },
];

export const MissionBriefing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobileDetection();
  const [isExiting, setIsExiting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
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

  const handleBack = useCallback(() => {
    handleNavigation('/');
  }, [handleNavigation]);

  const handleLaunch = useCallback(() => {
    setIsLaunching(true);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Simulate load delay for staggered animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLaunching) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            navigate('/arena');
          }, 400);
          return 100;
        }
        return prev + Math.random() * 20 + 10;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isLaunching, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLaunching && showContent) {
        handleLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleLaunch, isLaunching, showContent]);

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
              alignItems: 'center',
              justifyContent: 'flex-end',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* 3D Scene - Tree with Checkerboard Floor */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}>
              <Suspense fallback={null}>
                <TreeScene />
              </Suspense>
            </div>

            {/* Gradient overlay for text readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Vignette effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Header Navigation */}
            {isMobile ? (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}>
                <MobileHeader variant="dark" />
              </div>
            ) : (
              <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 40px',
                  zIndex: 100,
                }}
              >
                {/* Left - Back Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Back Button */}
                  <motion.button
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      background: 'linear-gradient(180deg, rgba(215, 210, 200, 0.92) 0%, rgba(200, 195, 185, 0.88) 100%)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: '1px solid rgba(180, 175, 165, 0.5)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#555555" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      color: '#555555',
                      letterSpacing: '-0.01em',
                    }}>
                      Back
                    </span>
                  </motion.button>

                  {/* Logo / Brand Mark - Initials */}
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

                {/* Center - Navigation Pills */}
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

                {/* Right - Spacer to balance layout */}
                <div style={{ width: '120px' }} />
              </motion.header>
            )}

            {/* Glass Panel - Instructions */}
            <motion.div
              initial={{ x: isMobile ? 0 : 100, y: isMobile ? 20 : 0, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : (isMobile ? 0 : 100), y: isLoaded ? 0 : (isMobile ? 20 : 0), opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: isMobile ? 'absolute' : 'relative',
                top: isMobile ? '70px' : 'auto',
                left: isMobile ? '16px' : 'auto',
                right: isMobile ? '16px' : 'auto',
                zIndex: 10,
                width: isMobile ? 'auto' : '100%',
                maxWidth: isMobile ? 'none' : '420px',
                maxHeight: isMobile ? 'calc(100vh - 100px)' : 'none',
                overflowY: isMobile ? 'auto' : 'visible',
                margin: isMobile ? 0 : '40px',
                padding: isMobile ? '16px' : '32px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: isMobile ? '16px' : '20px',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Header */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{ marginBottom: '28px' }}
              >
                <p style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px',
                }}>
                  Mission Briefing
                </p>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: 300,
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '-0.01em',
                }}>
                  Explore the <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Portfolio</span>
                </h2>
              </motion.div>

              {/* Objectives */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ marginBottom: '24px' }}
              >
                <p style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '12px',
                }}>
                  Objectives
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {objectives.map((obj, index) => (
                    <motion.div
                      key={obj.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: isLoaded ? 0 : -20, opacity: isLoaded ? 1 : 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#a89050',
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.9)',
                          margin: 0,
                        }}>
                          {obj.title}
                        </p>
                        <p style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.5)',
                          margin: '2px 0 0 0',
                        }}>
                          {obj.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Controls */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                style={{ marginBottom: '24px' }}
              >
                <p style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '12px',
                }}>
                  Controls
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {controls.map((ctrl) => (
                    <div
                      key={ctrl.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '11px',
                      }}
                    >
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '22px',
                        height: '22px',
                        padding: '0 6px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '5px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.8)',
                        textTransform: 'uppercase',
                      }}>
                        {ctrl.key}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{ctrl.action}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Launch Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isLoaded ? 0 : 20, opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                {!isLaunching ? (
                  <motion.button
                    onClick={handleLaunch}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.95)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0a0a0a',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Enter Arena
                  </motion.button>
                ) : (
                  <div style={{
                    padding: '14px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      fontSize: '12px',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</span>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {Math.min(100, Math.round(loadingProgress))}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, loadingProgress)}%` }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.95))',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                  </div>
                )}

                {!isLaunching && !isMobile && (
                  <p style={{
                    marginTop: '14px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.05em',
                  }}>
                    Press Enter to launch
                  </p>
                )}
              </motion.div>
            </motion.div>

            {/* Bottom left - Title overlay (desktop only) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -40 }}
                transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '40px',
                  zIndex: 10,
                }}
              >
                <p style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                }}>
                  Interactive Experience
                </p>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}>
                  Recursive Tree <span style={{ fontStyle: 'italic' }}>Cubes</span>
                </h3>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
