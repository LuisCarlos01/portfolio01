import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Preloader } from '@/components/common/Preloader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { usePreloader } from '@/hooks/usePreloader';

// Lazy loading de páginas para code splitting
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

function App() {
  const { showPreloader, handlePreloaderComplete } = usePreloader();

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={`min-h-screen ${!showPreloader ? 'animate-fadeIn' : ''}`}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
