import { useState } from 'react'
import { Users, Plus, Trash2, ArrowRight, ArrowLeft, Check, AlertCircle, Clock, FileText, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function PromotersManagementForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [newPromoterName, setNewPromoterName] = useState('')
  const [newPromoterStake, setNewPromoterStake] = useState<number>(10)
  const [newPromoterRole, setNewPromoterRole] = useState('')

  function addPromoter() {
    if (!newPromoterName.trim()) return
    updateFormData({
      promoters: [
        ...formData.promoters,
        {
          name: newPromoterName.trim(),
          age: 40,
          dinPan: 'DIN Pending',
          stakePct: newPromoterStake,
          role: newPromoterRole.trim() || 'Co-Promoter',
        },
      ],
    })
    setNewPromoterName('')
    setNewPromoterRole('')
  }

  function removePromoter(idx: number) {
    updateFormData({
      promoters: formData.promoters.filter((_, i) => i !== idx),
    })
  }

  const promotersValid = formData.promoters.length >= 1
  const directorsValid = formData.directors.length >= 3

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">4. Promoters & Management</span>
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
              <Users size={13} /> DRHP Section XII · Our Management & Promoters
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Promoters & Board of Directors
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Disclose promoter profiles, pre-issue equity shareholding percentages, Board composition, and Director Identification Numbers (DIN).
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 7 mins
          </span>
        </div>

        {/* Documents Required & Common Mistakes Strip */}
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Documents Required:</b>
              <span className="text-muted">Promoter KYC (PAN/Aadhaar), DIN Allotment Letters, Cap Table</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Unallotted DIN for Independent Director; promoter group members omitted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="Who qualifies as a Promoter?"
        description="Individuals or holding entities who founded the company, hold executive control, or are named as promoters in annual filings. Minimum 20% promoter post-issue holding is locked in for 3 years."
        termId="promoter-group"
      />

      {/* SECTION CARD 1: Promoter Group & Shareholding */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Promoter Group & Pre-Issue Stake</span>
            {promotersValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ {formData.promoters.length} Promoter(s) Disclosed</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Min 1 promoter required</span>
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
          {formData.promoters.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between bg-background p-3.5 rounded border border-border text-xs">
              <div>
                <b className="text-xs font-bold text-slate-900 block">{p.name}</b>
                <span className="text-[11px] text-muted">
                  {p.role} · {p.dinPan}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="chip bg-amber-100 text-amber-900 font-bold mono">
                  {p.stakePct}% Equity Stake
                </span>
                {formData.promoters.length > 1 && (
                  <button type="button" onClick={() => removePromoter(idx)} className="text-slate-400 hover:text-danger p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="grid sm:grid-cols-3 gap-2 pt-2">
            <input
              id="newPromoterName"
              type="text"
              value={newPromoterName}
              onChange={(e) => setNewPromoterName(e.target.value)}
              placeholder="Promoter Full Name..."
              className="bg-background border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30 font-medium"
            />
            <input
              id="newPromoterRole"
              type="text"
              value={newPromoterRole}
              onChange={(e) => setNewPromoterRole(e.target.value)}
              placeholder="Role (e.g. Managing Director)..."
              className="bg-background border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="flex gap-2">
              <input
                id="newPromoterStake"
                type="number"
                value={newPromoterStake}
                onChange={(e) => setNewPromoterStake(parseFloat(e.target.value) || 0)}
                placeholder="Stake %"
                className="w-20 bg-background border border-border rounded-md text-xs px-2.5 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
              />
              <button type="button" onClick={addPromoter} className="btn btn-navy btn-sm flex-1 justify-center">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION CARD 2: Board Composition */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>2. Board of Directors & DIN Status</span>
            {directorsValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Board Configured ({formData.directors.length})</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Recommend at least 3 directors</span>
            )}
          </h3>
        </div>

        <div className="space-y-2">
          {formData.directors.map((d, idx) => (
            <div key={idx} className="flex items-center justify-between bg-background p-3 rounded border border-border text-xs">
              <div>
                <b className="text-xs font-bold text-slate-900 block">{d.name}</b>
                <span className="text-[11px] text-muted">{d.role}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted">DIN: {d.din}</span>
                {d.status === 'Complete' ? (
                  <span className="chip bg-emerald-100 text-emerald-800 text-[10.5px]">
                    <Check size={11} /> DIN Active
                  </span>
                ) : (
                  <span className="chip bg-amber-100 text-amber-800 text-[10.5px]">
                    <AlertCircle size={11} /> Pending Allotment
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('financials')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Financial Snapshot
        </button>
        <button
          onClick={() => {
            showToast('Saved Promoters & Management')
            setDrhpSection('risks')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Risk Factors <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
