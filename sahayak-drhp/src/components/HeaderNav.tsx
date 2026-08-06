import { useState } from 'react'
import { HelpCircle, Bell, ChevronDown, Check, ArrowLeft } from 'lucide-react'
import { useStore } from '../store'

export default function HeaderNav() {
  const {
    goScreen,
    formData,
    saveStatus,
    lastSavedTime,
    toggleGlossaryDrawer,
    toggleAIDrawer,
    intermediaryMode,
    toggleIntermediaryMode,
  } = useStore()

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-surface text-slate-900 border-b border-border shadow-xs select-none">
      <div className="px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Left: Brand & Hexagonal Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => goScreen('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="Return to Home"
          >
            {/* Hexagonal Blue Brand Logo Icon */}
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white shadow-xs group-hover:bg-brand-dark transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-base font-black tracking-tight text-slate-950">SAHAYAK</span>
              </div>
              <p className="text-[10.5px] font-semibold text-slate-500 tracking-tight">
                SME IPO Document Assistant
              </p>
            </div>
          </button>
        </div>

        {/* Center: Draft Name & Live Save Status Pill */}
        <div className="hidden lg:flex items-center gap-3 mx-auto">
          <div className="text-xs font-medium text-slate-700">
            <span className="text-slate-500 font-semibold">Draft Name: </span>
            <b className="text-slate-900 font-bold">{formData.proposedName || 'Sunrise Global Solutions – DRHP Draft'}</b>
          </div>

          <span className="chip bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center gap-1.5 py-1 px-2.5 rounded-full">
            <Check size={12} className="text-emerald-600 stroke-[3]" />
            <span>Saved {lastSavedTime || 'a few seconds ago'}</span>
          </span>
        </div>

        {/* Right Controls: Need Help?, Bell, Profile Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Need Help? Button */}
          <button
            onClick={() => toggleAIDrawer()}
            className="btn btn-ghost btn-sm text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          >
            <HelpCircle size={15} className="text-slate-500" />
            <span>Need Help?</span>
          </button>

          {/* Bell Notification Icon */}
          <button
            onClick={() => toggleGlossaryDrawer()}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Notifications & Glossary"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand" />
          </button>

          {/* User Profile Avatar Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition"
            >
              <div className="w-8 h-8 rounded-full bg-sidebar text-white font-bold text-xs flex items-center justify-center">
                AR
              </div>
              <div className="text-left text-xs hidden sm:block">
                <b className="block text-slate-900 text-[11.5px] leading-tight font-bold">Amit R.</b>
                <span className="text-[10px] text-slate-500 leading-tight block">Promoter</span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface text-slate-900 rounded-lg shadow-xl border border-border p-2 z-50 text-xs space-y-1">
                <button
                  onClick={() => {
                    toggleIntermediaryMode()
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 font-medium"
                >
                  Mode: <b>{intermediaryMode ? 'Intermediary Review' : 'Promoter Drafting'}</b>
                </button>
                <button
                  onClick={() => {
                    goScreen('landing')
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 font-medium text-danger"
                >
                  Exit Workspace
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
