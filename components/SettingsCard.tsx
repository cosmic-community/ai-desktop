import type { Settings } from '@/types'
import { getMetafieldValue, getBooleanValue } from '@/lib/cosmic'

interface SettingsCardProps {
  settings: Settings;
}

export default function SettingsCard({ settings }: SettingsCardProps) {
  const meta = settings.metadata

  const allowedPaths = getMetafieldValue(meta?.allowed_paths)
  const blockedOps = getMetafieldValue(meta?.blocked_operations)
  const simulateMode = getBooleanValue(meta?.default_simulate_mode)
  const maxBatch = getMetafieldValue(meta?.max_batch_size)
  const hotkey = getMetafieldValue(meta?.hotkey_combo)
  const theme = getMetafieldValue(meta?.theme)
  const auditDays = getMetafieldValue(meta?.audit_retention_days)

  const pathsList = allowedPaths
    ? allowedPaths.split('\n').filter((p) => p.trim().length > 0)
    : []

  const blockedList = blockedOps
    ? blockedOps.split('\n').filter((p) => p.trim().length > 0)
    : []

  return (
    <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-lg">
          ⚙️
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{settings.title}</h3>
          <p className="text-xs text-slate-500 font-mono">{settings.slug}</p>
        </div>
      </div>

      <div className="space-y-5">
        {hotkey && (
          <SettingRow label="Global Hotkey">
            <div className="flex items-center gap-1.5">
              {hotkey.split('+').map((key, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-slate-600 mr-1.5">+</span>}
                  <kbd className="px-2 py-1 bg-slate-800/80 border border-slate-700/50 rounded-md text-xs font-mono text-cyan-300">
                    {key.trim()}
                  </kbd>
                </span>
              ))}
            </div>
          </SettingRow>
        )}

        {theme && (
          <SettingRow label="Theme">
            <span className="text-sm text-slate-300 capitalize">{theme}</span>
          </SettingRow>
        )}

        <SettingRow label="Default Simulate Mode">
          <span className={`text-sm font-medium ${simulateMode ? 'text-emerald-400' : 'text-slate-400'}`}>
            {simulateMode ? '✓ Enabled' : '✗ Disabled'}
          </span>
        </SettingRow>

        {maxBatch && (
          <SettingRow label="Max Batch Size">
            <span className="text-sm font-mono text-cyan-300">{maxBatch}</span>
          </SettingRow>
        )}

        {auditDays && (
          <SettingRow label="Audit Retention">
            <span className="text-sm text-slate-300">{auditDays} days</span>
          </SettingRow>
        )}

        {pathsList.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Allowed Paths
            </p>
            <div className="space-y-1.5">
              {pathsList.map((path, i) => (
                <div key={i} className="text-xs font-mono text-emerald-400/80 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-1.5">
                  {path.trim()}
                </div>
              ))}
            </div>
          </div>
        )}

        {blockedList.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Blocked Operations
            </p>
            <div className="space-y-1.5">
              {blockedList.map((op, i) => (
                <div key={i} className="text-xs font-mono text-rose-400/80 bg-rose-500/5 border border-rose-500/10 rounded-lg px-3 py-1.5">
                  {op.trim()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-400">{label}</p>
      {children}
    </div>
  )
}