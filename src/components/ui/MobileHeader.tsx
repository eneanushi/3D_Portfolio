import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'arena', label: 'Arena', path: '/arena' },
  { id: 'resume', label: 'Resume', path: '/resume' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

interface MobileHeaderProps {
  variant?: 'light' | 'dark';
}

export const MobileHeader = ({ variant = 'dark' }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (path === location.pathname) {
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(false);
    navigate(path);
  };

  const isDark = variant === 'dark';

  return (
    <>
      {/* Mobile Header Bar */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNavigation('/')}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDark 
              ? '1px solid rgba(255,255,255,0.1)' 
              : '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            cursor: 'pointer',
          }}
        >
          EN
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: isDark 
              ? 'rgba(255, 255, 255, 0.06)' 
              : 'rgba(0, 0, 0, 0.04)',
            border: isDark 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            cursor: 'pointer',
          }}
        >
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 7 : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: '18px',
              height: '2px',
              background: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              borderRadius: '1px',
            }}
          />
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scaleX: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: '18px',
              height: '2px',
              background: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              borderRadius: '1px',
            }}
          />
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -7 : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: '18px',
              height: '2px',
              background: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              borderRadius: '1px',
            }}
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.96)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(item.path);
                  }}
                  style={{
                    padding: '16px 48px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontSize: '24px',
                    fontWeight: isActive ? 500 : 300,
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: '0.05em',
                  }}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}

            {/* Close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              Tap anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
