import { Check, ShieldCheck } from 'lucide-react'
import { useStore } from '../store'
import { validateDRHP } from '../utils/drhpValidation'

export default function VisualTimeline() {
  const { formData } = useStore()
  const validation = validateDRHP(formData)

  const steps = [
    { label: 'Website Ingest', done: true, sub: '42 attributes' },
    { label: 'Corporate Identity', done: validation.sectionMetas.company.status === 'done', sub: 'CIN & MCA' },
    { label: 'Restated Financials', done: validation.sectionMetas.financials.status === 'done', sub: 'Audited 3-Yr' },
    { label: 'Risk & Objects', done: validation.sectionMetas.risks.status === 'done' && validation.sectionMetas.offer.status === 'done', sub: 'Disclosures' },
    { label: 'Banker Certification', done: validation.isReadyForIntermediary, sub: validation.isReadyForIntermediary ? 'Certified' : 'In progress' },
  ]

  return (
    <div className="card p-3.5 bg-surface border border-slate-200 shadow-xs mb-4 rounded-xl">
      <div className="flex items-center justify-between mb-2.5 text-xs">
        <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
          <ShieldCheck size={14} className="text-brand" /> Drafting Journey Timeline
        </span>
        <span className="text-slate-500 font-medium text-[11px]">Est. Completion: <b className="text-slate-900 mono font-bold">~15 mins</b></span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
        {steps.map((st, idx) => (
          <div key={st.label} className="flex flex-col items-start p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs min-w-0 w-full overflow-hidden">
            <div className="flex items-center gap-1.5 mb-0.5 w-full min-w-0">
              <span className={`w-4 h-4 rounded-full grid place-items-center text-[9.5px] font-bold shrink-0 ${
                st.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {st.done ? <Check size={10} strokeWidth={3} /> : idx + 1}
              </span>
              <b className={`font-semibold truncate text-[11px] min-w-0 flex-1 ${st.done ? 'text-slate-900' : 'text-slate-600'}`}>
                {st.label}
              </b>
            </div>
            <span className="text-[10px] text-slate-500 truncate w-full pl-5.5">{st.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
