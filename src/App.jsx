import React from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ModelComparison from './components/ModelComparison';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <Hero />
      <FeatureGrid />
      <ModelComparison />
      <Footer />
    </div>
  );
}

export default App;
