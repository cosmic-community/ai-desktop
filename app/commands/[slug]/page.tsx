// app/commands/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCommand, getCommands, getMetafieldValue, getBooleanValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const command = await getCommand(slug)

  if (!command) {
    return { title: 'Command Not Found — CTRL AI' }
  }

  const name = getMetafieldValue(command.metadata?.name) || command.title

  return {
    title: `${name} — CTRL AI Commands`,
    description: getMetafieldValue(command.metadata?.description) || `Details for the ${name} command.`,
  }
}

export async function generateStaticParams() {
  const commands = await getCommands()
  return commands.map((command) => ({ slug: command.slug }))
}

export default async function CommandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const command = await getCommand(slug)

  if (!command) {
    notFound()
  }

  const meta = command.metadata
  const name = getMetafieldValue(meta?.name) || command.title
  const intentKey = getMetafieldValue(meta?.intent_key)
  const description = getMetafieldValue(meta?.description)
  const iconEmoji = getMetafieldValue(meta?.icon_emoji) || '📁'
  const category = getMetafieldValue(meta?.category)
  const isDangerous = getBooleanValue(meta?.is_dangerous)
  const supportsUndo = getBooleanValue(meta?.supports_undo)
  const supportsSimulate = getBooleanValue(meta?.supports_simulate)
  const screenshot = meta?.screenshot

  const examplePrompts = getMetafieldValue(meta?.example_prompts)
  const examples = examplePrompts
    ? examplePrompts.split('\n').filter((line) => line.trim().length > 0)
    : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/commands" className="hover:text-cyan-400 transition-colors">Commands</Link>
        <span>/</span>
        <span className="text-slate-300">{name}</span>
      </nav>

      {/* Header */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-start gap-5">
          <div className="text-5xl">{iconEmoji}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{name}</h1>
              {isDangerous && (
                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                  ⚠ Dangerous
                </span>
              )}
            </div>

            {intentKey && (
              <code className="inline-block text-sm font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg mb-4">
                {intentKey}
              </code>
            )}

            {description && (
              <p className="text-slate-400 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Category</p>
          <p className="text-sm font-medium text-white">{category || 'General'}</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Supports Undo</p>
          <p className={`text-sm font-medium ${supportsUndo ? 'text-emerald-400' : 'text-slate-500'}`}>
            {supportsUndo ? '✓ Yes' : '✗ No'}
          </p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Supports Simulate</p>
          <p className={`text-sm font-medium ${supportsSimulate ? 'text-violet-400' : 'text-slate-500'}`}>
            {supportsSimulate ? '✓ Yes' : '✗ No'}
          </p>
        </div>
      </div>

      {/* Example Prompts */}
      {examples.length > 0 && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Example Prompts</h2>
          <div className="space-y-2">
            {examples.map((example, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-800/40 rounded-xl px-4 py-3 border border-slate-700/30"
              >
                <span className="text-cyan-400 font-mono text-sm shrink-0">&gt;</span>
                <span className="text-sm font-mono text-slate-300">{example.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screenshot */}
      {screenshot?.imgix_url && (
        <div className="glass-card rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Screenshot</span>
          </div>
          <img
            src={`${screenshot.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={`${name} screenshot`}
            className="w-full"
          />
        </div>
      )}

      {/* Back Link */}
      <Link
        href="/commands"
        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all commands
      </Link>
    </div>
  )
}