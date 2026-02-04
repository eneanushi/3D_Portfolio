import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

export const useKeyboardControls = () => {
  const setKey = useGameStore((state) => state.setKey);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get current UI state from store (not from closure)
      const isUIOpen = useGameStore.getState().isUIOpen;
      
      // Prevent default behavior for specific keys
      if (['w', 'a', 's', 'd', 'i', 'h', 'e', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case 'w':
          if (!isUIOpen) setKey('w', true);
          break;
        case 'a':
          if (!isUIOpen) setKey('a', true);
          break;
        case 's':
          if (!isUIOpen) setKey('s', true);
          break;
        case 'd':
          if (!isUIOpen) setKey('d', true);
          break;
        case 'shift':
          if (!isUIOpen) setKey('shift', true);
          break;
        case 'i':
          if (!isUIOpen) setKey('i', true);
          break;
        case 'h':
          setKey('h', true);
          break;
        case 'e':
          setKey('e', true);
          break;
        case 'escape':
          setKey('escape', true);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'w':
          setKey('w', false);
          break;
        case 'a':
          setKey('a', false);
          break;
        case 's':
          setKey('s', false);
          break;
        case 'd':
          setKey('d', false);
          break;
        case 'shift':
          setKey('shift', false);
          break;
        case 'i':
          setKey('i', false);
          break;
        case 'h':
          setKey('h', false);
          break;
        case 'e':
          setKey('e', false);
          break;
        case 'escape':
          setKey('escape', false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setKey]);
};
