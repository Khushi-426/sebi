import { useState } from 'react'
import { AlertTriangle, Plus, Trash2, ArrowRight, ArrowLeft, Clock, FileText, Sparkles, ChevronRight, Check } from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function RiskFactorsForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<'Internal' | 'External' | 'Financial' | 'Regulatory'>('Internal')
  const [newDesc, setNewDesc] = useState('')
  const [newMitigation, setNewMitigation] = useState('')

  function addRisk() {
    if (!newTitle.trim() || !newDesc.trim()) return
    updateFormData({
      risks: [
        ...formData.risks,
        {
          id: `r_${Date.now()}`,
          title: newTitle.trim(),
          category: newCategory,
          severity: 'High',
          description: newDesc.trim(),
          mitigation: newMitigation.trim() || 'Active operational controls implemented.',
        },
      ],
    })
    setNewTitle('')
    setNewDesc('')
    setNewMitigation('')
  }

  function removeRisk(id: string) {
    updateFormData({
      risks: formData.risks.filter((r) => r.id !== id),
    })
  }

  const risksValid = formData.risks.length >= 3

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">5. Risk Factors</span>
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
              <AlertTriangle size={13} /> Section III · Mandatory Risk Disclosures
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Risk Factors & Mitigation Strategies
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Disclose internal operational risks, supplier dependencies, raw material price fluctuations, and regulatory matters under Section III of your DRHP.
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 10 mins
          </span>
        </div>

        {/* Documents Required & Common Mistakes Strip */}
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Documents Required:</b>
              <span className="text-muted">Supplier Concentration Records, Raw Material Contracts, Tax Appeal Orders</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Omitting customer or platform concentration risks; missing mitigation actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="Why are Risk Factors critical in Section III?"
        description="Transparent risk disclosures inform prospective retail investors in advance and protect company promoters legally against non-disclosure disputes."
        example="Channel Risk: 42% sales depend on 2 quick-commerce platforms. Mitigation: Expanding regional retail distribution."
      />

      {/* SECTION CARD 1: Disclosed Risks List */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Disclosed Risk Factors ({formData.risks.length})</span>
            {risksValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Risk Disclosures Complete</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Disclose at least 3 risks</span>
            )}
          </h3>

          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-accent hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={13} /> Explain Section
          </button>
        </div>

        <div className="space-y-3">
          {formData.risks.map((r) => (
            <div key={r.id} className="border-l-4 border-amber-500 bg-background p-4 rounded-r border border-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <b className="text-xs font-bold text-slate-900">{r.title}</b>
                  <span className="chip bg-amber-100 text-amber-900 text-[10.5px]">
                    {r.category}
                  </span>
                </div>
                {formData.risks.length > 1 && (
                  <button type="button" onClick={() => removeRisk(r.id)} className="text-slate-400 hover:text-danger p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <p className="text-slate-700 leading-relaxed font-medium">{r.description}</p>
              {r.mitigation && (
                <div className="text-[11.5px] text-amber-900 bg-surface p-2.5 rounded border border-border font-medium">
                  <span className="font-bold uppercase tracking-wider text-[10px] block text-slate-900">Mitigation Strategy:</span>
                  {r.mitigation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SECTION CARD 2: Add New Risk */}
        <div className="pt-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Add Additional Risk Factor
          </h4>

          <div className="space-y-3 bg-background p-4 rounded border border-border">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label htmlFor="newRiskTitle" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Risk Factor Title
                </label>
                <input
                  id="newRiskTitle"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Raw Material Monsoon & Harvest Fluctuations"
                  className="w-full bg-surface border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label htmlFor="newRiskCategory" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  id="newRiskCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-surface border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="Internal">Internal Operational</option>
                  <option value="External">External Market</option>
                  <option value="Financial">Financial / Debt</option>
                  <option value="Regulatory">Regulatory & Tax</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="newRiskDesc" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Detailed Description of Risk Impact
              </label>
              <textarea
                id="newRiskDesc"
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe potential business impact if this risk materializes..."
                className="w-full bg-surface border border-border rounded-md text-xs p-3 text-text outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed font-medium"
              />
            </div>

            <div>
              <label htmlFor="newRiskMitigation" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Proposed Mitigation Strategy
              </label>
              <input
                id="newRiskMitigation"
                type="text"
                value={newMitigation}
                onChange={(e) => setNewMitigation(e.target.value)}
                placeholder="e.g. Long-term sourcing agreements with agricultural cooperatives"
                className="w-full bg-surface border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <button type="button" onClick={addRisk} className="btn btn-navy btn-sm inline-flex items-center gap-1.5">
              <Plus size={14} /> Add Risk Disclosure
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('promoters')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Promoters & Management
        </button>
        <button
          onClick={() => {
            showToast('Saved Risk Factors')
            setDrhpSection('litigation')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Litigation & Compliance <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
