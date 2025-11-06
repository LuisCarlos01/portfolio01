import { useState, useEffect } from 'react';

export const usePreloader = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    document.body.classList.add('app-loaded');

    setTimeout(() => {
      setIsAppLoaded(true);
    }, 200);
  };

  // Prevenir scroll durante o preloader
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  return {
    showPreloader,
    isAppLoaded,
    handlePreloaderComplete,
  };
};

