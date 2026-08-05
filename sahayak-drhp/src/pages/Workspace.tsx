import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Check, AlertTriangle, Building2, BadgeCheck, GitMerge, ScanSearch, FileCheck2,
  Download, ChevronRight, Circle,
} from 'lucide-react'
import { useStore, type StepId } from '../store'
import { Brand } from '../components/ui'
import Copilot from '../components/Copilot'
import { COMPANY, ISSUE } from '../data/mock'
import CompanyBase from './steps/CompanyBase'
import KYC from './steps/KYC'
import Eligibility from './steps/Eligibility'
import Synthesis from './steps/Synthesis'
import Gaps from './steps/Gaps'
import FinalDRHP from './steps/FinalDRHP'

type StepMeta = { id: StepId; title: string; sub: string; status: 'done' | 'attention' | 'todo'; icon: any }
const STEPS: StepMeta[] = [
  { id: 'base', title: 'Company Base', sub: 'Extracted profile', status: 'done', icon: Building2 },
  { id: 'kyc', title: 'Verification & KYC', sub: '6 phases · 2 need input', status: 'attention', icon: BadgeCheck },
  { id: 'eligibility', title: 'Eligibility Check', sub: 'NSE Emerge norms', status: 'done', icon: ScanSearch },
  { id: 'synthesis', title: 'DRHP Synthesis', sub: '14 sections mapped', status: 'attention', icon: GitMerge },
  { id: 'gaps', title: 'Gaps & Consistency', sub: '5 items to review', status: 'attention', icon: AlertTriangle },
  { id: 'final', title: 'Final Draft DRHP', sub: 'Review & certify', status: 'todo', icon: FileCheck2 },
]

const CRUMB: Record<StepId, string> = {
  base: 'Company Base', kyc: 'Verification & KYC', eligibility: 'Eligibility Check',
  synthesis: 'DRHP Synthesis', gaps: 'Gaps & Consistency', final: 'Final Draft DRHP',
}

export default function Workspace() {
  const { step, goStep, showToast } = useStore()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [step])

  return (
    <div className="grid h-screen overflow-hidden" style={{ gridTemplateColumns: '266px 1fr 372px' }}>
      {/* ============ LEFT NAV ============ */}
      <div className="text-[#c9d6ea] flex flex-col overflow-y-auto"
        style={{ background: 'linear-gradient(180deg,#0b1e3f,#081428)' }}>
        <div className="px-5 py-4 border-b border-white/[.07]"><Brand light /></div>

        {/* company card */}
        <div className="px-5 py-4 border-b border-white/[.07]">
          <div className="font-bold text-[15px] text-white flex items-center gap-2.5">
            <span className="w-[30px] h-[30px] rounded-lg grid place-items-center font-extrabold text-white text-[14px] shrink-0"
              style={{ background: 'linear-gradient(135deg,#1e6f4e,#2fae74)' }}>{COMPANY.logoLetters}</span>
            {COMPANY.proposedName}
          </div>
          <div className="text-[12px] text-[#8598b9] mt-2 leading-relaxed">
            {COMPANY.sector}<br />CIN · {COMPANY.cin}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 bg-gold/[.12] text-gold-soft px-2.5 py-1.5 rounded-lg text-[12px] font-bold">
            <BadgeCheck size={13} /> {ISSUE.platform.split(' ')[0]} Emerge · ₹{ISSUE.sizeCr} Cr
          </div>
        </div>

        {/* stepper */}
        <div className="px-3 py-3.5 flex-1">
          <div className="text-[10.5px] font-bold tracking-[0.13em] text-[#5e739a] px-3 pt-2 pb-1.5 uppercase">Your journey</div>
          {STEPS.map((s, i) => {
            const active = step === s.id
            return (
              <div key={s.id} className="relative">
                <button onClick={() => goStep(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[11px] my-0.5 transition text-left ${active ? 'bg-gold/[.13] ring-1 ring-gold/25' : 'hover:bg-white/5'}`}>
                  <StepIcon status={s.status} active={active} />
                  <div className="min-w-0">
                    <b className={`text-[14px] font-semibold block truncate ${active ? 'text-white' : 'text-[#e8eefa]'}`}>{s.title}</b>
                    <span className="text-[11.5px] text-[#8598b9]">{s.sub}</span>
                  </div>
                </button>
                {i < STEPS.length - 1 && <span className="absolute left-[26px] top-[46px] w-0.5 h-3.5 bg-white/[.09]" />}
              </div>
            )
          })}
        </div>

        <div className="px-5 py-4 border-t border-white/[.07] text-[11.5px] text-[#7d93b8] leading-relaxed">
          <div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-ok" /> Lead manager: {ISSUE.leadManager}</div>
          Draft auto-saved · Human-in-loop mode on
        </div>
      </div>

      {/* ============ MAIN ============ */}
      <div ref={mainRef} className="overflow-y-auto bg-[#eef2f8]">
        <div className="sticky top-0 z-20 bg-[#eef2f8]/85 backdrop-blur border-b border-line px-8 py-4 flex items-center justify-between">
          <div className="text-[13px] text-muted font-semibold flex items-center gap-1.5">
            Journey <ChevronRight size={14} /> <b className="text-ink">{CRUMB[step]}</b>
          </div>
          <div className="flex gap-2.5 items-center">
            <button onClick={() => showToast('Draft exported as PDF (mock)')} className="btn btn-ghost btn-sm"><Download size={15} /> Export</button>
            <button onClick={() => goStep('final')} className="btn btn-navy btn-sm">Go to draft <ChevronRight size={15} /></button>
          </div>
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="px-8 pt-7 pb-16 max-w-[900px]">
          {step === 'base' && <CompanyBase />}
          {step === 'kyc' && <KYC />}
          {step === 'eligibility' && <Eligibility />}
          {step === 'synthesis' && <Synthesis />}
          {step === 'gaps' && <Gaps />}
          {step === 'final' && <FinalDRHP />}
        </motion.div>
      </div>

      {/* ============ CO-PILOT ============ */}
      <Copilot />
    </div>
  )
}

function StepIcon({ status, active }: { status: string; active: boolean }) {
  if (status === 'done')
    return <span className="w-7 h-7 rounded-full grid place-items-center bg-ok text-white shrink-0"><Check size={14} strokeWidth={3} /></span>
  if (status === 'attention')
    return <span className="w-7 h-7 rounded-full grid place-items-center bg-warn text-[#3a2c07] shrink-0"><AlertTriangle size={14} /></span>
  return (
    <span className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${active ? 'bg-gold text-[#3a2c07] ring-4 ring-gold/20' : 'bg-white/[.08] text-[#7d93b8]'}`}>
      <Circle size={9} fill={active ? '#3a2c07' : 'transparent'} />
    </span>
  )
}
