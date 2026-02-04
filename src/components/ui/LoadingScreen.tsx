import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-primary)',
        zIndex: 1000,
      }}
    >
      {/* Simple Loading Indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-xl)',
      }}>
        {/* Spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-text-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />

        <p style={{
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '1px',
          color: 'var(--color-text-secondary)',
        }}>
          Loading
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};
