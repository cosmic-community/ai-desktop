import type { Metadata } from 'next'
import { getChangelog } from '@/lib/cosmic'
import ChangelogCard from '@/components/ChangelogCard'

export const metadata: Metadata = {
  title: 'Changelog — CTRL AI',
  description: 'Track all releases, updates, and improvements to the CTRL AI desktop assistant.',
}

export default async function ChangelogPage() {
  const entries = await getChangelog()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium mb-4">
          <span>📰</span> Release History
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Changelog
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Every release documented. Track new features, bug fixes, improvements,
          and breaking changes across all versions.
        </p>
      </div>

      {/* Release Type Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <span className="text-xs text-slate-500 font-medium">Release types:</span>
        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Feature</span>
        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">Bugfix</span>
        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">Improvement</span>
        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Breaking</span>
        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">Security</span>
      </div>

      {/* Changelog Entries */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <ChangelogCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-white mb-2">No releases yet</h3>
          <p className="text-sm text-slate-400">Changelog entries will appear here once they&apos;re published.</p>
        </div>
      )}
    </div>
  )
}