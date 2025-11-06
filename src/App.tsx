import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProviders } from '@/contexts/AppProviders';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy loading de páginas para code splitting
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

function App() {
  return (
    <AppProviders>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
