import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, Save, X } from 'lucide-react';

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  return (
    <div className="group flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:border-purple-400/30 hover:bg-white/10">
      <button
        onClick={() => onToggle(task.id)}
        className="shrink-0 text-slate-300 transition hover:text-white"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>

      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setIsEditing(false);
              setText(task.text);
            }
          }}
          className="flex-1 rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none focus:border-purple-400"
          autoFocus
        />
      ) : (
        <div
          className={`flex-1 text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}
        >
          {task.text}
        </div>
      )}

      <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-md bg-emerald-500/20 p-2 text-emerald-300 hover:bg-emerald-500/30"
              aria-label="Save"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setText(task.text);
              }}
              className="rounded-md bg-white/10 p-2 text-slate-300 hover:bg-white/20"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-white/10 p-2 text-slate-300 hover:bg-white/20"
              aria-label="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-md bg-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/30"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
