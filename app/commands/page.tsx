import type { Metadata } from 'next'
import { getCommands } from '@/lib/cosmic'
import CommandCard from '@/components/CommandCard'

export const metadata: Metadata = {
  title: 'Commands — CTRL AI',
  description: 'Browse all available file operation commands for the CTRL AI desktop assistant.',
}

export default async function CommandsPage() {
  const commands = await getCommands()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-medium mb-4">
          <span>📋</span> Command Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Commands
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Every command is parsed into a structured intent, previewed before execution,
          and logged for full auditability.
        </p>
      </div>

      {/* Intent Format */}
      <div className="glass-card rounded-2xl p-6 mb-12 border border-slate-700/30">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Structured Intent Format</h2>
        <pre className="text-sm font-mono text-slate-400 leading-relaxed overflow-x-auto">
{`{
  "intent": "files.search | files.open | files.organize | files.move",
  "args": {
    "query": "...",
    "destination": "...",
    "group_by": "type | date",
    "simulate": true
  }
}`}
        </pre>
      </div>

      {/* Commands Grid */}
      {commands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commands.map((command) => (
            <CommandCard key={command.id} command={command} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📋"
          title="No commands yet"
          description="Commands will appear here once they're added to the CMS."
        />
      )}
    </div>
  )
}

function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="glass-card rounded-2xl p-12 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}