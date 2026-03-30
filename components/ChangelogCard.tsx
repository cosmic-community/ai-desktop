import Link from 'next/link'
import type { ChangelogEntry } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ChangelogCardProps {
  entry: ChangelogEntry;
}

const typeColorMap: Record<string, string> = {
  feature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  bugfix: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  improvement: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  breaking: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  security: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

export default function ChangelogCard({ entry }: ChangelogCardProps) {
  const meta = entry.metadata
  const version = getMetafieldValue(meta?.version)
  const releaseDate = meta?.release_date || entry.created_at
  const summary = getMetafieldValue(meta?.summary)
  const releaseType = getMetafieldValue(meta?.type).toLowerCase()
  const heroImage = meta?.hero_image

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const typeClass = typeColorMap[releaseType] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'

  return (
    <Link href={`/changelog/${entry.slug}`} className="block group">
      <div className="glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-300 group-hover:border-cyan-500/30">
        {heroImage?.imgix_url && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${heroImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={entry.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {version && (
              <span className="px-2.5 py-1 text-xs font-bold font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                v{version}
              </span>
            )}
            {releaseType && (
              <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-full ${typeClass}`}>
                {releaseType}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {entry.title}
          </h3>

          {summary && (
            <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
              {summary}
            </p>
          )}

          {formattedDate && (
            <p className="text-xs text-slate-500 font-mono">
              {formattedDate}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}