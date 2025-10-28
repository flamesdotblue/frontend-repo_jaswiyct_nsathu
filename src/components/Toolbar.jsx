import React from 'react';
import { Search, Upload, Download, Sun, Moon, Plus, Trash2 } from 'lucide-react';

function Toolbar({
  search,
  setSearch,
  platformFilter,
  setPlatformFilter,
  genreFilter,
  setGenreFilter,
  sort,
  setSort,
  theme,
  toggleTheme,
  onAdd,
  onExport,
  onImportClick,
  onClearAll,
  platforms,
  genres,
}) {
  return (
    <div className="sticky top-0 z-20 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or tag (/ to focus)"
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
          />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-none">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
          >
            <option value="">All Platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="col-span-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 sm:col-auto"
          >
            <option value="date-desc">Date Added • Newest</option>
            <option value="date-asc">Date Added • Oldest</option>
            <option value="alpha-asc">Alphabetical • A–Z</option>
            <option value="alpha-desc">Alphabetical • Z–A</option>
          </select>
        </div>

        <div className="flex flex-none items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg border border-white/10 bg-slate-900/60 p-2 text-slate-200 hover:bg-slate-800/60">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={onImportClick} className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/60">
            <Upload className="h-4 w-4" /> Import
          </button>
          <button onClick={onExport} className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/60">
            <Download className="h-4 w-4" /> Export
          </button>
          <button onClick={onAdd} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500">
            <Plus className="h-4 w-4" /> New
          </button>
          <button onClick={onClearAll} className="hidden items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/20 sm:flex">
            <Trash2 className="h-4 w-4" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
