import React from 'react';
import { ListChecks } from 'lucide-react';

export default function Header({ remaining, total, onClearCompleted }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <ListChecks className="h-5 w-5 text-purple-300" />
          </div>
          <div>
            <h1 className="font-['Inter'] text-lg font-semibold text-white">Tasks</h1>
            <p className="text-xs text-slate-400">{remaining} of {total} remaining</p>
          </div>
        </div>
        <button
          onClick={onClearCompleted}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-white"
        >
          Clear completed
        </button>
      </div>
    </header>
  );
}
