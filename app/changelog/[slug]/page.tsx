// app/changelog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getChangelogEntry, getChangelog, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

const typeColorMap: Record<string, string> = {
  feature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  bugfix: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  improvement: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  breaking: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  security: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = await getChangelogEntry(slug)

  if (!entry) {
    return { title: 'Release Not Found — CTRL AI' }
  }

  const version = getMetafieldValue(entry.metadata?.version)
  const titleWithVersion = version ? `v${version} — ${entry.title}` : entry.title

  return {
    title: `${titleWithVersion} — CTRL AI Changelog`,
    description: getMetafieldValue(entry.metadata?.summary) || `Release details for ${entry.title}.`,
  }
}

export async function generateStaticParams() {
  const entries = await getChangelog()
  return entries.map((entry) => ({ slug: entry.slug }))
}

export default async function ChangelogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await getChangelogEntry(slug)

  if (!entry) {
    notFound()
  }

  const meta = entry.metadata
  const version = getMetafieldValue(meta?.version)
  const releaseDate = meta?.release_date || entry.created_at
  const summary = getMetafieldValue(meta?.summary)
  const details = getMetafieldValue(meta?.details)
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/changelog" className="hover:text-cyan-400 transition-colors">Changelog</Link>
        <span>/</span>
        <span className="text-slate-300 truncate">{entry.title}</span>
      </nav>

      {/* Hero Image */}
      {heroImage?.imgix_url && (
        <div className="glass-card rounded-2xl overflow-hidden mb-8">
          <img
            src={`${heroImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
            alt={entry.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {version && (
            <span className="px-3 py-1.5 text-lg font-bold font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              v{version}
            </span>
          )}
          {releaseType && (
            <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full ${typeClass}`}>
              {releaseType}
            </span>
          )}
          {formattedDate && (
            <span className="text-sm text-slate-500 font-mono">{formattedDate}</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {entry.title}
        </h1>

        {summary && (
          <p className="text-lg text-slate-400 leading-relaxed">
            {summary}
          </p>
        )}
      </div>

      {/* Details */}
      {details && (
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Release Details</h2>
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">
              {details}
            </div>
          </div>
        </div>
      )}

      {/* Content (if HTML) */}
      {entry.content && (
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div
            className="prose prose-invert prose-slate max-w-none text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </div>
      )}

      {/* Back Link */}
      <Link
        href="/changelog"
        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to changelog
      </Link>
    </div>
  )
}