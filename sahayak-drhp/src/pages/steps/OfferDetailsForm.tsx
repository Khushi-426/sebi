import { useState } from 'react'
import { PieChart, Plus, Trash2, ArrowRight, ArrowLeft, Clock, FileText, AlertTriangle, Sparkles, ChevronRight, Check, AlertCircle } from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function OfferDetailsForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [newPurpose, setNewPurpose] = useState('')
  const [newAmt, setNewAmt] = useState<number>(2.5)

  const calcTotal = (formData.freshIssueCr || 0) + (formData.ofsCr || 0)
  const mathMatches = Math.abs(calcTotal - formData.totalIssueSizeCr) < 0.05

  const objectsSum = formData.objects.reduce((s, o) => s + o.amtCr, 0)
  const objectsMatch = Math.abs(objectsSum - formData.freshIssueCr) < 0.05

  function addObject() {
    if (!newPurpose.trim()) return
    updateFormData({
      objects: [...formData.objects, { purpose: newPurpose.trim(), amtCr: newAmt }],
    })
    setNewPurpose('')
  }
  function removeObject(idx: number) {
    updateFormData({
      objects: formData.objects.filter((_, i) => i !== idx),
    })
  }

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">7. Offer Details & Objects</span>
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
              <PieChart size={13} /> DRHP Section IX · Offer Structure & Fund Utilization
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Offer Structure & Objects of the Issue
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Define total issue size, split between Fresh Issue and Offer for Sale (OFS), and list planned object expenditures under Section IX.
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 8 mins
          </span>
        </div>

        {/* Documents Required & Common Mistakes Strip */}
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Documents Required:</b>
              <span className="text-muted">Board Resolution for IPO, Merchant Banker Engagement Mandate</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Objects total sum not matching Net Fresh Issue amount exactly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="Objects of the Issue Rules"
        description="Fresh Issue proceeds must be allocated to specific capital expenditure or working capital needs. Unallocated general corporate purposes cannot exceed 25% of net proceeds."
        termId="objects"
        example="Plant Machinery: ₹12.50 Cr · Working Capital: ₹8.00 Cr · General Corp: ₹3.50 Cr (Total: ₹24.00 Cr)"
      />

      {/* SECTION CARD 1: Issue Structure */}
      <div className="card p-6 space-y-5 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Issue Structure & Pricing (in ₹ Crore)</span>
            {mathMatches ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Math Reconciled</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Fresh + OFS mismatch</span>
            )}
          </h3>

          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-accent hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={13} /> Explain Section
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="totalIssueSizeCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Total Issue Size (₹ Cr) <span className="text-danger">*</span>
            </label>
            <input
              id="totalIssueSizeCr"
              type="number"
              step="0.1"
              value={formData.totalIssueSizeCr}
              onChange={(e) => updateFormData({ totalIssueSizeCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
          </div>

          <div>
            <label htmlFor="freshIssueCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Fresh Issue Amount (₹ Cr) <span className="text-danger">*</span>
            </label>
            <input
              id="freshIssueCr"
              type="number"
              step="0.1"
              value={formData.freshIssueCr}
              onChange={(e) => updateFormData({ freshIssueCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
          </div>

          <div>
            <label htmlFor="ofsCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Offer for Sale (OFS) (₹ Cr)
            </label>
            <input
              id="ofsCr"
              type="number"
              step="0.1"
              value={formData.ofsCr}
              onChange={(e) => updateFormData({ ofsCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
          </div>
        </div>

        {!mathMatches && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded text-xs flex items-center gap-2">
            <AlertCircle size={15} className="text-amber-700 shrink-0" />
            <span>
              Fresh Issue (₹{formData.freshIssueCr}Cr) + OFS (₹{formData.ofsCr}Cr) = ₹{calcTotal.toFixed(2)}Cr, which does not equal Total Issue Size (₹{formData.totalIssueSizeCr}Cr).
            </span>
          </div>
        )}
      </div>

      {/* SECTION CARD 2: Objects Expenditure Breakdown */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>2. Objects Deployment Breakdown</span>
            {objectsMatch ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Sum Matches Fresh Issue</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Differs from Fresh Issue</span>
            )}
          </h3>
        </div>

        <div className="space-y-2">
          {formData.objects.map((o, idx) => (
            <div key={idx} className="flex items-center justify-between bg-background p-3 rounded border border-border text-xs">
              <span className="text-slate-800 font-medium">{o.purpose}</span>
              <div className="flex items-center gap-3">
                <b className="mono text-xs text-slate-900 font-bold">₹{o.amtCr.toFixed(2)} Cr</b>
                {formData.objects.length > 1 && (
                  <button type="button" onClick={() => removeObject(idx)} className="text-slate-400 hover:text-danger p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between p-3 bg-primary text-white rounded text-xs font-bold">
            <span>Total Objects Allocated</span>
            <span className="mono text-sm">
              ₹{objectsSum.toFixed(2)} Cr / ₹{formData.freshIssueCr.toFixed(2)} Cr
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <input
              id="newPurpose"
              type="text"
              value={newPurpose}
              onChange={(e) => setNewPurpose(e.target.value)}
              placeholder="Object purpose (e.g. Funding Working Capital)..."
              className="flex-1 bg-background border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              id="newAmt"
              type="number"
              step="0.1"
              value={newAmt}
              onChange={(e) => setNewAmt(parseFloat(e.target.value) || 0)}
              placeholder="Amount Cr"
              className="w-24 bg-background border border-border rounded-md text-xs px-2.5 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
            <button type="button" onClick={addObject} className="btn btn-navy btn-sm">
              <Plus size={14} /> Add Object
            </button>
          </div>
        </div>
      </div>

      {/* SECTION CARD 3: Intermediary Details */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary">
            3. Appointed Intermediaries & Platform
          </h3>
          <span className="text-xs text-muted">Statutory Mandates</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="targetExchange" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Target SME Platform
            </label>
            <input
              id="targetExchange"
              type="text"
              value={formData.targetExchange}
              onChange={(e) => updateFormData({ targetExchange: e.target.value })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text font-semibold outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label htmlFor="leadManager" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Lead Manager (Merchant Banker)
            </label>
            <input
              id="leadManager"
              type="text"
              value={formData.leadManager}
              onChange={(e) => updateFormData({ leadManager: e.target.value })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text font-semibold outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label htmlFor="registrar" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Registrar to the Issue
            </label>
            <input
              id="registrar"
              type="text"
              value={formData.registrar}
              onChange={(e) => updateFormData({ registrar: e.target.value })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text font-semibold outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('litigation')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Litigation
        </button>
        <button
          onClick={() => {
            showToast('Saved Offer Details')
            setDrhpSection('review')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Review & Export <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
