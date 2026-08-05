import { motion } from 'framer-motion'
import { Check, AlertTriangle, ArrowRight, ScanSearch, ShieldCheck } from 'lucide-react'
import { useStore } from '../../store'
import { Ring } from '../../components/ui'
import { ELIGIBILITY, ISSUE } from '../../data/mock'

export default function Eligibility() {
  const goStep = useStore((s) => s.goStep)
  const passed = ELIGIBILITY.criteria.filter((c) => c.ok).length

  return (
    <div>
      <div className="chip bg-navy-900 text-gold-soft mb-3"><ScanSearch size={13} /> Rule engine · {ISSUE.platform}</div>
      <h2 className="text-[26px] tracking-[-0.02em] font-extrabold mb-1.5">Eligibility Check</h2>
      <p className="text-muted text-[15px] mb-6 max-w-[560px]">
        We tested Satvik against the SME-platform listing norms. Here’s where you stand on each criterion,
        with the exact figure behind every verdict.
      </p>

      {/* verdict */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-6 rounded-[14px] px-7 py-6 text-white mb-6 shadow-md2"
        style={{ background: 'linear-gradient(120deg,#0e7a4d,#159a62)' }}>
        <div className="w-16 h-16 rounded-2xl bg-white/[.16] grid place-items-center shrink-0"><ShieldCheck size={34} /></div>
        <div className="flex-1">
          <h3 className="text-[22px] font-bold mb-1">{ELIGIBILITY.verdict}</h3>
          <p className="opacity-95 text-[14.5px] max-w-[520px]">{ELIGIBILITY.summary}</p>
        </div>
        <div className="shrink-0 grid place-items-center">
          <Ring value={ELIGIBILITY.score} size={92} stroke={8} color="#fff" track="rgba(255,255,255,.25)" label={`${ELIGIBILITY.score}`} />
          <span className="text-[11px] opacity-85 -mt-1">Eligibility score</span>
        </div>
      </motion.div>

      {/* summary chips */}
      <div className="flex gap-3 mb-5">
        <div className="card px-4 py-3 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-ok-bg text-ok grid place-items-center"><Check size={17} /></span>
          <div><b className="text-[17px] mono leading-none">{passed}</b><span className="text-[12px] text-muted block">criteria cleared</span></div>
        </div>
        <div className="card px-4 py-3 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-warn-bg text-warn grid place-items-center"><AlertTriangle size={16} /></span>
          <div><b className="text-[17px] mono leading-none">{ELIGIBILITY.criteria.length - passed}</b><span className="text-[12px] text-muted block">needs disclosure</span></div>
        </div>
      </div>

      {/* criteria */}
      <div className="card overflow-hidden mb-7">
        {ELIGIBILITY.criteria.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-start gap-4 px-5 py-4 border-b border-line last:border-0">
            <span className={`w-[30px] h-[30px] rounded-lg grid place-items-center shrink-0 mt-0.5 ${c.ok ? 'bg-ok-bg text-ok' : 'bg-warn-bg text-warn'}`}>
              {c.ok ? <Check size={16} /> : <AlertTriangle size={15} />}
            </span>
            <div className="flex-1">
              <b className="text-[14.5px] block mb-0.5">{c.title}</b>
              <span className="text-[13px] text-muted leading-snug">{c.note}</span>
              <div className="text-[12px] text-muted mt-1.5">Requirement: <b className="text-ink-2">{c.req}</b></div>
            </div>
            <div className="text-right shrink-0">
              <div className={`font-bold text-[15px] mono ${c.ok ? 'text-ink' : 'text-warn'}`}>{c.val}</div>
              <div className="text-[11px] text-muted">{c.ok ? 'meets norm' : 'disclose'}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3 border-t border-line pt-6">
        <div className="text-[13.5px] text-muted max-w-[430px]">
          Eligible to proceed. The one disclosure item is carried into Section XI automatically.
        </div>
        <button onClick={() => goStep('synthesis')} className="btn btn-gold btn-lg">Synthesise the DRHP <ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
