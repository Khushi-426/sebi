import { Landmark, ArrowRight, ArrowLeft, Clock, FileText, AlertTriangle, Sparkles, ChevronRight, Check } from 'lucide-react'
import { useStore } from '../../store'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function FinancialSnapshotForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const revenueValid = formData.fy23RevenueCr > 0
  const patValid = formData.fy23PatCr > 0

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">3. Financial Snapshot</span>
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
              <Landmark size={13} /> Section VII · Restated Financial Statements
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Financial Highlights & Restated Performance
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Key audited financial metrics for the latest completed fiscal year (FY23). These figures feed Section VII of your DRHP and must match your restated financial audit report.
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 6 mins
          </span>
        </div>

        {/* Documents Required & Common Mistakes Strip */}
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Documents Required:</b>
              <span className="text-muted">Restated Financial Audit Report (FY21–FY23), Peer-Reviewed CA Certificate</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Common SME Mistakes:</b>
              <span className="text-amber-900">Mixing standalone vs consolidated revenue; PAT higher than total revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Card */}
      <ContextualHelpCard
        title="What are Restated Financial Statements?"
        description="Audited financials for past 3 years re-compiled under uniform SEBI ICDR accounting standards and certified by a Peer-Reviewed Chartered Accountant."
        termId="ebitda"
        example="FY23 Restated Revenue: ₹28.50 Cr · Operating EBITDA: ₹4.20 Cr (14.8%) · PAT: ₹2.48 Cr (8.7%)"
      />

      {/* SECTION CARD 1: Income Statement Highlights */}
      <div className="card p-6 space-y-5 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2">
            <span>1. Income Statement Key Figures (in ₹ Crore)</span>
            {revenueValid && patValid ? (
              <span className="chip bg-emerald-100 text-emerald-800 text-[11px]">✓ Valid Figures</span>
            ) : (
              <span className="chip bg-amber-100 text-amber-800 text-[11px]">Revenue & PAT required</span>
            )}
          </h3>

          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-accent hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={13} /> Explain Section
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fy23RevenueCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              FY23 Revenue from Operations (₹ Cr) <span className="text-danger">*</span>
            </label>
            <input
              id="fy23RevenueCr"
              type="number"
              step="0.01"
              value={formData.fy23RevenueCr}
              onChange={(e) => updateFormData({ fy23RevenueCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 transition font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Total operating revenue excluding non-operating interest income.</span>
          </div>

          <div>
            <label htmlFor="fy23EbitdaCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              FY23 Operating EBITDA (₹ Cr)
            </label>
            <input
              id="fy23EbitdaCr"
              type="number"
              step="0.01"
              value={formData.fy23EbitdaCr}
              onChange={(e) => updateFormData({ fy23EbitdaCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 transition font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Operating cash profit before interest, tax & depreciation.</span>
          </div>

          <div>
            <label htmlFor="fy23PatCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              FY23 Profit After Tax (PAT) (₹ Cr) <span className="text-danger">*</span>
            </label>
            <input
              id="fy23PatCr"
              type="number"
              step="0.01"
              value={formData.fy23PatCr}
              onChange={(e) => updateFormData({ fy23PatCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-emerald-700 mono outline-none focus:ring-2 focus:ring-primary/30 transition font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Net profit after all taxes and interest charges.</span>
          </div>

          <div>
            <label htmlFor="ebitdaMargin" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Operating EBITDA Margin (%) & PAT Margin (%)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                id="ebitdaMargin"
                type="text"
                value={formData.ebitdaMargin}
                onChange={(e) => updateFormData({ ebitdaMargin: e.target.value })}
                placeholder="EBITDA % (e.g. 14.8%)"
                className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                id="patMargin"
                type="text"
                value={formData.patMargin}
                onChange={(e) => updateFormData({ patMargin: e.target.value })}
                placeholder="PAT % (e.g. 8.7%)"
                className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION CARD 2: Balance Sheet & Borrowings */}
      <div className="card p-6 space-y-5 bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-primary">
            2. Balance Sheet Position & Borrowings (in ₹ Crore)
          </h3>
          <span className="text-xs text-muted">Audited Balance Sheet Data</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fy23NetWorthCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Total Net Worth (₹ Cr)
            </label>
            <input
              id="fy23NetWorthCr"
              type="number"
              step="0.01"
              value={formData.fy23NetWorthCr}
              onChange={(e) => updateFormData({ fy23NetWorthCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Paid-up capital plus free reserves.</span>
          </div>

          <div>
            <label htmlFor="totalBorrowingsCr" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Total Borrowings (₹ Cr)
            </label>
            <input
              id="totalBorrowingsCr"
              type="number"
              step="0.01"
              value={formData.totalBorrowingsCr}
              onChange={(e) => updateFormData({ totalBorrowingsCr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Secured bank debt plus working capital loans.</span>
          </div>

          <div>
            <label htmlFor="debtEquityRatio" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Debt-to-Equity Ratio
            </label>
            <input
              id="debtEquityRatio"
              type="text"
              value={formData.debtEquityRatio}
              onChange={(e) => updateFormData({ debtEquityRatio: e.target.value })}
              placeholder="e.g. 0.24x"
              className="w-full bg-background border border-border rounded-md text-sm px-3 py-2 text-text mono outline-none focus:ring-2 focus:ring-primary/30 font-bold"
            />
            <span className="text-[11px] text-muted mt-1 block">Total Debt divided by Total Net Worth.</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center border-t border-border pt-5">
        <button
          onClick={() => setDrhpSection('business')}
          className="btn btn-ghost btn-md inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} /> Back: Business Overview
        </button>
        <button
          onClick={() => {
            showToast('Saved Financial Snapshot')
            setDrhpSection('promoters')
          }}
          className="btn btn-accent btn-lg inline-flex items-center gap-2"
        >
          Save & Next: Promoters & Management <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
