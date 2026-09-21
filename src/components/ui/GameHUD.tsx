import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameStore } from '../../stores/gameStore';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { siteConfig, navItems } from '../../content';
import { arenaContent, getStationContent } from '../../content/arena';

/** Shared surface for the light header pills, matching the rest of the site */
const pillSurface = {
  background: 'linear-gradient(180deg, rgba(215, 210, 200, 0.92) 0%, rgba(200, 195, 185, 0.88) 100%)',
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
  border: '1px solid rgba(180, 175, 165, 0.5)',
  boxShadow:
    '0 4px 20px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
} as const;

const BackArrow = ({ color = '#555555' }: { color?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const GameHUD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nearestStation = useGameStore((state) => state.nearestStation);
  const showStationUI = useGameStore((state) => state.showStationUI);
  const openStationUI = useGameStore((state) => state.openStationUI);
  const { isMobile } = useMobileDetection();

  const handleNavigation = useCallback(
    (path: string) => {
      if (path === location.pathname) return;
      navigate(path);
    },
    [navigate, location.pathname]
  );

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const zone = nearestStation ? getStationContent(nearestStation) : null;
  const showPrompt = Boolean(nearestStation) && !showStationUI;

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      {isMobile ? (
        <motion.header
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            zIndex: 210,
          }}
        >
          <motion.button
            onClick={handleBack}
            whileTap={{ scale: 0.95 }}
            aria-label="Go back"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              ...pillSurface,
            }}
          >
            <BackArrow />
          </motion.button>

          <div
            onClick={() => handleNavigation('/')}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            {siteConfig.identity.initials}
          </div>

          <div
            className="zone-compass"
            style={{ padding: '7px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}
          >
            {zone ? zone.name : 'Arena'}
          </div>
        </motion.header>
      ) : (
        <motion.header
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '22px 28px',
            zIndex: 210,
          }}
        >
          {/* Left — back and brand mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.button
              onClick={handleBack}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '100px',
                ...pillSurface,
              }}
            >
              <BackArrow />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#4a4a4a',
                  letterSpacing: '-0.01em',
                }}
              >
                Back
              </span>
            </motion.button>

            <motion.div
              onClick={() => handleNavigation('/')}
              whileHover={{ y: -1 }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              {siteConfig.identity.initials}
            </motion.div>
          </div>

          {/* Centre — primary navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px 6px',
              borderRadius: '100px',
              ...pillSurface,
            }}
          >
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.06, duration: 0.45 }}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'relative',
                    padding: '8px 19px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? '#1a1a1a' : '#565656',
                    background: isActive ? 'rgba(255,255,255,0.95)' : 'transparent',
                    boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'color 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Right — where you are in the arena */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '9px 16px',
                borderRadius: '100px',
                ...pillSurface,
              }}
            >
              <motion.span
                animate={
                  zone
                    ? { scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }
                    : { scale: 1, opacity: 0.5 }
                }
                transition={{ duration: 2.2, repeat: zone ? Infinity : 0, ease: 'easeInOut' }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: zone ? '#a8904f' : '#8c8b86',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4a4a4a',
                  letterSpacing: '-0.005em',
                }}
              >
                {zone ? zone.name : 'Roaming'}
              </span>
            </motion.div>
          </div>
        </motion.header>
      )}

      {/* ── Interaction prompt ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {showPrompt && zone && (
          /* The animated element is the wrapper, not the button: framer-motion
             writes its own `transform`, so centring is done with flex and the
             button's hover state is left to CSS. */
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '190px' : '40px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 110,
              pointerEvents: 'none',
            }}
          >
          <button
            className="zone-prompt"
            onClick={openStationUI}
            style={{ pointerEvents: 'auto' }}
          >
            <span style={{ textAlign: 'left' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.95)',
                  letterSpacing: '-0.005em',
                }}
              >
                {zone.name}
              </span>
              <span
                style={{
                  display: 'block',
                  marginTop: '2px',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.42)',
                }}
              >
                {zone.description}
              </span>
            </span>
            <span className="zone-prompt__key">
              {isMobile ? arenaContent.interactPromptTouch : `E · ${arenaContent.interactPrompt}`}
            </span>
          </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
