import React, { useEffect, useMemo, useState } from 'react';

const mockModels = [
  { name: 'GPT‑4', color: 'from-purple-500 to-indigo-500' },
  { name: 'Claude', color: 'from-amber-500 to-orange-500' },
  { name: 'Gemini', color: 'from-cyan-500 to-blue-500' },
];

function useTypeStream(text, speed = 18) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    setOutput('');
    let i = 0;
    const id = setInterval(() => {
      setOutput((prev) => prev + text[i]);
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

export default function ModelComparison() {
  const [prompt, setPrompt] = useState('Write a catchy headline for an AI-powered content platform.');
  const outputs = useMemo(
    () => [
      'Reimagine Content: Create, Analyze, and Optimize with Multi‑Model AI',
      'Your AI Studio: Craft Smarter Content with Real‑Time Intelligence',
      'From Idea to Impact: Content Supercharged by GPT‑4, Claude & Gemini',
    ],
    []
  );

  const stream0 = useTypeStream(outputs[0]);
  const stream1 = useTypeStream(outputs[1]);
  const stream2 = useTypeStream(outputs[2]);

  return (
    <section id="compare" className="w-full bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-['Inter'] text-3xl font-semibold sm:text-4xl">Interactive AI Playground</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Compare model responses side‑by‑side. In the full app, this streams tokens in real‑time from your backend.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <label className="mb-2 block text-sm text-slate-300">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-24 w-full rounded-md border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none focus:border-purple-400"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="rounded-md bg-white/5 px-2 py-1">Temperature: 0.7</span>
            <span className="rounded-md bg-white/5 px-2 py-1">Max Tokens: 128</span>
            <span className="rounded-md bg-white/5 px-2 py-1">Top‑P: 0.9</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {mockModels.map((m, idx) => (
            <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 rounded-md bg-gradient-to-r ${m.color} px-2 py-1 text-xs font-semibold text-white`}>
                  {m.name}
                </div>
                <span className="text-xs text-slate-400">streaming</span>
              </div>
              <div className="min-h-[120px] whitespace-pre-wrap rounded-md bg-slate-900/60 p-3 text-sm leading-relaxed">
                {idx === 0 ? stream0 : idx === 1 ? stream1 : stream2}
                <span className="ml-1 inline-block animate-pulse">▌</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
