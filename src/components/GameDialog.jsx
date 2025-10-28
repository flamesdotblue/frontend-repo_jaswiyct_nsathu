import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

function GameDialog({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('want');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setPlatform(initial?.platform || '');
      setGenre(initial?.genre || '');
      setNotes(initial?.notes || '');
      setTags(Array.isArray(initial?.tags) ? initial.tags.join(', ') : (initial?.tags || ''));
      setStatus(initial?.status || 'want');
      setError('');
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [open, initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    const payload = {
      ...(initial?.id ? { id: initial.id } : {}),
      title: title.trim(),
      platform: platform.trim(),
      genre: genre.trim(),
      notes: notes.trim(),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      status,
    };
    onSave(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur" onClick={onClose} />
      <div className="relative z-10 w-[min(560px,92vw)] rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">{initial ? 'Edit Game' : 'Add Game'}</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-300 hover:bg-slate-800/70">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Title</label>
            <input ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
            {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-slate-400">Platform</label>
              <input value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">Genre</label>
              <input value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Tags (comma separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-slate-200">
              <option value="want">Want to Play</option>
              <option value="playing">Playing</option>
              <option value="played">Played</option>
            </select>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">Cancel</button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GameDialog;
