import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTaskModal from './components/AddTaskModal';

const STORAGE_KEY = 'todos';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore write errors
    }
  }, [tasks]);

  const remaining = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, text) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Header remaining={remaining} total={tasks.length} onClearCompleted={clearCompleted} />

      <main className="mx-auto max-w-3xl px-5 pb-28 pt-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-900/40 p-5">
          <div className="mb-3 text-sm text-slate-400">Your Tasks</div>
          <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        </div>
      </main>

      <AddTaskModal onAdd={addTask} />
    </div>
  );
}

export default App;
