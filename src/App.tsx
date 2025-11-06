import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProviders } from './contexts/AppProviders';
import LoadingSpinner from './components/common/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

