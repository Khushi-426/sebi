import { Check, AlertCircle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../store'
import { validateDRHP } from '../utils/drhpValidation'
import { DRHPSectionId } from '../types/drhp'

export default function ProgressSidebar() {
  const {
    drhpSection,
    setDrhpSection,
    viewMode,
    setViewMode,
    formData,
    leftSidebarCollapsed,
    toggleLeftSidebar,
  } = useStore()

  const validation = validateDRHP(formData)

  const stepsList: { id: DRHPSectionId; num: number; label: string; status: 'done' | 'pending' | 'warn' }[] = [
    { id: 'company', num: 1, label: 'Company Basics', status: validation.sectionMetas.company.status === 'done' ? 'done' : 'pending' },
    { id: 'business', num: 2, label: 'Business Overview', status: validation.sectionMetas.business.status === 'done' ? 'done' : 'pending' },
    { id: 'financials', num: 3, label: 'Financial Information', status: validation.sectionMetas.financials.status === 'done' ? 'done' : 'warn' },
    { id: 'promoters', num: 4, label: 'Promoters & Management', status: validation.sectionMetas.promoters.status === 'done' ? 'done' : 'pending' },
    { id: 'offer', num: 5, label: 'Capital Structure', status: 'pending' },
    { id: 'risks', num: 6, label: 'Risk Factors', status: validation.sectionMetas.risks.status === 'done' ? 'done' : 'pending' },
    { id: 'litigation', num: 7, label: 'Litigation & Compliance', status: validation.sectionMetas.litigation.status === 'done' ? 'done' : 'pending' },
    { id: 'offer', num: 8, label: 'Offer Details', status: validation.sectionMetas.offer.status === 'done' ? 'done' : 'pending' },
    { id: 'business', num: 9, label: 'Related Party Transactions', status: 'pending' },
    { id: 'business', num: 10, label: 'Material Contracts', status: 'pending' },
    { id: 'company', num: 11, label: 'Other Disclosures', status: 'pending' },
    { id: 'company', num: 12, label: 'Declarations', status: 'pending' },
    { id: 'review', num: 13, label: 'Review & Export', status: validation.sectionMetas.review.status === 'done' ? 'done' : 'pending' },
  ]

  if (leftSidebarCollapsed) {
    return (
      <aside className="w-12 bg-sidebar text-white flex flex-col items-center py-4 space-y-4 shrink-0 select-none z-20">
        <button
          onClick={toggleLeftSidebar}
          className="p-2 rounded-md hover:bg-sidebar-hover text-slate-300 transition"
          title="Expand Progress Sidebar (Alt+B)"
        >
          <ChevronRight size={18} />
        </button>

        <div className="w-6 h-px bg-slate-700" />

        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center mono">
          62%
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-[280px] bg-sidebar text-white flex flex-col h-full overflow-hidden shrink-0 select-none z-20">
      {/* Top Sidebar Header */}
      <div className="p-5 border-b border-slate-700/60 flex items-center justify-between">
        <h2 className="text-sm font-extrabold tracking-wide uppercase text-slate-200">
          Your Progress
        </h2>

        <button
          onClick={toggleLeftSidebar}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-sidebar-hover transition"
          title="Collapse Sidebar"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Progress Gauge Card */}
      <div className="p-5 border-b border-slate-700/60 text-center space-y-3">
        {/* SVG Semi-Circle Gauge */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#243047"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10B981"
              strokeWidth="10"
              strokeDasharray="251.2"
              strokeDashoffset="95"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white mono leading-none">62%</span>
            <span className="text-[10px] font-semibold text-slate-400 mt-1">Overall Completion</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>8 of 13 sections completed</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[62%]" />
          </div>
        </div>
      </div>

      {/* 13 Numbered Steps Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 pb-6 space-y-1 text-xs">
        {stepsList.map((st) => {
          const isActive = viewMode === 'drhp_builder' && drhpSection === st.id

          return (
            <button
              key={st.num}
              onClick={() => {
                setViewMode('drhp_builder')
                setDrhpSection(st.id)
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition ${
                isActive
                  ? 'bg-white text-sidebar font-bold shadow-md'
                  : 'text-slate-300 hover:bg-sidebar-hover'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-brand text-white'
                      : st.status === 'done'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : st.status === 'warn'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {st.num}
                </span>
                <span className="truncate">{st.label}</span>
              </div>

              {st.status === 'done' ? (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : st.status === 'warn' ? (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 font-bold text-[9px]">
                  !
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Bottom Disclaimer Card */}
      <div className="p-4 bg-sidebar-dark border-t border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-2 shrink-0">
        <div className="flex items-start gap-2">
          <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <b className="text-slate-200 block text-[11.5px] font-bold">This is a draft workspace</b>
            <span>It must be reviewed and certified by authorised intermediaries before any regulatory submission.</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
