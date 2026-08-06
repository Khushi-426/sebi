import { Scale, Check, AlertTriangle, Plus, Trash2, ArrowRight, ArrowLeft, Clock, FileText, Sparkles, ChevronRight } from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'
import EmptyState from '../../components/EmptyState'

export default function LitigationComplianceForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  function addCleanSlateLitigation() {
    updateFormData({
      litigations: [
        {
          id: `l_${Date.now()}`,
          party: 'Company',
          type: 'Tax',
          amountLakh: 0,
          status: 'Pending Appeal',
          summary: 'No material civil, criminal, or tax litigation pending against the company, promoters, or directors.',
        },
      ],
    })
  }

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">6. Litigation & Compliance</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
            <Check size={12} /> Auto-Saved {lastSavedTime}
          </span>
          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <Sparkles size={13} className="text-accent" /> Page Guidance
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-surface border border-border rounded-md p-5 shadow-card space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="chip bg-primary/10 text-primary font-bold mb-1.5">
              <Scale size={13} /> DRHP Section XI · Outstanding Litigation & Clearances
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Litigation & Statutory Clearances
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Disclose all ongoing tax appeals, civil proceedings, or criminal cases involving the company, promoters, or directors, along with statutory compliance clearance certificates.
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 5 mins
          </span>
        </div>

        {/* Documents Required & Common Mistakes Strip */}
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Documents Required:</b>
              <span className="text-muted">GST Appeal Orders, Income Tax Assessment Notices, EPFO/ESIC Payment Challans</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Assuming small tax demands under ₹20 Lakh do not need disclosure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="Materiality Threshold for SME Litigation"
        description="SEBI ICDR regulations mandate disclosing all open tax proceedings, notices under appeal, or civil disputes regardless of magnitude."
        termId="material-litigation"
        example="Pending GST input-tax demand of ₹18.4 Lakh under Section 73 of CGST Act before Commissioner (Appeals), Pune."
      />

      {/* SECTION CARD 1: Legal Proceedings */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Open Tax & Legal Proceedings ({formData.litigations.length})</span>
            <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Disclosed</span>
          </h3>

          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-accent hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={13} /> Explain Section
          </button>
        </div>

        {formData.litigations.length === 0 ? (
          <EmptyState
            title="No Pending Litigation Disclosed"
            description="If your company or promoters have no open tax proceedings or court cases, click below to log a formal clean slate declaration."
            actionLabel="Add Clean Slate Declaration"
            onAction={addCleanSlateLitigation}
          />
        ) : (
          <div className="space-y-3">
            {formData.litigations.map((l) => (
              <div key={l.id} className="bg-background p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="chip bg-primary text-white text-[10.5px]">
                      {l.party} · {l.type} Dispute
                    </span>
                    <span className="chip bg-amber-100 text-amber-900 text-[10.5px]">
                      {l.status}
                    </span>
                  </div>
                  <span className="mono text-xs font-bold text-slate-900">
                    Amount Involved: ₹{l.amountLakh} Lakh
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{l.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION CARD 2: Statutory Clearances */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary">
            2. Statutory Dues & Regulatory Clearances
          </h3>
          <span className="text-xs text-muted">Verification Status</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {[
            ['GST Monthly Returns (GSTR-3B & GSTR-1)', 'Up to date · No statutory default'],
            ['Provident Fund (EPFO) & ESIC Dues', 'Fully paid up to current quarter'],
            ['FSSAI & Pollution Control Clearances', 'Valid & active certificates'],
            ['Income Tax Returns (Past 3 Yrs)', 'Filed under Section 139(1) of IT Act'],
          ].map(([title, sub]) => (
            <div key={title} className="flex items-start gap-3 bg-background p-3 rounded border border-border">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 grid place-items-center shrink-0 mt-0.5 font-bold">
                ✓
              </span>
              <div>
                <b className="text-xs font-bold text-slate-900 block">{title}</b>
                <span className="text-[11px] text-slate-500">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('risks')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Risk Factors
        </button>
        <button
          onClick={() => {
            showToast('Saved Litigation & Compliance')
            setDrhpSection('offer')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Offer Details <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
