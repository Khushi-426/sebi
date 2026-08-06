import { useState } from 'react'
import {
  ChevronRight, ChevronLeft, HelpCircle, ShieldCheck, FileText, ExternalLink,
  Maximize2, ZoomIn, ZoomOut, Check, ArrowRight, BookOpen,
} from 'lucide-react'
import { useStore } from '../store'
import { validateDRHP } from '../utils/drhpValidation'

export default function RightContextPanel() {
  const {
    rightPanelCollapsed,
    toggleRightPanel,
    formData,
    drhpSection,
    toggleGlossaryDrawer,
    toggleAIDrawer,
    showToast,
    intermediaryMode,
    toggleIntermediaryMode,
  } = useStore()

  const [activeTab, setActiveTab] = useState<'Document' | 'Table of Contents'>('Document')
  const [zoom, setZoom] = useState(100)

  const validation = validateDRHP(formData)

  if (rightPanelCollapsed) {
    return (
      <aside className="w-12 bg-surface border-l border-border flex flex-col items-center py-4 space-y-4 shrink-0 select-none z-20">
        <button
          onClick={toggleRightPanel}
          className="p-2 rounded-md hover:bg-slate-100 text-slate-600 transition"
          title="Expand Right Panel"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="w-6 h-px bg-border" />

        <button
          onClick={toggleRightPanel}
          className="p-2 rounded-md bg-brand-light text-brand font-bold"
          title="Live Draft Preview"
        >
          <FileText size={18} />
        </button>
      </aside>
    )
  }

  return (
    <aside className="w-[500px] xl:w-[560px] bg-background border-l border-border flex h-full overflow-hidden shrink-0 select-none z-20">
      {/* COLUMN 1: Middle-Right Help & Section Completion Panel */}
      <div className="w-[220px] border-r border-border p-3.5 space-y-3.5 overflow-y-auto bg-background shrink-0">
        {/* Section Completion Card */}
        <div className="card p-3 bg-surface border-slate-200 rounded-xl space-y-2.5 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900">Section Completion</h4>

          {/* Required Fields */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-700">
              <span>Required Fields</span>
              <span className="mono font-bold text-slate-900">{validation.filledFields}/{validation.totalFields}</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${validation.overallPercentage}%` }}
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-700">
              <span>Optional Fields</span>
              <span className="mono font-bold text-slate-900">2/4</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[50%]" />
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-700">
              <span>Supporting Documents</span>
              <span className="mono font-bold text-slate-900">1/2</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[50%]" />
            </div>
          </div>

          {/* Alert Callout */}
          <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10.5px] font-medium text-amber-900 leading-snug">
            {validation.allWarnings.length > 0
              ? `Please resolve ${validation.allWarnings.length} pending items to complete this section.`
              : 'All mandatory fields for this section are complete!'}
          </div>
        </div>

        {/* Quick Help Card */}
        <div className="card p-3 bg-surface border-slate-200 rounded-xl space-y-2 shadow-xs">
          <h4 className="text-xs font-bold text-slate-900">Quick Help</h4>

          <div className="space-y-1 text-xs">
            {[
              'What is CIN?',
              'Where to find PAN?',
              'What should be filled here?',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => toggleAIDrawer()}
                className="w-full text-left p-1.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between transition border border-transparent hover:border-slate-200"
              >
                <span className="text-[11px]">{q}</span>
                <ChevronRight size={13} className="text-slate-400" />
              </button>
            ))}
          </div>

          <button
            onClick={() => toggleGlossaryDrawer()}
            className="w-full text-center py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-brand transition"
          >
            View all help topics
          </button>
        </div>

        {/* Tips for SME Promoters Card */}
        <div className="card p-3 bg-surface border-slate-200 rounded-xl space-y-1.5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-900 block">Tips for SME Promoters</span>
          <div className="flex items-start gap-1.5 text-[10.5px] text-slate-600 leading-relaxed">
            <ShieldCheck size={15} className="text-brand shrink-0 mt-0.5" />
            <span>Provide accurate information. You can edit anytime before sharing with your intermediary.</span>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Far-Right "Draft Preview" Simulation Window */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-surface">
        {/* Top Header */}
        <div className="p-3 border-b border-border flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-900">Draft Preview</h3>
          </div>

          <button
            onClick={() => showToast('Full screen preview opened')}
            className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Expand Full Preview"
          >
            <ExternalLink size={15} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border text-xs font-bold px-3 bg-surface">
          <button
            onClick={() => setActiveTab('Document')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'Document'
                ? 'border-brand text-brand'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Document
          </button>
          <button
            onClick={() => setActiveTab('Table of Contents')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'Table of Contents'
                ? 'border-brand text-brand'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Table of Contents
          </button>
        </div>

        {/* Document Simulation View Canvas */}
        <div className="flex-1 overflow-y-auto p-3 bg-slate-100/70 font-serif">
          {activeTab === 'Table of Contents' ? (
            <div className="bg-white border border-slate-300 shadow-paper p-5 rounded space-y-2 text-xs font-sans">
              <b className="text-sm font-bold text-slate-900 block border-b border-slate-200 pb-2">Table of Contents</b>
              <div className="space-y-1.5 text-slate-700">
                <div className="flex justify-between"><span>Section I – Corporate Identity</span><span className="mono">Page 2</span></div>
                <div className="flex justify-between"><span>Section II – Business Overview</span><span className="mono">Page 4</span></div>
                <div className="flex justify-between"><span>Section III – Restated Financials</span><span className="mono">Page 6</span></div>
                <div className="flex justify-between"><span>Section IV – Promoters & Board</span><span className="mono">Page 8</span></div>
                <div className="flex justify-between"><span>Section V – Risk Factors</span><span className="mono">Page 10</span></div>
                <div className="flex justify-between"><span>Section VI – Objects of the Issue</span><span className="mono">Page 12</span></div>
              </div>
            </div>
          ) : (
            /* Authentic Document Paper Card with Dynamic Live Data Binding */
            <div className="bg-white border border-slate-300 shadow-paper p-5 rounded space-y-4 max-w-[380px] mx-auto text-slate-900">
              <div className="text-center space-y-1 border-b border-slate-200 pb-3">
                <h4 className="text-[9px] font-sans font-black uppercase tracking-widest text-slate-900">
                  DRAFT RED HERRING PROSPECTUS (DRHP)
                </h4>
                <h2 className="text-xs font-bold uppercase tracking-tight text-slate-950 font-serif leading-tight">
                  {formData.proposedName || formData.legalName || 'SUNRISE GLOBAL SOLUTIONS PRIVATE LIMITED'}
                </h2>
                <span className="text-[9px] font-sans text-slate-500 block">
                  Target Exchange: {formData.targetExchange} SME Emerge
                </span>
              </div>

              <div className="text-[9px] font-sans text-center text-slate-600 space-y-0.5 border-b border-slate-200 pb-3">
                <p><b>Registered Office:</b> {formData.registeredAddress}</p>
                <p>CIN: <b className="mono font-bold text-slate-900">{formData.cin}</b> | PAN: {formData.pan}</p>
              </div>

              {/* Dynamic Sections */}
              <div className="space-y-3 text-[9.5px] leading-relaxed text-justify">
                {/* 1. Corporate Identity */}
                <div className="space-y-1">
                  <b className="font-sans text-[10px] font-bold text-slate-950 uppercase block">SECTION I – GENERAL INFORMATION</b>
                  <p className="text-slate-800 font-serif">
                    Our Company was originally incorporated as "{formData.legalName}" under the Companies Act, 2013 vide Certificate of Incorporation dated {formData.incorporatedDate} bearing CIN <span className="mono font-bold">{formData.cin}</span>.
                  </p>
                </div>

                {/* 2. Business Overview */}
                {formData.businessModel && (
                  <div className="space-y-1 border-t border-slate-100 pt-2">
                    <b className="font-sans text-[10px] font-bold text-slate-950 uppercase block">SECTION II – OUR BUSINESS</b>
                    <p className="text-slate-800 font-serif">{formData.businessModel}</p>
                    {formData.coreProducts.length > 0 && (
                      <div className="text-[9px] font-sans text-slate-700 bg-slate-50 p-1.5 rounded">
                        <b>Core Products: </b> {formData.coreProducts.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Financial Performance */}
                <div className="space-y-1 border-t border-slate-100 pt-2 font-sans">
                  <b className="text-[10px] font-bold text-slate-950 uppercase block">SECTION III – FINANCIAL HIGHLIGHTS (FY23)</b>
                  <div className="grid grid-cols-2 gap-1 bg-slate-50 p-2 rounded text-[9px] border border-slate-200">
                    <div>Revenue: <b className="mono">₹{formData.fy23RevenueCr} Cr</b></div>
                    <div>EBITDA: <b className="mono">₹{formData.fy23EbitdaCr} Cr ({formData.ebitdaMargin})</b></div>
                    <div>PAT: <b className="mono text-emerald-700">₹{formData.fy23PatCr} Cr ({formData.patMargin})</b></div>
                    <div>Net Worth: <b className="mono">₹{formData.fy23NetWorthCr} Cr</b></div>
                  </div>
                </div>

                {/* 4. Promoters */}
                {formData.promoters.length > 0 && (
                  <div className="space-y-1 border-t border-slate-100 pt-2 font-sans">
                    <b className="text-[10px] font-bold text-slate-950 uppercase block">SECTION IV – PROMOTERS & BOARD</b>
                    <div className="text-[9px] text-slate-800">
                      {formData.promoters.map((p) => (
                        <div key={p.name} className="flex justify-between">
                          <span>{p.name} ({p.role})</span>
                          <b className="mono">{p.stakePct}% Stake</b>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Risk Factors */}
                {formData.risks.length > 0 && (
                  <div className="space-y-1 border-t border-slate-100 pt-2 font-sans">
                    <b className="text-[10px] font-bold text-slate-950 uppercase block">SECTION V – RISK FACTORS</b>
                    <div className="space-y-1 text-[8.5px] text-slate-700">
                      {formData.risks.slice(0, 2).map((r) => (
                        <div key={r.id}>• <b>{r.title}:</b> {r.description}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Issue Structure */}
                <div className="space-y-1 border-t border-slate-100 pt-2 font-sans">
                  <b className="text-[10px] font-bold text-slate-950 uppercase block">SECTION VI – OFFER STRUCTURE</b>
                  <div className="text-[9px] bg-slate-50 p-2 rounded space-y-0.5 border border-slate-200">
                    <div className="flex justify-between"><span>Total Issue Size:</span><b className="mono">₹{formData.totalIssueSizeCr} Cr</b></div>
                    <div className="flex justify-between"><span>Fresh Issue:</span><b className="mono">₹{formData.freshIssueCr} Cr</b></div>
                    <div className="flex justify-between"><span>Offer for Sale:</span><b className="mono">₹{formData.ofsCr} Cr</b></div>
                    <div className="flex justify-between"><span>Lead Manager:</span><b>{formData.leadManager}</b></div>
                  </div>
                </div>

                <p className="text-[8.5px] font-sans text-slate-400 italic text-center pt-2 border-t border-slate-100">
                  (Live dynamic draft prospectus preview updated in real-time)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Document Zoom Controls Bar */}
        <div className="p-2 border-t border-border bg-surface flex items-center justify-between px-3 text-xs">
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(Math.max(75, zoom - 10))} className="p-1 rounded text-slate-500 hover:text-slate-900">
              -
            </button>
            <span className="mono font-bold text-slate-700 text-[11px]">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(125, zoom + 10))} className="p-1 rounded text-slate-500 hover:text-slate-900">
              +
            </button>
          </div>

          <button onClick={() => showToast('Full screen preview mode')} className="p-1 rounded text-slate-500 hover:text-slate-900">
            <Maximize2 size={13} />
          </button>
        </div>

        {/* Bottom Review Status Card */}
        <div className="p-3 bg-slate-50 border-t border-border space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-bold text-slate-900">Review Status</span>
            <span className="chip bg-purple-100 text-purple-800 text-[9.5px] font-extrabold uppercase">
              PROMOTER DRAFT
            </span>
          </div>

          <p className="text-[10.5px] text-slate-600 leading-snug">
            This draft is created by promoter. Share with your intermediary for review.
          </p>

          <button
            onClick={toggleIntermediaryMode}
            className="w-full text-center py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-white text-[11px] font-bold text-slate-900 transition bg-surface shadow-xs"
          >
            Mark as Ready for Review
          </button>
        </div>
      </div>
    </aside>
  )
}
