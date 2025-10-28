import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm text-slate-400">You have no tasks yet. Add your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {tasks.map((t) => (
        <TodoItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)
      )}
    </div>
  );
}
