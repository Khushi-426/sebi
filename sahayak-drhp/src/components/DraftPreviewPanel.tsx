import { useState } from 'react'
import { X, Copy, Check, Printer, Bookmark, Download, ExternalLink } from 'lucide-react'
import { useStore } from '../store'

export default function DraftPreviewPanel() {
  const { showPreviewPanel, togglePreviewPanel, formData, showToast } = useStore()
  const [copied, setCopied] = useState(false)
  const [activeBookmark, setActiveBookmark] = useState<string>('sec-cover')

  if (!showPreviewPanel) return null

  function scrollToSection(secId: string) {
    setActiveBookmark(secId)
    const el = document.getElementById(secId)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleCopyDocumentText() {
    const fullText = `DRAFT RED HERRING PROSPECTUS - ${formData.proposedName}\nCIN: ${formData.cin}\nRegistered Office: ${formData.registeredAddress}\nTotal Issue Size: ₹${formData.totalIssueSizeCr} Cr`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    showToast('Copied full DRHP document text to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[150] flex justify-end bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-[820px] bg-slate-100 flex flex-col h-full shadow-2xl border-l border-border animate-in slide-in-from-right duration-200">
        {/* Top Preview Toolbar */}
        <div className="bg-primary text-white p-3.5 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            <Bookmark size={16} className="text-accent" />
            <div>
              <h2 className="text-xs font-bold tracking-wide uppercase text-white">
                Formal SEBI SME Offer Document Preview
              </h2>
              <span className="text-[10.5px] text-slate-300">
                {formData.proposedName} · SEBI ICDR Compliant Format
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyDocumentText}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition flex items-center gap-1"
              title="Copy text"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition flex items-center gap-1"
              title="Print DRHP document"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={togglePreviewPanel}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition"
              title="Close Preview Panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Section Bookmark Navigator Strip */}
        <div className="bg-surface border-b border-border px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar shrink-0">
          <span className="text-muted font-bold uppercase text-[10px] shrink-0">Bookmarks:</span>
          {[
            ['sec-cover', 'Cover Page'],
            ['sec-1', 'I. General Info'],
            ['sec-3', 'III. Risk Factors'],
            ['sec-6', 'VI. Our Business'],
            ['sec-7', 'VII. Financials'],
            ['sec-9', 'IX. Objects'],
            ['sec-11', 'XI. Litigation'],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition ${
                activeBookmark === id ? 'bg-primary text-white' : 'bg-background text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Document Viewer Body — Authentic SEBI SME DRHP Page Format */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-200/80 font-serif">
          {/* PAGE 1: COVER PAGE */}
          <div id="sec-cover" className="bg-white border border-slate-300 shadow-md p-8 md:p-12 rounded-sm space-y-6 max-w-[700px] mx-auto text-slate-900 relative">
            <div className="flex justify-between items-start text-[10px] font-sans font-semibold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">
              <span>Strictly Private & Confidential</span>
              <span>Draft Red Herring Prospectus</span>
            </div>

            <div className="text-center space-y-3 py-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-sans font-bold uppercase tracking-wider rounded border border-amber-300">
                Recently Updated Draft
              </span>
              <h1 className="text-2xl font-bold uppercase tracking-tight leading-tight text-slate-950 font-serif">
                {formData.proposedName || 'SATVIK FOODS LIMITED'}
              </h1>
              <p className="text-xs text-slate-600 font-sans">
                Corporate Identity Number (CIN): <b className="mono text-slate-900">{formData.cin}</b>
              </p>
              <p className="text-xs text-slate-600 font-sans max-w-[500px] mx-auto">
                Registered Office: {formData.registeredAddress}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-300 rounded text-xs font-serif leading-relaxed text-justify text-slate-800 space-y-2">
              <p>
                INITIAL PUBLIC OFFER OF UP TO <b>{formData.totalIssueSizeCr} CRORE</b> EQUITY SHARES OF FACE VALUE OF ₹{formData.faceValue} EACH ("EQUITY SHARES") OF {formData.proposedName?.toUpperCase()} FOR CASH AT A PRICE BAND OF {formData.priceBand} PER EQUITY SHARE AGGREGATING UP TO ₹{formData.totalIssueSizeCr} CRORE.
              </p>
              <p>
                THE ISSUE COMPRISES A FRESH ISSUE OF UP TO ₹{formData.freshIssueCr} CRORE AND AN OFFER FOR SALE (OFS) OF UP TO ₹{formData.ofsCr} CRORE BY PROMOTERS.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-b border-slate-200 py-3">
              <div>
                <b className="text-[10px] text-slate-500 uppercase block">Target Exchange Platform:</b>
                <span className="font-bold text-slate-900">{formData.targetExchange} SME Platform</span>
              </div>
              <div>
                <b className="text-[10px] text-slate-500 uppercase block">Lead Manager (Merchant Banker):</b>
                <span className="font-bold text-slate-900">{formData.leadManager}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-sans text-slate-400 pt-2">
              <span>SEBI SME ICDR Schedule IX Format</span>
              <span className="font-bold text-slate-600">Page 1 of 14</span>
            </div>
          </div>

          {/* PAGE 2: SECTION I — CORPORATE IDENTIFICATION */}
          <div id="sec-1" className="bg-white border border-slate-300 shadow-md p-8 md:p-12 rounded-sm space-y-4 max-w-[700px] mx-auto text-slate-900 relative">
            <div className="flex justify-between items-center text-[10px] font-sans text-slate-400 border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase">Section I — General Information</span>
              <span>Page 2 of 14</span>
            </div>

            <h2 className="text-base font-bold uppercase tracking-wide text-slate-950 font-serif border-b border-slate-900 pb-1">
              1. Corporate Identity & Registration
            </h2>

            <div className="text-xs leading-relaxed space-y-2 text-justify">
              <p>
                Our Company was originally incorporated as "{formData.legalName}" under the provisions of the Companies Act, 2013 on {formData.incorporatedDate}.
              </p>
              <div className="bg-slate-50 p-3 border border-slate-200 rounded text-xs space-y-1 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-500">Legal Registered Name:</span>
                  <b className="text-slate-900">{formData.legalName}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corporate Identity Number (CIN):</span>
                  <b className="mono text-slate-900">{formData.cin}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">RoC Jurisdiction:</span>
                  <b className="text-slate-900">{formData.rocOffice}</b>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 3: SECTION III — RISK FACTORS */}
          <div id="sec-3" className="bg-white border border-slate-300 shadow-md p-8 md:p-12 rounded-sm space-y-4 max-w-[700px] mx-auto text-slate-900 relative">
            <div className="flex justify-between items-center text-[10px] font-sans text-slate-400 border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase">Section III — Risk Factors</span>
              <span>Page 3 of 14</span>
            </div>

            <h2 className="text-base font-bold uppercase tracking-wide text-slate-950 font-serif border-b border-slate-900 pb-1">
              3. Internal & External Risk Factors
            </h2>

            <div className="space-y-3 text-xs leading-relaxed text-justify">
              {formData.risks.map((r, idx) => (
                <div key={r.id} className="space-y-1">
                  <b className="font-bold text-slate-950 font-serif block">
                    {idx + 1}. {r.title} ({r.category} Risk)
                  </b>
                  <p className="text-slate-800">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
