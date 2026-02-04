import { useEffect, useState, useCallback, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useGameStore } from './stores/gameStore';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useMobileDetection } from './hooks/useMobileDetection';
import { Scene } from './Scene';
import { EntryScreen } from './components/ui/EntryScreen';
import { MissionBriefing } from './components/ui/MissionBriefing';
import { ControlsPanel } from './components/ui/ControlsPanel';
import { StationUI } from './components/ui/StationUI';
import { GameHUD } from './components/ui/GameHUD';
import { ContactPage } from './components/ui/ContactPage';
import { ResumePage } from './components/ui/ResumePage';
import { GlobalLoader } from './components/ui/GlobalLoader';
import { MobileTouchControls } from './components/ui/MobileTouchControls';
import { LandscapePrompt } from './components/ui/LandscapePrompt';
import './styles/globals.css';

// Arena view component (the playing state)
const ArenaView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { isMobile, isPortrait, isTouchDevice } = useMobileDetection();
  
  useKeyboardControls();

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Show landscape prompt on mobile in portrait mode
  const showLandscapePrompt = isMobile && isPortrait;

  return (
    <>
      <GlobalLoader isLoading={isLoading} onComplete={handleLoadComplete} />
      
      {/* Landscape orientation prompt for mobile */}
      <LandscapePrompt isVisible={showLandscapePrompt && showContent} />
      
      {showContent && !showLandscapePrompt && (
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh', 
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          {/* 3D Scene - full screen canvas */}
          <div 
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </div>
          
          {/* UI Elements - on top of scene */}
          <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }}>
              <GameHUD />
              {/* Show touch controls on mobile, keyboard controls panel on desktop */}
              {isMobile || isTouchDevice ? (
                <MobileTouchControls />
              ) : (
                <ControlsPanel />
              )}
              <StationUI />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Home view component
const HomeView = () => {
  return <EntryScreen />;
};

// About view component (Mission Briefing)
const AboutView = () => {
  return <MissionBriefing />;
};

// Route wrapper that syncs URL with game state
const AppRoutes = () => {
  const location = useLocation();
  const gamePhase = useGameStore((state) => state.gamePhase);
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  const reset = useGameStore((state) => state.reset);

  // Sync URL changes to game state
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      if (gamePhase !== 'entry') {
        reset();
        setGamePhase('entry');
      }
    } else if (path === '/about') {
      if (gamePhase !== 'mission') {
        setGamePhase('mission');
      }
    } else if (path === '/arena') {
      if (gamePhase !== 'playing') {
        setGamePhase('playing');
      }
    }
    // Contact page is handled separately and doesn't affect game state
  }, [location.pathname, gamePhase, setGamePhase, reset]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      // The URL has already changed, the useEffect above will sync the state
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/arena" element={<ArenaView />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
