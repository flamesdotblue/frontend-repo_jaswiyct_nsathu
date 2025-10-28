import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GameHero from './components/GameHero';
import Toolbar from './components/Toolbar';
import Board from './components/Board';
import GameDialog from './components/GameDialog';

// IndexedDB helpers
const DB_NAME = 'gamelog';
const STORE = 'games';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGetAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(game) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const req = store.put(game);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function idbClear() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const req = store.clear();
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

const THEME_KEY = 'theme-preference';
const BACKUP_KEY = 'last-backup-at';

function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');
  const [showBackupReminder, setShowBackupReminder] = useState(false);
  const fileInputRef = useRef(null);

  // Theme handling
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  // Load data
  useEffect(() => {
    (async () => {
      try {
        const all = await idbGetAll();
        setGames(all.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
      } catch (e) {
        console.error('Failed to load games', e);
      }
    })();
  }, []);

  // Backup reminder every 14 days
  useEffect(() => {
    const last = Number(localStorage.getItem(BACKUP_KEY) || '0');
    const now = Date.now();
    const fourteen = 14 * 24 * 60 * 60 * 1000;
    if (now - last > fourteen) setShowBackupReminder(true);
  }, []);

  const upsertGame = useCallback(async (payload) => {
    const isUpdate = Boolean(payload.id);
    const game = {
      id: payload.id || crypto.randomUUID(),
      title: payload.title,
      platform: payload.platform,
      genre: payload.genre,
      notes: payload.notes,
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      status: payload.status || 'want',
      createdAt: isUpdate ? payload.createdAt || Date.now() : Date.now(),
      updatedAt: Date.now(),
    };
    await idbPut(game);
    setGames((prev) => {
      const next = isUpdate ? prev.map((g) => (g.id === game.id ? { ...g, ...game } : g)) : [game, ...prev];
      return applySortFilter(next);
    });
  }, []);

  const removeGame = useCallback(async (id) => {
    await idbDelete(id);
    setGames((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const changeStatus = useCallback(async (id, status) => {
    setGames((prev) => prev.map((g) => (g.id === id ? { ...g, status, updatedAt: Date.now() } : g)));
    const game = games.find((g) => g.id === id);
    if (game) await idbPut({ ...game, status, updatedAt: Date.now() });
  }, [games]);

  // Derived lists
  const platforms = useMemo(() => {
    const s = new Set();
    games.forEach((g) => g.platform && s.add(g.platform));
    return Array.from(s).sort();
  }, [games]);
  const genres = useMemo(() => {
    const s = new Set();
    games.forEach((g) => g.genre && s.add(g.genre));
    return Array.from(s).sort();
  }, [games]);

  const applySortFilter = useCallback((list) => {
    let out = [...list];
    const q = search.trim().toLowerCase();
    if (q) {
      out = out.filter((g) => {
        const tags = Array.isArray(g.tags) ? g.tags : [];
        return (
          g.title.toLowerCase().includes(q) || tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }
    if (platformFilter) out = out.filter((g) => g.platform === platformFilter);
    if (genreFilter) out = out.filter((g) => g.genre === genreFilter);

    switch (sort) {
      case 'date-asc':
        out.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'alpha-asc':
        out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alpha-desc':
        out.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        out.sort((a, b) => b.createdAt - a.createdAt);
    }
    return out;
  }, [search, platformFilter, genreFilter, sort]);

  const filtered = useMemo(() => applySortFilter(games), [games, applySortFilter]);

  // Dialog handlers
  const openNew = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (game) => {
    setEditing(game);
    setDialogOpen(true);
  };
  const saveGame = async (payload) => {
    await upsertGame({ ...editing, ...payload });
    setDialogOpen(false);
  };

  // Import/Export
  const exportData = () => {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gamelog-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem(BACKUP_KEY, String(Date.now()));
    setShowBackupReminder(false);
  };

  const importClick = () => fileInputRef.current?.click();

  const importData = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (!Array.isArray(json)) throw new Error('Invalid JSON');
      // Ask user for mode
      const mode = window.prompt('Import mode: type "merge" to merge or "replace" to overwrite', 'merge');
      if (!mode) return;
      if (mode === 'replace') {
        await idbClear();
        for (const g of json) await idbPut(g);
        setGames(json);
      } else {
        // merge
        const byId = new Map(games.map((g) => [g.id, g]));
        json.forEach((g) => byId.set(g.id, { ...byId.get(g.id), ...g }));
        const merged = Array.from(byId.values());
        await idbClear();
        for (const g of merged) await idbPut(g);
        setGames(merged);
      }
    } catch (err) {
      alert('Failed to import: ' + (err?.message || 'Unknown error'));
    } finally {
      e.target.value = '';
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const input = document.querySelector('input[placeholder^="Search"]');
        input?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openNew();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        exportData();
      }
      if (e.key === 'Escape') {
        setDialogOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exportData]);

  const onClearAll = async () => {
    if (confirm('Clear all games? This cannot be undone.')) {
      await idbClear();
      setGames([]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
      <GameHero />

      {showBackupReminder && (
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-100">
            <p className="text-sm">It has been a while since your last backup. Export your data to a JSON file.</p>
            <button onClick={exportData} className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-amber-400">Backup now</button>
          </div>
        </div>
      )}

      <Toolbar
        search={search}
        setSearch={setSearch}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        sort={sort}
        setSort={setSort}
        theme={theme}
        toggleTheme={toggleTheme}
        onAdd={openNew}
        onExport={exportData}
        onImportClick={importClick}
        onClearAll={onClearAll}
        platforms={platforms}
        genres={genres}
      />

      <Board
        games={filtered}
        onStatusChange={changeStatus}
        onEdit={openEdit}
        onDelete={removeGame}
      />

      <GameDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={saveGame}
        initial={editing}
      />

      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importData} />
    </div>
  );
}

export default App;
