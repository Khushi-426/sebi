import { motion } from 'framer-motion'
import { ArrowRight, AlertTriangle, MapPin, ScanSearch, ShieldCheck } from 'lucide-react'
import { useStore } from '../../store'
import { GAPS } from '../../data/mock'

const sev = {
  high: { label: 'High', cls: 'bg-bad-bg text-[#b23428]', icon: '#d5493f', ring: '#d5493f' },
  medium: { label: 'Medium', cls: 'bg-warn-bg text-[#a5651a]', icon: '#d9902a', ring: '#d9902a' },
  low: { label: 'Low', cls: 'bg-info-bg text-[#1e56b8]', icon: '#2f6fdc', ring: '#2f6fdc' },
}

export default function Gaps() {
  const goStep = useStore((s) => s.goStep)
  const showToast = useStore((s) => s.showToast)
  const high = GAPS.filter((g) => g.severity === 'high').length

  return (
    <div>
      <div className="chip bg-navy-900 text-gold-soft mb-3"><ScanSearch size={13} /> Consistency & completeness scan</div>
      <h2 className="text-[26px] tracking-[-0.02em] font-extrabold mb-1.5">Gaps & Consistency</h2>
      <p className="text-muted text-[15px] mb-6 max-w-[580px]">
        Before anything reaches your merchant banker, here’s every gap and inconsistency we could find —
        ranked by severity, each linked to the exact section it affects.
      </p>

      {/* summary */}
      <div className="flex items-center gap-5 rounded-[14px] px-6 py-5 mb-6 shadow-md2"
        style={{ background: high ? 'linear-gradient(120deg,#7a2820,#a83a2e)' : 'linear-gradient(120deg,#0e7a4d,#159a62)', color: '#fff' }}>
        <div className="w-14 h-14 rounded-2xl bg-white/[.16] grid place-items-center shrink-0"><AlertTriangle size={28} /></div>
        <div className="flex-1">
          <h3 className="text-[19px] font-bold mb-0.5">{GAPS.length} items to review · {high} block certification</h3>
          <p className="opacity-95 text-[13.5px] max-w-[480px]">Resolve the high-severity items and this draft is ready to hand to your lead manager.</p>
        </div>
        <button onClick={() => showToast('Co-pilot is walking you through resolutions →')} className="btn shrink-0 !bg-white/15 !text-white hover:!bg-white/25">
          Auto-resolve with co-pilot
        </button>
      </div>

      {/* gap list */}
      {GAPS.map((g, i) => {
        const s = sev[g.severity]
        return (
          <motion.div key={g.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex gap-4 px-5 py-4 card mb-3">
            <span className="w-9 h-9 rounded-xl grid place-items-center shrink-0 mt-0.5" style={{ background: s.icon + '18', color: s.icon }}>
              <AlertTriangle size={19} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`chip ${s.cls}`}>{s.label} severity</span>
                <span className="chip bg-[#eef2f8] text-muted">{g.type}</span>
              </div>
              <b className="text-[15px] block mb-1">{g.title}</b>
              <p className="text-[13.5px] text-ink-2 leading-relaxed">{g.detail}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-muted mt-2"><MapPin size={12} /> {g.location}</div>
            </div>
            <button onClick={() => showToast(`Resolving: ${g.title}`)} className="btn btn-ghost btn-sm self-center shrink-0">Resolve</button>
          </motion.div>
        )
      })}

      <div className="flex justify-between items-center flex-wrap gap-3 border-t border-line pt-6 mt-6">
        <div className="flex items-center gap-2 text-[13.5px] text-muted"><ShieldCheck size={16} className="text-ok" /> All flags are disclosed to your banker — nothing is hidden.</div>
        <button onClick={() => goStep('final')} className="btn btn-gold btn-lg">View final draft <ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
