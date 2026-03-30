import Link from 'next/link'
import type { Command } from '@/types'
import { getMetafieldValue, getBooleanValue } from '@/lib/cosmic'

interface CommandCardProps {
  command: Command;
}

export default function CommandCard({ command }: CommandCardProps) {
  const meta = command.metadata
  const isDangerous = getBooleanValue(meta?.is_dangerous)
  const supportsUndo = getBooleanValue(meta?.supports_undo)
  const supportsSimulate = getBooleanValue(meta?.supports_simulate)
  const category = getMetafieldValue(meta?.category)
  const intentKey = getMetafieldValue(meta?.intent_key)
  const iconEmoji = getMetafieldValue(meta?.icon_emoji) || '📁'
  const description = getMetafieldValue(meta?.description)

  const examplePrompts = getMetafieldValue(meta?.example_prompts)
  const examples = examplePrompts
    ? examplePrompts.split('\n').filter((line) => line.trim().length > 0).slice(0, 3)
    : []

  return (
    <Link href={`/commands/${command.slug}`} className="block group">
      <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-300 h-full flex flex-col group-hover:border-cyan-500/30">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{iconEmoji}</div>
          <div className="flex items-center gap-2">
            {isDangerous && (
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                Dangerous
              </span>
            )}
            {supportsUndo && (
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Undo
              </span>
            )}
            {supportsSimulate && (
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">
                Simulate
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
          {getMetafieldValue(meta?.name) || command.title}
        </h3>

        {intentKey && (
          <code className="text-xs font-mono text-cyan-400/70 mb-3 block">
            {intentKey}
          </code>
        )}

        {description && (
          <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
            {description}
          </p>
        )}

        {examples.length > 0 && (
          <div className="mt-auto pt-4 border-t border-slate-800/50">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-semibold">
              Example prompts
            </p>
            <div className="space-y-1.5">
              {examples.map((example, i) => (
                <div
                  key={i}
                  className="text-xs font-mono text-slate-400 bg-slate-800/40 rounded-lg px-3 py-1.5 truncate"
                >
                  &gt; {example.trim()}
                </div>
              ))}
            </div>
          </div>
        )}

        {category && (
          <div className="mt-4">
            <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/50 rounded-full border border-slate-700/30">
              {category}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}