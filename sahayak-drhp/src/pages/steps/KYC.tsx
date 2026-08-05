import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, AlertTriangle, ChevronDown, ArrowRight, ShieldCheck, Fingerprint,
  Landmark, PieChart, Scale, FileSignature,
} from 'lucide-react'
import { useStore } from '../../store'
import { PHASES } from '../../data/mock'

const ICONS: Record<string, any> = {
  identity: ShieldCheck, people: Fingerprint, financials: Landmark,
  capital: PieChart, legal: Scale, contracts: FileSignature,
}

export default function KYC() {
  const goStep = useStore((s) => s.goStep)
  const showToast = useStore((s) => s.showToast)
  const [open, setOpen] = useState<string | null>('people')

  const done = PHASES.filter((p) => p.status === 'done').length
  const attention = PHASES.filter((p) => p.status === 'attention').length

  return (
    <div>
      <div className="chip bg-navy-900 text-gold-soft mb-3"><Fingerprint size={13} /> Guided KYC · 6 phases</div>
      <h2 className="text-[26px] tracking-[-0.02em] font-extrabold mb-1.5">Verification & KYC</h2>
      <p className="text-muted text-[15px] mb-6 max-w-[560px]">
        We verify your particulars area by area — the way a merchant banker’s diligence checklist runs.
        Each phase turns green as it clears.
      </p>

      {/* progress summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat n={done} label="Phases cleared" tone="ok" icon={Check} />
        <Stat n={attention} label="Need your input" tone="warn" icon={AlertTriangle} />
        <Stat n={PHASES.reduce((a, p) => a + p.items.length, 0)} label="Checks run" tone="navy" icon={ShieldCheck} />
      </div>

      {/* phases */}
      {PHASES.map((p) => {
        const Icon = ICONS[p.id]
        const isOpen = open === p.id
        const doneCount = p.items.filter((i) => i.status === 'done').length
        const attn = p.status === 'attention'
        return (
          <div key={p.id} className="card mb-3 overflow-hidden">
            <button onClick={() => setOpen(isOpen ? null : p.id)} className="w-full flex items-center gap-4 px-5 py-4 text-left">
              <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${attn ? 'bg-warn-bg text-warn' : 'bg-ok-bg text-ok'}`}>
                <Icon size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <b className="text-[16px] block">{p.title}</b>
                <span className="text-[13px] text-muted">{p.sub}</span>
              </div>
              {attn
                ? <span className="chip bg-warn-bg text-[#a5651a] mr-1"><AlertTriangle size={12} /> Needs input</span>
                : <span className="chip bg-ok-bg text-[#0d6b43] mr-1"><Check size={12} /> Cleared</span>}
              <span className="text-[13px] font-bold mono mr-2" style={{ color: attn ? '#a5651a' : '#159a62' }}>{doneCount}/{p.items.length}</span>
              <ChevronDown size={18} className={`text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="border-t border-line overflow-hidden">
                  <div className="px-5 py-1">
                    {p.items.map((it) => (
                      <div key={it.label} className="flex items-center gap-3.5 py-3 border-b border-dashed border-line last:border-0 text-[14px]">
                        <span className={`w-[22px] h-[22px] rounded-full grid place-items-center shrink-0 ${it.status === 'done' ? 'bg-ok-bg text-ok' : 'bg-warn-bg text-warn'}`}>
                          {it.status === 'done' ? <Check size={13} /> : <AlertTriangle size={12} />}
                        </span>
                        <div className="flex-1">
                          <div className={it.status === 'attention' ? 'font-semibold' : ''}>{it.label}</div>
                          {it.note && <small className="block text-muted text-[12px] mt-0.5">{it.note}</small>}
                        </div>
                        {it.status === 'attention' && (
                          <button onClick={() => showToast('Resolution requested — co-pilot notified')} className="btn btn-ghost btn-sm">Resolve</button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      <div className="flex justify-between items-center flex-wrap gap-3 border-t border-line pt-6 mt-6">
        <div className="text-[13.5px] text-muted max-w-[430px]">
          Two items are flagged but non-blocking — the co-pilot will carry them into the right DRHP sections.
        </div>
        <button onClick={() => goStep('eligibility')} className="btn btn-gold btn-lg">Run eligibility check <ArrowRight size={18} /></button>
      </div>
    </div>
  )
}

function Stat({ n, label, tone, icon: Icon }: { n: number; label: string; tone: 'ok' | 'warn' | 'navy'; icon: any }) {
  const map = { ok: 'bg-ok-bg text-ok', warn: 'bg-warn-bg text-warn', navy: 'bg-navy-900 text-gold-soft' }
  return (
    <div className="card p-4 flex items-center gap-3">
      <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${map[tone]}`}><Icon size={19} /></span>
      <div>
        <div className="text-[24px] font-extrabold mono leading-none">{n}</div>
        <div className="text-[12px] text-muted mt-1">{label}</div>
      </div>
    </div>
  )
}
