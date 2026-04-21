import { lazy, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));

function App() {
  return (
    <div className="bg-black text-white selection:bg-red-primary selection:text-white min-h-screen relative">
      <CustomCursor />
      <PageLoader />

      <Navbar />
      
      <main>
        <Hero />
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING EXPERIENCE_</div>}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div className="h-64 flex items-center justify-center text-red-primary font-mono text-sm animate-pulse">LOADING PROJECTS_</div>}>
          <Projects />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
