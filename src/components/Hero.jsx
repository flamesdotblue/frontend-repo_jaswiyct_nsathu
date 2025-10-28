import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* Spline 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay for readability - doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/90" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
          <Rocket className="h-4 w-4 text-purple-300" />
          <span className="text-xs font-medium tracking-wide text-purple-100">Intelligent Content Creation Platform</span>
        </div>
        <h1 className="font-['Inter'] text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Create, analyze, and optimize content with multi‑model AI
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Compare GPT‑4, Claude, and Gemini side‑by‑side, stream responses in real time, and supercharge your workflow with vector search and analytics.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#compare"
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-purple-500/20 transition hover:bg-slate-100"
          >
            Try the AI Playground
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}
