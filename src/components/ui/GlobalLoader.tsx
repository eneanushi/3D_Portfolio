import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  minDuration?: number;
}

export const GlobalLoader = ({ 
  isLoading, 
  onComplete,
  minDuration = 1200 
}: GlobalLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      setProgress(0);
      setIsComplete(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!show) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / minDuration) * 100, 100);
      
      // Easing function for smooth progress
      const easedProgress = easeOutExpo(rawProgress / 100) * 100;
      setProgress(easedProgress);

      if (rawProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          setShow(false);
          onComplete?.();
        }, 300);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [show, minDuration, onComplete]);

  // Easing function
  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
            zIndex: 9999,
          }}
        >
          {/* Subtle grain texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }} />

          {/* Loader container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
          }}>
            {/* Circular progress indicator */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
            }}>
              {/* Background circle */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                style={{
                  position: 'absolute',
                  transform: 'rotate(-90deg)',
                }}
              >
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1"
                />
              </svg>

              {/* Progress circle */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                style={{
                  position: 'absolute',
                  transform: 'rotate(-90deg)',
                }}
              >
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={2 * Math.PI * 36 * (1 - progress / 100)}
                  style={{
                    transition: 'stroke-dashoffset 0.1s ease-out',
                  }}
                />
              </svg>

              {/* Inner decorative circle */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />

              {/* Center dot */}
              <motion.div
                animate={{
                  scale: isComplete ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: isComplete 
                    ? 'rgba(201, 169, 98, 0.9)' 
                    : 'rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>

            {/* Progress text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}>
                {isComplete ? 'Ready' : 'Loading'}
              </span>
              
              <span style={{
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.1em',
              }}>
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
