import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

interface ControlKey {
  key: string;
  label: string;
  action: string;
  keyCode: keyof ReturnType<typeof useGameStore.getState>['keys'];
}

const movementKeys: ControlKey[] = [
  { key: 'W', label: 'W', action: 'Forward', keyCode: 'w' },
  { key: 'A', label: 'A', action: 'Left', keyCode: 'a' },
  { key: 'S', label: 'S', action: 'Back', keyCode: 's' },
  { key: 'D', label: 'D', action: 'Right', keyCode: 'd' },
];

const actionKeys: ControlKey[] = [
  { key: 'Shift', label: '⇧', action: 'Sprint', keyCode: 'shift' },
];

// Memoized key button to prevent unnecessary re-renders
const KeyButton = memo(({ 
  control, 
  size = 'normal',
  isActive,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}: { 
  control: ControlKey; 
  size?: 'normal' | 'wide';
  isActive: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}) => {
  const buttonSize = size === 'wide' ? '52px' : '40px';
  const buttonWidth = size === 'wide' ? '52px' : '40px';

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onMouseUp();
      }}
      style={{
        width: buttonWidth,
        height: buttonSize,
        borderRadius: '10px',
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'none',
        transform: isActive ? 'scale(0.92)' : 'scale(1)',
        backgroundColor: isActive 
          ? 'rgba(59, 130, 246, 0.4)' 
          : 'rgba(255, 255, 255, 0.06)',
        borderColor: isActive 
          ? 'rgba(59, 130, 246, 0.6)' 
          : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isActive 
          ? '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)' 
          : '0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.08s ease-out',
      }}
    >
      {/* Glow effect - always present, just fades opacity */}
      <div
        style={{
          position: 'absolute',
          inset: '-50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.1s ease-out',
        }}
      />
      
      {/* Key label */}
      <span style={{
        fontSize: size === 'wide' ? '14px' : '13px',
        fontWeight: 600,
        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        zIndex: 1,
        textShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
        transition: 'all 0.08s ease-out',
      }}>
        {control.label}
      </span>
    </button>
  );
});

KeyButton.displayName = 'KeyButton';

export const ControlsPanel = () => {
  const showControlsPanel = useGameStore((state) => state.showControlsPanel);
  const toggleControlsPanel = useGameStore((state) => state.toggleControlsPanel);
  const keys = useGameStore((state) => state.keys);
  const setKey = useGameStore((state) => state.setKey);
  const [isExpanded, setIsExpanded] = useState(true);
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (keys.h) {
      toggleControlsPanel();
    }
  }, [keys.h, toggleControlsPanel]);

  // Handle mouse down on control button
  const handleMouseDown = useCallback((keyCode: keyof ReturnType<typeof useGameStore.getState>['keys']) => {
    setKey(keyCode, true);
    setPressedButtons(prev => new Set(prev).add(keyCode));
  }, [setKey]);

  // Handle mouse up on control button
  const handleMouseUp = useCallback((keyCode: keyof ReturnType<typeof useGameStore.getState>['keys']) => {
    setKey(keyCode, false);
    setPressedButtons(prev => {
      const next = new Set(prev);
      next.delete(keyCode);
      return next;
    });
  }, [setKey]);

  // Handle mouse leave (in case user drags away while holding)
  const handleMouseLeave = useCallback((keyCode: keyof ReturnType<typeof useGameStore.getState>['keys']) => {
    if (pressedButtons.has(keyCode)) {
      setKey(keyCode, false);
      setPressedButtons(prev => {
        const next = new Set(prev);
        next.delete(keyCode);
        return next;
      });
    }
  }, [pressedButtons, setKey]);

  // Global mouse up handler to release keys if mouse is released outside
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (pressedButtons.size > 0) {
        pressedButtons.forEach(keyCode => {
          setKey(keyCode as keyof ReturnType<typeof useGameStore.getState>['keys'], false);
        });
        setPressedButtons(new Set());
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [pressedButtons, setKey]);

  return (
    <AnimatePresence>
      {showControlsPanel && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 'var(--space-xl)',
            right: 'var(--space-xl)',
            zIndex: 100,
          }}
        >
          {/* Main container */}
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(15, 15, 20, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
              padding: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: isExpanded ? '14px' : 0,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'margin-bottom 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Animated indicator */}
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}
                />
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  Controls
                </span>
              </div>
              
              {/* Toggle button */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.5,
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
            </div>

            {/* Expandable content */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isExpanded ? '300px' : '0px',
                opacity: isExpanded ? 1 : 0,
                transition: 'all 0.25s ease',
              }}
            >
              {/* Movement controls - WASD layout */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.3)',
                  marginBottom: '8px',
                }}>
                  Movement
                </p>
                
                {/* WASD Grid */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  {/* W key */}
                  <KeyButton 
                    control={movementKeys[0]} 
                    isActive={keys.w}
                    onMouseDown={() => handleMouseDown('w')}
                    onMouseUp={() => handleMouseUp('w')}
                    onMouseLeave={() => handleMouseLeave('w')}
                  />
                  
                  {/* A S D keys row */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <KeyButton 
                      control={movementKeys[1]} 
                      isActive={keys.a}
                      onMouseDown={() => handleMouseDown('a')}
                      onMouseUp={() => handleMouseUp('a')}
                      onMouseLeave={() => handleMouseLeave('a')}
                    />
                    <KeyButton 
                      control={movementKeys[2]} 
                      isActive={keys.s}
                      onMouseDown={() => handleMouseDown('s')}
                      onMouseUp={() => handleMouseUp('s')}
                      onMouseLeave={() => handleMouseLeave('s')}
                    />
                    <KeyButton 
                      control={movementKeys[3]} 
                      isActive={keys.d}
                      onMouseDown={() => handleMouseDown('d')}
                      onMouseUp={() => handleMouseUp('d')}
                      onMouseLeave={() => handleMouseLeave('d')}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                margin: '12px 0',
              }} />

              {/* Action controls */}
              <div>
                <p style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.3)',
                  marginBottom: '8px',
                }}>
                  Actions
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                }}>
                  {actionKeys.map((control) => (
                    <div key={control.key} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <KeyButton 
                        control={control} 
                        size="wide" 
                        isActive={keys[control.keyCode]}
                        onMouseDown={() => handleMouseDown(control.keyCode)}
                        onMouseUp={() => handleMouseUp(control.keyCode)}
                        onMouseLeave={() => handleMouseLeave(control.keyCode)}
                      />
                      <span style={{
                        fontSize: '9px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {control.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer hint */}
              <div style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}>
                  Press
                </span>
                <span style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 500,
                }}>
                  H
                </span>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}>
                  to hide
                </span>
              </div>
            </div>
          </div>

          {/* CSS for pulse animation */}
          <style>{`
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
