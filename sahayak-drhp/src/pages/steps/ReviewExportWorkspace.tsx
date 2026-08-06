import { useState } from 'react'
import {
  FileCheck2, Download, Send, Check, ShieldCheck, AlertCircle, AlertTriangle, Eye, Printer, Copy,
  ArrowLeft, FileText, CheckCircle2, RotateCcw, Clock, Sparkles, ChevronRight,
} from 'lucide-react'
import { useStore } from '../../store'
import { validateDRHP } from '../../utils/drhpValidation'
import ContextualHelpCard from '../../components/ContextualHelpCard'

export default function ReviewExportWorkspace() {
  const {
    formData,
    setDrhpSection,
    showToast,
    intermediaryMode,
    toggleIntermediaryMode,
    resetFormData,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [sent, setSent] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)

  const validation = validateDRHP(formData)

  function handleSendToBanker() {
    setSent(true)
    setShowSendModal(false)
    showToast('Draft & provenance trail sent to Merchant Banker for certification')
  }

  function handleDownloadPDF() {
    showToast('Downloading SEBI SME DRHP draft (mock PDF)...')
  }

  function handleExportJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2))
    const dlAnchor = document.createElement('a')
    dlAnchor.setAttribute('href', dataStr)
    dlAnchor.setAttribute('download', `${formData.proposedName || 'SME_DRHP'}_Draft.json`)
    dlAnchor.click()
    showToast('Exported DRHP data JSON file')
  }

  return (
    <div className="space-y-6 text-text">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-border">
        <div className="flex items-center gap-1.5 font-medium">
          <span>DRHP Builder</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-primary">8. Review & Export Workspace</span>
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
              <FileCheck2 size={13} /> Final Step · Completeness Audit & Export
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Review & Export Workspace
            </h1>
            <p className="text-xs text-muted leading-relaxed mt-1 max-w-[680px]">
              Audit all 8 sections for mandatory SEBI disclosures, resolve open warnings, and prepare your draft for merchant banker due diligence and statutory certification.
            </p>
          </div>

          <span className="chip bg-amber-50 text-amber-800 border border-amber-200 font-bold shrink-0">
            <Clock size={12} /> Est. 5 mins
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
          <div className="bg-background p-2.5 rounded border border-border flex items-start gap-2">
            <FileText size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-slate-900 block">Next Steps:</b>
              <span className="text-muted">Download PDF draft or transmit to appointed Lead Manager</span>
            </div>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200 text-amber-900 flex items-start gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <b className="font-semibold text-amber-950 block">Banker Due Diligence Note:</b>
              <span className="text-amber-900">Your Lead Manager reviews all provenance trails before filing with SEBI</span>
            </div>
          </div>
        </div>
      </div>

      <ContextualHelpCard
        title="Understanding Banker Certification & Readiness"
        description="Your Lead Manager (Merchant Banker) performs independent legal due diligence before certifying the DRHP. Resolving open warnings now speeds up their review."
        termId="lead-manager"
      />

      {/* Main Status Header Card */}
      <div className="card p-6 bg-primary text-white shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 flex-wrap relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-accent text-slate-900 mb-3 shadow-xs">
              <ShieldCheck size={14} /> Audit Status: {validation.overallPercentage}% Complete
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              {validation.isReadyForIntermediary
                ? 'Substantially Complete — Ready for Banker Certification'
                : 'Drafting in Progress — Gaps Flagged'}
            </h2>
            <p className="text-xs text-slate-200 mt-1 max-w-[540px] leading-relaxed">
              {validation.filledFields} out of {validation.totalFields} criteria met across all 8 DRHP offer document sections.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap shrink-0">
            <button onClick={handleDownloadPDF} className="btn btn-ghost btn-sm text-slate-900 border-white bg-white hover:bg-slate-100">
              <Download size={15} /> PDF Draft
            </button>

            <button
              onClick={() => setShowSendModal(true)}
              disabled={sent}
              className="btn btn-accent btn-sm"
            >
              {sent ? (
                <>
                  <Check size={15} /> Sent to Banker
                </>
              ) : (
                <>
                  <Send size={15} /> Send to Banker
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Section Audit Summary Grid */}
      <div className="card p-6 bg-surface shadow-card space-y-4">
        <h3 className="text-sm font-bold text-primary border-b border-border pb-3">
          1. DRHP Section Completeness Checklist
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {Object.values(validation.sectionMetas).map((sec) => (
            <button
              type="button"
              key={sec.id}
              onClick={() => setDrhpSection(sec.id)}
              className="flex items-center justify-between p-3.5 rounded border border-border bg-background hover:border-accent cursor-pointer transition text-left"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-secondary">Sec {sec.number}</span>
                  <b className="text-xs font-bold text-slate-900 truncate block">{sec.title}</b>
                </div>
                <span className="text-[11px] text-muted truncate block">{sec.description}</span>
              </div>

              <div className="shrink-0">
                {sec.status === 'done' ? (
                  <span className="chip bg-emerald-100 text-emerald-800 text-[10.5px]">
                    <Check size={11} /> Complete
                  </span>
                ) : (
                  <span className="chip bg-amber-100 text-amber-900 text-[10.5px]">
                    <AlertCircle size={11} /> {sec.warnings.length} Flag(s)
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Open Warnings & Gap Analysis */}
      {validation.allWarnings.length > 0 && (
        <div className="card p-6 bg-surface shadow-card space-y-3">
          <h3 className="text-sm font-bold text-primary border-b border-border pb-3 flex items-center justify-between">
            <span>2. Open Disclosures & Consistency Warnings</span>
            <span className="chip bg-amber-100 text-amber-900 text-xs font-bold">
              {validation.allWarnings.length} Flagged Item(s)
            </span>
          </h3>

          <div className="space-y-2.5">
            {validation.allWarnings.map((w, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 bg-amber-50/70 border border-amber-200 p-3.5 rounded text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-amber-950 font-bold block uppercase text-[10.5px]">
                      Section: {w.sectionId} · {w.fieldName}
                    </b>
                    <p className="text-amber-950 font-medium leading-relaxed">{w.warningText}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDrhpSection(w.sectionId)}
                  className="text-xs font-bold text-amber-950 underline shrink-0 hover:text-primary"
                >
                  Fix Item →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="card p-6 bg-surface shadow-card space-y-4">
        <h3 className="text-sm font-bold text-primary border-b border-border pb-3">
          3. Export Options & Data Backup
        </h3>

        <div className="grid sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="p-4 rounded border border-border bg-background hover:bg-surface hover:border-accent transition text-left flex flex-col justify-between h-28"
          >
            <Download size={20} className="text-primary" />
            <div>
              <b className="text-xs font-bold text-slate-900 block">PDF Offer Document</b>
              <span className="text-[11px] text-muted">Formatted SEBI DRHP layout</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="p-4 rounded border border-border bg-background hover:bg-surface hover:border-accent transition text-left flex flex-col justify-between h-28"
          >
            <FileText size={20} className="text-secondary" />
            <div>
              <b className="text-xs font-bold text-slate-900 block">Export Draft Data (JSON)</b>
              <span className="text-[11px] text-muted">Backup raw form fields</span>
            </div>
          </button>

          <button
            type="button"
            onClick={resetFormData}
            className="p-4 rounded border border-border bg-background hover:bg-surface hover:border-danger transition text-left flex flex-col justify-between h-28"
          >
            <RotateCcw size={20} className="text-muted" />
            <div>
              <b className="text-xs font-bold text-slate-900 block">Reset Demo Data</b>
              <span className="text-[11px] text-muted">Clear local draft state</span>
            </div>
          </button>
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-[160] grid place-items-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-surface rounded-lg p-6 max-w-[460px] w-full shadow-2xl space-y-4 border border-border">
            <h3 className="text-base font-bold text-slate-900">Send Draft to Merchant Banker</h3>
            <p className="text-xs text-muted leading-relaxed">
              Your draft DRHP and complete provenance trails will be sent to your appointed Lead Manager (
              <b>{formData.leadManager}</b>) for statutory review and certification.
            </p>

            <div className="bg-background p-3 rounded border border-border text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted">Draft Completeness:</span>
                <b className="mono font-bold text-emerald-700">{validation.overallPercentage}%</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Target Platform:</span>
                <b className="font-bold text-slate-900">{formData.targetExchange} Emerge</b>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setShowSendModal(false)} className="btn btn-ghost flex-1 justify-center">
                Cancel
              </button>
              <button type="button" onClick={handleSendToBanker} className="btn btn-accent flex-1 justify-center">
                <Send size={15} /> Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
