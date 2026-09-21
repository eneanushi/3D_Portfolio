import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../../content';

interface GlobalLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  minDuration?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const RAIL_WIDTH = 148;

/** Shorter curtain once the app is warm — see `resolveDuration` below. */
const RETURN_DURATION = 620;

/**
 * The first load really is waiting on the bundle and the 3D assets, so it earns
 * the full curtain. Every route change after that is instant, and holding the
 * screen for over a second would be pure theatre.
 */
let hasBooted = false;

const resolveDuration = (minDuration: number) =>
  hasBooted ? Math.min(minDuration, RETURN_DURATION) : minDuration;

/** Fast at first, settling as it approaches the end — reads as real work. */
const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * The full-screen curtain between routes.
 *
 * Visually identical to the boot screen in index.html — same monogram, same
 * rail, same meta row — so the hand-off from "bundle downloading" to "app
 * running" is seamless, and every route change re-uses the same language.
 */
export const GlobalLoader = ({
  isLoading,
  onComplete,
  minDuration = 1200,
}: GlobalLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const reduceMotion = useReducedMotion();

  // Kept in a ref so the animation effect does not restart if the parent
  // passes a new function identity on every render.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      setProgress(0);
      setIsComplete(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!show) return;

    const duration = resolveDuration(minDuration);
    const startTime = performance.now();
    let animationFrame = 0;
    let exitTimer = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      setProgress(easeOutExpo(rawProgress) * 100);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        hasBooted = true;
        // A short beat on "Ready" before the curtain lifts
        exitTimer = window.setTimeout(() => {
          setShow(false);
          onCompleteRef.current?.();
        }, 340);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
    };
  }, [show, minDuration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // The curtain opens outward rather than simply vanishing
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035 }}
          transition={{
            opacity: { duration: 0.42, ease: EASE },
            scale: { duration: 0.6, ease: EASE },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
            zIndex: 9999,
          }}
        >
          {/* Warm pool of light behind the mark */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 50% 40% at 50% 46%, rgba(201, 169, 98, 0.055), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Grain */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.022,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Monogram */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              position: 'relative',
              fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
              fontWeight: 300,
              fontSize: '54px',
              lineHeight: 1,
              letterSpacing: '0.2em',
              textIndent: '0.2em', // offsets the trailing letter-space
              color: 'rgba(255, 255, 255, 0.92)',
            }}
          >
            {siteConfig.identity.initials}
          </motion.div>

          {/* Progress rail */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            style={{
              position: 'relative',
              width: `${RAIL_WIDTH}px`,
              height: '1px',
              marginTop: '30px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.09)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transform: `scaleX(${progress / 100})`,
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.92))',
              }}
            />
          </motion.div>

          {/* Meta row — identical structure to the boot screen's */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: `${RAIL_WIDTH}px`,
              marginTop: '15px',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <span>{isComplete ? 'Ready' : siteConfig.identity.fullName}</span>
            <span
              style={{
                fontVariantNumeric: 'tabular-nums',
                color: isComplete ? 'rgba(201, 169, 98, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                transition: 'color 300ms ease',
              }}
            >
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
