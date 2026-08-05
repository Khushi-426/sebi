import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { useStore } from '../store'

// ---------- Brand mark ----------
export function Mark({ size = 38 }: { size?: number }) {
  return (
    <div
      className="rounded-[11px] grid place-items-center shrink-0"
      style={{
        width: size, height: size,
        background: 'linear-gradient(145deg,#0f2a54,#081428)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14),0 4px 12px rgba(11,30,63,.3)',
      }}
    >
      <ShieldCheck size={size * 0.56} className="text-gold" strokeWidth={2} />
    </div>
  )
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Mark />
      <div className="leading-tight">
        <div className={`font-extrabold text-[18px] tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          Sahayak<span className="text-gold"> DRHP</span>
        </div>
        <div className={`text-[10.5px] font-semibold tracking-[0.14em] uppercase ${light ? 'text-[#8ba2c6]' : 'text-muted'}`}>
          SME IPO Offer-Document Co-pilot
        </div>
      </div>
    </div>
  )
}

// ---------- Progress ring ----------
export function Ring({
  value, size = 54, stroke = 6, color = '#159a62', track = '#e7edf5', showLabel = true, label,
}: {
  value: number; size?: number; stroke?: number; color?: string; track?: string; showLabel?: boolean; label?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (value / 100) * c
  return (
    <div className="relative grid place-items-center shrink-0" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} style={{ stroke: track }} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
          strokeLinecap="round" style={{ stroke: color }}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.1, ease: [0.3, 0.8, 0.3, 1] }}
        />
      </svg>
      {showLabel && (
        <div className="absolute font-bold mono" style={{ fontSize: size * 0.26, color: '#0d1b2e' }}>
          {label ?? `${value}%`}
        </div>
      )}
    </div>
  )
}

// ---------- Chip ----------
const chipStyles: Record<string, string> = {
  green: 'bg-ok-bg text-[#0d6b43]',
  amber: 'bg-warn-bg text-[#a5651a]',
  red: 'bg-bad-bg text-[#b23428]',
  blue: 'bg-info-bg text-[#1e56b8]',
  gray: 'bg-[#eef2f8] text-muted',
  navy: 'bg-navy-900 text-gold-soft',
}
export function Chip({ tone = 'gray', children }: { tone?: keyof typeof chipStyles; children: React.ReactNode }) {
  return <span className={`chip ${chipStyles[tone]}`}>{children}</span>
}

// ---------- Toast ----------
export function Toasts() {
  const toast = useStore((s) => s.toast)
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            className="bg-navy-900 text-white px-5 py-3 rounded-xl shadow-lg2 flex items-center gap-3 text-sm font-medium"
          >
            <Sparkles size={18} className="text-gold-soft" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
