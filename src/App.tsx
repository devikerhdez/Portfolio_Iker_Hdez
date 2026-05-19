import { lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const Experience = lazy(() => import('./components/Experience'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'light' ? 'light-mode' : ''} bg-black text-white selection:bg-red-primary selection:text-white min-h-screen relative transition-colors duration-300`}>
      <CustomCursor />
      <PageLoader />

      <Navbar />
      
      <main>
        <Hero />
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING EXPERIENCE_</div>}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING STACK_</div>}>
          <TechStack />
        </Suspense>

        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING PROJECTS_</div>}>
          <Projects />
        </Suspense>

        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING CONTACT_</div>}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
