import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm">© {new Date().getFullYear()} Intelligent Content Platform</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#compare" className="hover:text-white">Playground</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
