import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

interface JoystickPosition {
  x: number;
  y: number;
}

export const MobileTouchControls = () => {
  const setKey = useGameStore((state) => state.setKey);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState<JoystickPosition>({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const joystickBaseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchIdRef = useRef<number | null>(null);

  const maxDistance = 40;

  // Reset all keys when component unmounts
  useEffect(() => {
    return () => {
      setKey('w', false);
      setKey('a', false);
      setKey('s', false);
      setKey('d', false);
      setKey('shift', false);
    };
  }, [setKey]);

  // Update movement based on joystick position
  useEffect(() => {
    if (!joystickActive) {
      setKey('w', false);
      setKey('a', false);
      setKey('s', false);
      setKey('d', false);
      return;
    }

    const threshold = 0.3;
    const normalizedX = joystickPos.x / maxDistance;
    const normalizedY = joystickPos.y / maxDistance;

    // Forward/Backward (Y axis - inverted because up is negative)
    setKey('w', normalizedY < -threshold);
    setKey('s', normalizedY > threshold);

    // Left/Right (X axis)
    setKey('a', normalizedX < -threshold);
    setKey('d', normalizedX > threshold);
  }, [joystickActive, joystickPos, setKey]);

  // Handle run button
  useEffect(() => {
    setKey('shift', isRunning);
  }, [isRunning, setKey]);

  const handleJoystickStart = useCallback((e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    
    const touch = e.touches[0];
    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;

    touchIdRef.current = touch.identifier;
    joystickBaseRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setJoystickActive(true);
    setJoystickPos({ x: 0, y: 0 });
  }, []);

  const handleJoystickMove = useCallback((e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;

    const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
    if (!touch) return;

    let deltaX = touch.clientX - joystickBaseRef.current.x;
    let deltaY = touch.clientY - joystickBaseRef.current.y;

    // Clamp to max distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      deltaX *= scale;
      deltaY *= scale;
    }

    setJoystickPos({ x: deltaX, y: deltaY });
  }, []);

  const handleJoystickEnd = useCallback(() => {
    touchIdRef.current = null;
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '180px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px 20px 24px',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {/* Left side - Joystick */}
      <div
        ref={joystickRef}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          pointerEvents: 'auto',
          touchAction: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.02)',
        }}
      >
        {/* Direction indicators */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '8px solid rgba(255, 255, 255, 0.2)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '8px solid rgba(255, 255, 255, 0.2)',
        }} />
        <div style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '8px solid rgba(255, 255, 255, 0.2)',
        }} />
        <div style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '8px solid rgba(255, 255, 255, 0.2)',
        }} />
        
        {/* Joystick knob */}
        <motion.div
          animate={{
            x: joystickPos.x,
            y: joystickPos.y,
            scale: joystickActive ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: joystickActive 
              ? 'linear-gradient(145deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.5) 100%)'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: `2px solid ${joystickActive ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)'}`,
            boxShadow: joystickActive 
              ? '0 0 20px rgba(59, 130, 246, 0.5)' 
              : '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* Center - Move label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.5,
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          Move
        </span>
      </div>

      {/* Right side - Run button */}
      <motion.button
        onTouchStart={() => setIsRunning(true)}
        onTouchEnd={() => setIsRunning(false)}
        onTouchCancel={() => setIsRunning(false)}
        animate={{
          scale: isRunning ? 0.95 : 1,
          backgroundColor: isRunning 
            ? 'rgba(59, 130, 246, 0.5)' 
            : 'rgba(255, 255, 255, 0.08)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: `2px solid ${isRunning ? 'rgba(59, 130, 246, 0.7)' : 'rgba(255, 255, 255, 0.15)'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          pointerEvents: 'auto',
          touchAction: 'none',
          cursor: 'pointer',
          boxShadow: isRunning 
            ? '0 0 25px rgba(59, 130, 246, 0.4)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Run icon */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isRunning ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 4v4l4 1" />
          <path d="m17 21-4-4-4 1 2-4.5" />
          <path d="M12 12 8 8" />
          <circle cx="16" cy="4" r="2" />
        </svg>
        <span style={{
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: isRunning ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
        }}>
          Run
        </span>
      </motion.button>
    </div>
  );
};
