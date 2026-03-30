import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass-card border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm font-mono group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
              ⌘
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              CTRL <span className="text-cyan-400">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/commands"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-200"
            >
              Commands
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-200"
            >
              Settings
            </Link>
            <Link
              href="/changelog"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-200"
            >
              Changelog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 font-mono">
              <kbd className="px-1.5 py-0.5 bg-slate-700/60 rounded text-slate-300 text-[10px]">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 bg-slate-700/60 rounded text-slate-300 text-[10px]">Space</kbd>
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl border border-slate-700/50 shadow-xl py-2 z-50">
          <Link href="/commands" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
            Commands
          </Link>
          <Link href="/settings" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
            Settings
          </Link>
          <Link href="/changelog" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
            Changelog
          </Link>
        </div>
      </details>
    </div>
  )
}