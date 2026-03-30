import Link from 'next/link'
import { getCommands, getChangelog, getMetafieldValue, getBooleanValue } from '@/lib/cosmic'
import type { Command } from '@/types'

export default async function HomePage() {
  const [commands, changelog] = await Promise.all([
    getCommands(),
    getChangelog(),
  ])

  const latestChangelog = changelog.slice(0, 3)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Local-first · Privacy-respecting · Windows 11
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Manage files with</span>
              <br />
              <span className="gradient-text">natural language</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              CTRL AI is an intelligent desktop assistant that understands your file commands.
              Search, organize, and move files — all from a lightning-fast command palette.
            </p>

            {/* Interactive Command Demo */}
            <div className="max-w-xl mx-auto mb-10">
              <div className="glass-card rounded-2xl p-1 border border-slate-700/50 shadow-2xl shadow-cyan-500/5">
                <div className="flex items-center gap-2 px-4 py-1.5 border-b border-slate-800/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono ml-2">CTRL AI Command Palette</span>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-mono text-sm">&gt;</span>
                    <span className="text-slate-300 text-sm font-mono">organize desktop images by type</span>
                    <span className="w-2 h-5 bg-cyan-400/60 animate-pulse" />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="bg-slate-800/40 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-slate-400 font-mono">Intent: files.organize</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-slate-400 font-mono">Group by: type</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-violet-400">⟳</span>
                      <span className="text-slate-400 font-mono">Mode: simulate (preview)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/commands"
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
              >
                Explore Commands
              </Link>
              <Link
                href="/changelog"
                className="px-8 py-3.5 bg-slate-800/60 border border-slate-700/50 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300 text-sm"
              >
                View Changelog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for trust &amp; safety
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every action is previewed, logged, and reversible. CTRL AI never operates outside your allowed paths.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🔍"
            title="Smart File Search"
            description="Find files by name, extension, or recency. Indexed and lightning fast."
          />
          <FeatureCard
            icon="📂"
            title="File Organization"
            description="Organize files by type or date into clean folder structures automatically."
          />
          <FeatureCard
            icon="🔒"
            title="Path Restrictions"
            description="Never operates outside allowed directories. All paths validated."
          />
          <FeatureCard
            icon="👁️"
            title="Dry-Run Preview"
            description="Preview every batch action before execution. Simulate mode by default."
          />
          <FeatureCard
            icon="↩️"
            title="One-Click Undo"
            description="Every move and organize operation is reversible with a single click."
          />
          <FeatureCard
            icon="📋"
            title="Full Audit Log"
            description="Every action logged with timestamp, intent, affected files, and result."
          />
        </div>
      </section>

      {/* Commands Preview */}
      {commands.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Available Commands</h2>
              <p className="text-slate-400">Built-in file operations powered by structured intents</p>
            </div>
            <Link
              href="/commands"
              className="hidden sm:flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commands.slice(0, 4).map((command) => (
              <CommandPreviewCard key={command.id} command={command} />
            ))}
          </div>
        </section>
      )}

      {/* Changelog Preview */}
      {latestChangelog.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Updates</h2>
              <p className="text-slate-400">What&apos;s new in CTRL AI</p>
            </div>
            <Link
              href="/changelog"
              className="hidden sm:flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Full changelog
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {latestChangelog.map((entry) => {
              const version = getMetafieldValue(entry.metadata?.version)
              const summary = getMetafieldValue(entry.metadata?.summary)
              const releaseType = getMetafieldValue(entry.metadata?.type).toLowerCase()
              const releaseDate = entry.metadata?.release_date || entry.created_at

              const formattedDate = releaseDate
                ? new Date(releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : ''

              return (
                <Link key={entry.id} href={`/changelog/${entry.slug}`} className="block group">
                  <div className="glass-card rounded-xl p-5 hover-glow transition-all duration-300 group-hover:border-cyan-500/30 flex items-center gap-5">
                    {version && (
                      <span className="shrink-0 px-3 py-1.5 text-sm font-bold font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        v{version}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {entry.title}
                      </h3>
                      {summary && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{summary}</p>
                      )}
                    </div>
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      {releaseType && (
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                          {releaseType}
                        </span>
                      )}
                      {formattedDate && (
                        <span className="text-xs text-slate-500 font-mono">{formattedDate}</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to take control?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              CTRL AI runs entirely on your machine. No cloud dependency. No data leaves your desktop.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
              <span className="font-mono text-sm text-slate-300">pip install ctrl-ai</span>
              <span className="text-cyan-400 text-xs">← coming soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

function CommandPreviewCard({ command }: { command: Command }) {
  const meta = command.metadata
  const iconEmoji = getMetafieldValue(meta?.icon_emoji) || '📁'
  const intentKey = getMetafieldValue(meta?.intent_key)
  const isDangerous = getBooleanValue(meta?.is_dangerous)
  const name = getMetafieldValue(meta?.name) || command.title

  return (
    <Link href={`/commands/${command.slug}`} className="block group">
      <div className="glass-card rounded-xl p-5 hover-glow transition-all duration-300 group-hover:border-cyan-500/30">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{iconEmoji}</span>
          {isDangerous && (
            <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
              ⚠
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
          {name}
        </h3>
        {intentKey && (
          <code className="text-[11px] font-mono text-cyan-400/60">{intentKey}</code>
        )}
      </div>
    </Link>
  )
}