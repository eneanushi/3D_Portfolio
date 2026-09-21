import { motion, AnimatePresence } from 'framer-motion';

interface LandscapePromptProps {
  isVisible: boolean;
}

export const LandscapePrompt = ({ isVisible }: LandscapePromptProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f18 50%, #0a0a0f 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '40px',
          }}
        >
          {/* Animated phone rotation icon */}
          <motion.div
            animate={{
              rotate: [0, -90, -90, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.3, 0.7, 1],
            }}
            style={{
              marginBottom: '32px',
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18" />
            </svg>
          </motion.div>

          {/* Rotation arrows */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201, 169, 98, 0.85)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 2v6h6M21.5 22v-6h-6" />
              <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
            </svg>
          </motion.div>

          {/* Title */}
          <h2 style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#ffffff',
            marginBottom: '12px',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.05em',
          }}>
            Rotate Your Device
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: '280px',
          }}>
            For the best Arena experience, please rotate your device to landscape mode
          </p>

          {/* Visual indicator line */}
          <motion.div
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.6), transparent)',
              marginTop: '40px',
              borderRadius: '1px',
            }}
          />

          {/* Decorative corner elements */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            width: '40px',
            height: '40px',
            borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          }} />
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderRight: '2px solid rgba(255, 255, 255, 0.1)',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            width: '40px',
            height: '40px',
            borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderRight: '2px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
