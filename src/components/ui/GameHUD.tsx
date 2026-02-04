import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameStore } from '../../stores/gameStore';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { siteConfig, navItems } from '../../content';

export const GameHUD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nearestStation = useGameStore((state) => state.nearestStation);
  const { isMobile } = useMobileDetection();

  const handleNavigation = useCallback((path: string) => {
    if (path === location.pathname) return;
    navigate(path);
  }, [navigate, location.pathname]);

  const handleBack = useCallback(() => {
    // Navigate back in browser history
    navigate(-1);
  }, [navigate]);

  return (
    <>
      {/* Header Navigation */}
      {isMobile ? (
        /* Mobile Header - Simplified */
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            zIndex: 100,
          }}
        >
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.button>

          {/* Logo */}
          <div 
            onClick={() => handleNavigation('/')}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              cursor: 'pointer',
            }}
          >
            {siteConfig.identity.initials}
          </div>

          {/* Menu Button */}
          <motion.button
            onClick={() => handleNavigation('/')}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </motion.button>
        </motion.header>
      ) : (
        /* Desktop Header */
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
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
            <div 
              onClick={() => handleNavigation('/')}
              style={{
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
                cursor: 'pointer',
              }}
            >
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

      {/* Bottom Center - Station Indicator */}
      <AnimatePresence>
        {nearestStation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '200px' : 'var(--space-2xl)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: isMobile ? '6px 12px' : 'var(--space-sm) var(--space-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : 'var(--space-md)',
              }}
            >
              <div style={{
                width: isMobile ? '6px' : '8px',
                height: isMobile ? '6px' : '8px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                {nearestStation === 'work' && 'Work Experience'}
                {nearestStation === 'projects' && 'Projects'}
                {nearestStation === 'contact' && 'Contact'}
              </span>
              {!isMobile && (
                <span style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                }}>
                  — Viewing
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
