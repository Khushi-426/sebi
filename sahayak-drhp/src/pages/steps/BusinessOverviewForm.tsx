import { useState } from 'react'
import {
  Briefcase, Plus, Trash2, ArrowRight, ArrowLeft, Clock, FileText, AlertTriangle, Sparkles, ChevronRight, Check,
} from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function BusinessOverviewForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [newProduct, setNewProduct] = useState('')
  const [newStrength, setNewStrength] = useState('')

  function addProduct() {
    if (!newProduct.trim()) return
    updateFormData({ coreProducts: [...formData.coreProducts, newProduct.trim()] })
    setNewProduct('')
  }
  function removeProduct(idx: number) {
    updateFormData({ coreProducts: formData.coreProducts.filter((_, i) => i !== idx) })
  }

  function addStrength() {
    if (!newStrength.trim()) return
    updateFormData({ keyStrengths: [...formData.keyStrengths, newStrength.trim()] })
    setNewStrength('')
  }
  function removeStrength(idx: number) {
    updateFormData({ keyStrengths: formData.keyStrengths.filter((_, i) => i !== idx) })
  }

  const modelValid = formData.businessModel.trim().length > 20
  const productsValid = formData.coreProducts.length > 0
  const strengthsValid = formData.keyStrengths.length >= 2

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">2. Business Overview</span>
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
              <Briefcase size={13} /> Section VI · Our Business & Operations
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Business Overview & Operating Model
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Describe what your SME does, how you generate revenue, your primary product lines, manufacturing facilities, and distinct competitive advantages in plain English.
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
              <span className="text-muted">Product Catalog, Factory Lease Agreement, Distribution Agreements</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Using vague jargon; failing to disclose leased vs owned factory premises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="Plain Language Business Summary"
        description="SEBI mandates that retail investors can easily understand how your business operates, how raw materials become finished goods, and how you reach customers."
        example="Asset-light D2C model supplying 4,200+ modern-trade outlets and quick-commerce dark stores across 4 states."
      />

      {/* SECTION CARD 1: Business Model & Facilities */}
      <div className="card p-6 space-y-5 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Core Revenue Model & Facilities</span>
            {modelValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Described</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Min 20 chars needed</span>
            )}
          </h3>

          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-accent hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={13} /> Explain Section
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="businessModel" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Core Business Model Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="businessModel"
              rows={3}
              value={formData.businessModel}
              onChange={(e) => updateFormData({ businessModel: e.target.value })}
              placeholder="Explain how your company acquires materials, manufactures, sells, and generates profit..."
              className="w-full bg-background border border-border rounded-md text-sm p-3 text-text outline-none focus:ring-2 focus:ring-primary/30 transition leading-relaxed font-medium"
            />
            <span className="text-[11px] text-muted mt-1 block">State primary sales channels (e.g. Quick-commerce 42%, Modern Trade 35%, D2C 23%).</span>
          </div>

          <div>
            <label htmlFor="manufacturingLocation" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Manufacturing & Operational Facilities Location
            </label>
            <input
              id="manufacturingLocation"
              type="text"
              value={formData.manufacturingLocation}
              onChange={(e) => updateFormData({ manufacturingLocation: e.target.value })}
              placeholder="e.g. Leased automated production facility at Sector 4, Baner, Pune, MH"
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30 transition font-medium"
            />
            <span className="text-[11px] text-muted mt-1 block">Specify if property is leased or owned, and total daily capacity.</span>
          </div>
        </div>
      </div>

      {/* SECTION CARD 2: Core Products */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>2. Key Products & Service Lines</span>
            {productsValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ {formData.coreProducts.length} Product(s) Listed</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Add at least 1 product</span>
            )}
          </h3>
        </div>

        <div className="space-y-2">
          {formData.coreProducts.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between bg-background p-3 rounded border border-border text-xs">
              <span className="font-semibold text-slate-800">• {p}</span>
              <button
                type="button"
                onClick={() => removeProduct(idx)}
                className="text-slate-400 hover:text-danger p-1 transition"
                title="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <div className="flex gap-2 pt-1">
            <input
              id="newProduct"
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              placeholder="Add product or service (e.g. Cold-pressed organic sesame oil)..."
              className="flex-1 bg-background border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button type="button" onClick={addProduct} className="btn btn-navy btn-sm">
              <Plus size={14} /> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* SECTION CARD 3: Competitive Strengths */}
      <div className="card p-6 space-y-4 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>3. Competitive Strengths & Strategy</span>
            {strengthsValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Strengths Listed</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">List at least 2 strengths</span>
            )}
          </h3>
        </div>

        <div className="space-y-2">
          {formData.keyStrengths.map((str, idx) => (
            <div key={idx} className="flex items-center justify-between bg-background p-3 rounded border border-border text-xs">
              <span className="font-semibold text-slate-800">✓ {str}</span>
              <button
                type="button"
                onClick={() => removeStrength(idx)}
                className="text-slate-400 hover:text-danger p-1 transition"
                title="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <div className="flex gap-2 pt-1">
            <input
              id="newStrength"
              type="text"
              value={newStrength}
              onChange={(e) => setNewStrength(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStrength())}
              placeholder="Add competitive strength (e.g. Omnichannel reach across 4,200+ retail outlets)..."
              className="flex-1 bg-background border border-border rounded-md text-xs px-3 py-2 text-text outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button type="button" onClick={addStrength} className="btn btn-navy btn-sm">
              <Plus size={14} /> Add Strength
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('company')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Company Basics
        </button>
        <button
          onClick={() => {
            showToast('Saved Business Overview')
            setDrhpSection('financials')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Financial Snapshot <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
