import { ShieldCheck, Info, CheckCircle2, Lock, FileSignature, ArrowRight } from 'lucide-react'
import { useStore } from '../store'
import { validateDRHP } from '../utils/drhpValidation'

export default function IntermediaryBanner() {
  const { intermediaryMode, toggleIntermediaryMode, formData, setDrhpSection } = useStore()
  const validation = validateDRHP(formData)

  return (
    <div className={`rounded-xl border p-4 mb-6 transition-all ${
      intermediaryMode
        ? 'bg-gradient-to-r from-emerald-900/90 to-navy-900 text-white border-emerald-500/30 shadow-md'
        : 'bg-gradient-to-r from-navy-900 to-navy-950 text-white border-white/10 shadow-sm'
    }`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${
            intermediaryMode ? 'bg-emerald-500 text-white' : 'bg-gold/20 text-gold-soft border border-gold/30'
          }`}>
            <ShieldCheck size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold tracking-tight text-white">
                {intermediaryMode
                  ? 'Merchant Banker Review State Active'
                  : 'SME Promoter Draft Preparation Workspace'}
              </h3>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                intermediaryMode
                  ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                  : 'bg-gold/20 text-gold-soft border-gold/30'
              }`}>
                {intermediaryMode ? 'Read-Only Certify Mode' : 'Promoter Self-Drafting'}
              </span>
            </div>

            <p className="text-xs text-[#b7c6e0] mt-1 leading-relaxed max-w-[680px]">
              {intermediaryMode
                ? 'Review mode renders the draft DRHP with complete audit provenance trails. Merchant Bankers can review, leave diligence notes, and prepare statutory certification.'
                : 'Sahayak helps you capture company details and draft a SEBI-compliant DRHP. Final regulatory submission to SEBI/Exchange is executed by your Lead Manager after due diligence.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-[#9fb2d0] block">Intermediary Readiness</span>
            <b className={`text-sm mono font-bold ${
              validation.isReadyForIntermediary ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {validation.isReadyForIntermediary ? '✓ Ready for Review' : `${validation.overallPercentage}% Complete`}
            </b>
          </div>

          <button
            onClick={() => setDrhpSection('review')}
            className="btn btn-gold btn-sm"
          >
            Review & Export <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
