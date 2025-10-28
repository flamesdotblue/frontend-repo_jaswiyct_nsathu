import React from 'react';
import Spline from '@splinetool/react-spline';

function GameHero() {
  return (
    <section className="relative h-[320px] w-full overflow-hidden rounded-b-3xl bg-slate-900/60">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/jQwvQSncGp8maF9S/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient for legibility; allow 3D scene interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="pointer-events-none select-none">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Game Log Manager
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
            Organize your games across Played, Playing, and Want to Play. Totally offline with backups and rich search.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GameHero;
