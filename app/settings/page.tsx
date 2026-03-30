import type { Metadata } from 'next'
import { getSettings } from '@/lib/cosmic'
import SettingsCard from '@/components/SettingsCard'

export const metadata: Metadata = {
  title: 'Settings — CTRL AI',
  description: 'Configuration and settings for the CTRL AI desktop assistant.',
}

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 font-medium mb-4">
          <span>⚙️</span> Configuration
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Settings
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Configure allowed paths, blocked operations, hotkeys, themes, and safety defaults
          for your CTRL AI instance.
        </p>
      </div>

      {/* Safety Overview */}
      <div className="glass-card rounded-2xl p-6 mb-12">
        <h2 className="text-sm font-semibold text-white mb-4">Safety Model Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 rounded-xl p-4">
            <div className="text-emerald-400 text-lg mb-2">🛡️</div>
            <h3 className="text-xs font-semibold text-white mb-1">Path Restrictions</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Only operate within explicitly allowed directories</p>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <div className="text-rose-400 text-lg mb-2">🚫</div>
            <h3 className="text-xs font-semibold text-white mb-1">Blocked Operations</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Delete and destructive operations blocked in MVP</p>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <div className="text-violet-400 text-lg mb-2">👁️</div>
            <h3 className="text-xs font-semibold text-white mb-1">Simulate First</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Batch operations run in dry-run mode by default</p>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <div className="text-cyan-400 text-lg mb-2">📋</div>
            <h3 className="text-xs font-semibold text-white mb-1">Full Audit Trail</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">Every action logged with configurable retention</p>
          </div>
        </div>
      </div>

      {/* Settings Cards */}
      {settings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settings.map((setting) => (
            <SettingsCard key={setting.id} settings={setting} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold text-white mb-2">No settings configured</h3>
          <p className="text-sm text-slate-400">Settings will appear here once they&apos;re added to the CMS.</p>
        </div>
      )}

      {/* Schema Reference */}
      <div className="glass-card rounded-2xl p-6 mt-12">
        <h2 className="text-sm font-semibold text-white mb-4">Database Schema Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/40 rounded-xl p-4">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 mb-2">file_index</h3>
            <pre className="text-[11px] font-mono text-slate-400 leading-relaxed">
{`id INTEGER PRIMARY KEY
path TEXT NOT NULL
name TEXT NOT NULL
extension TEXT
size INTEGER
modified_at TIMESTAMP
indexed_at TIMESTAMP`}
            </pre>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 mb-2">audit_logs</h3>
            <pre className="text-[11px] font-mono text-slate-400 leading-relaxed">
{`id INTEGER PRIMARY KEY
timestamp TIMESTAMP
command TEXT
intent TEXT
affected_files TEXT
result TEXT
user TEXT`}
            </pre>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 mb-2">permissions</h3>
            <pre className="text-[11px] font-mono text-slate-400 leading-relaxed">
{`id INTEGER PRIMARY KEY
path TEXT NOT NULL
operation TEXT NOT NULL
allowed BOOLEAN
created_at TIMESTAMP`}
            </pre>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-4">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 mb-2">undo_stack</h3>
            <pre className="text-[11px] font-mono text-slate-400 leading-relaxed">
{`id INTEGER PRIMARY KEY
action_id TEXT UNIQUE
intent TEXT
original_paths TEXT
new_paths TEXT
created_at TIMESTAMP`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}