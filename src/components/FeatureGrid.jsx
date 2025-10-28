import React from 'react';
import { Cpu, Database, Gauge, Shield, Image as ImageIcon, Search } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Multi‑Model Orchestration',
    desc: 'Run GPT‑4, Claude, and Gemini in parallel with smart routing and fallbacks.',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    desc: 'Embed content and retrieve context with vector search for grounded responses.',
  },
  {
    icon: ImageIcon,
    title: 'Image Intelligence',
    desc: 'Generate alt‑text, moderate content, and analyze visuals with computer vision.',
  },
  {
    icon: Database,
    title: 'Structured Memory',
    desc: 'Persist conversations, prompts, and analytics with reliable data storage.',
  },
  {
    icon: Gauge,
    title: 'Real‑time Streaming',
    desc: 'Server‑Sent Events for instant token streaming and responsive UX.',
  },
  {
    icon: Shield,
    title: 'Safety & Governance',
    desc: 'Rate limiting, moderation, and usage controls for team workflows.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative w-full bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-['Inter'] text-3xl font-semibold sm:text-4xl">Built for production AI</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-300">
          Everything you need to create, analyze, and optimize content with confidence.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-400/40 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex rounded-lg bg-purple-500/15 p-3 text-purple-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
