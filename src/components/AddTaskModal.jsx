import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function AddTaskModal({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
    setOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-xl shadow-purple-500/30 transition hover:scale-105 focus:outline-none"
        aria-label="Add task"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/70 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Add a new task</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-slate-300 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit();
                if (e.key === 'Escape') setOpen(false);
              }}
              placeholder="e.g. Draft blog outline, plan weekly groceries, ..."
              className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-purple-400"
              autoFocus
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
