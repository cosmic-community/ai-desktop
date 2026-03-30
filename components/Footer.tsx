import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs font-mono">
                ⌘
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                CTRL <span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Local-first AI desktop assistant for Windows 11. Manage files with natural language.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/commands" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Commands</Link></li>
              <li><Link href="/settings" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Settings</Link></li>
              <li><Link href="/changelog" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Architecture</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Python 3.12 + PyQt5</li>
              <li>SQLite + Watchdog</li>
              <li>Local-First Design</li>
              <li>Modular Skills</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Safety</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Path Restrictions</li>
              <li>Audit Logging</li>
              <li>Dry-Run Preview</li>
              <li>One-Click Undo</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CTRL AI. Built for the local-first future.
          </p>
          <p className="text-xs text-slate-500">
            Powered by <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 transition-colors">Cosmic</a>
          </p>
        </div>
      </div>
    </footer>
  )
}