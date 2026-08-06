import { HelpCircle, Sparkles, ArrowRight, Lightbulb } from 'lucide-react'
import { useStore } from '../store'

export default function ContextualHelpCard({
  title,
  description,
  termId,
  example,
}: {
  title: string
  description: string
  termId?: string
  example?: string
}) {
  const toggleGlossaryDrawer = useStore((s) => s.toggleGlossaryDrawer)
  const toggleAIDrawer = useStore((s) => s.toggleAIDrawer)

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-info-bg text-info grid place-items-center shrink-0 mt-0.5 border border-blue-200">
            <HelpCircle size={17} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
            <p className="text-xs text-slate-700 leading-relaxed mt-0.5 font-medium">{description}</p>

            {example && (
              <div className="mt-2 text-[11.5px] text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold not-italic text-slate-900">Example: </span>
                {example}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => toggleAIDrawer()}
            className="text-xs font-bold text-slate-900 bg-gold hover:bg-amber-400 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-xs"
            title="Ask AI to explain this component in detail"
          >
            <Sparkles size={13} /> Explain This
          </button>

          {termId && (
            <button
              onClick={() => toggleGlossaryDrawer(termId)}
              className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              Glossary <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
