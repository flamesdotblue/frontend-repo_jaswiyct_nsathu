import React, { useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function StatusColumn({ title, status, games, onDropGame, onEdit, onDelete }) {
  const [over, setOver] = useState(false);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-slate-900/50 p-3 transition ${over ? 'ring-2 ring-indigo-500/60' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData('text/plain');
        if (id) onDropGame(id, status);
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-200">{title}</h3>
        <span className="text-xs text-slate-400">{games.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {games.map((g) => (
          <GameCard key={g.id} game={g} onEdit={() => onEdit(g)} onDelete={() => onDelete(g.id)} />
        ))}
        {games.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/10 p-6 text-center text-xs text-slate-500">
            Drag games here
          </div>
        )}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">{children}</span>
  );
}

function GameCard({ game, onEdit, onDelete }) {
  const tags = Array.isArray(game.tags) ? game.tags : (game.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  return (
    <div
      className="group cursor-grab rounded-lg border border-white/10 bg-slate-800/60 p-3 shadow-sm transition hover:shadow-md active:cursor-grabbing"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', game.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">{game.title}</h4>
          <div className="mt-0.5 text-xs text-slate-400">{game.platform} • {game.genre}</div>
        </div>
        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          <button onClick={onEdit} className="rounded-md border border-white/10 bg-slate-900/50 p-1 text-slate-300 hover:bg-slate-900/80">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={onDelete} className="rounded-md border border-white/10 bg-rose-600/20 p-1 text-rose-200 hover:bg-rose-600/30">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {game.notes && <p className="mt-2 line-clamp-2 text-xs text-slate-300">{game.notes}</p>}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </div>
  );
}

function Board({ games, onStatusChange, onEdit, onDelete }) {
  const grouped = useMemo(() => {
    return {
      want: games.filter((g) => g.status === 'want'),
      playing: games.filter((g) => g.status === 'playing'),
      played: games.filter((g) => g.status === 'played'),
    };
  }, [games]);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <StatusColumn title="Want to Play" status="want" games={grouped.want} onDropGame={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
      <StatusColumn title="Playing" status="playing" games={grouped.playing} onDropGame={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
      <StatusColumn title="Played" status="played" games={grouped.played} onDropGame={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default Board;
