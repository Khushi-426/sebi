import { useState } from 'react'
import { X, Search, HelpCircle, Sparkles, BookOpen } from 'lucide-react'
import { useStore } from '../store'
import { GLOSSARY_TERMS } from '../data/glossary'

export default function GlossaryDrawer() {
  const { showGlossaryDrawer, toggleGlossaryDrawer, glossaryFilterTerm, toggleAIDrawer } = useStore()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  if (!showGlossaryDrawer) return null

  const categories = [
    'All',
    'Corporate',
    'Financial',
    'Capital Market',
    'Legal & Compliance',
  ]

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch =
      query.trim() === '' ||
      item.term.toLowerCase().includes(query.toLowerCase()) ||
      item.simpleDefinition.toLowerCase().includes(query.toLowerCase())
    const matchesFilterTerm = !glossaryFilterTerm || item.id === glossaryFilterTerm
    return matchesCat && matchesSearch && matchesFilterTerm
  })

  return (
    <div className="fixed inset-0 z-[160] flex justify-end bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-[480px] bg-white flex flex-col h-full shadow-2xl border-l border-border animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-accent" />
            <div>
              <h2 className="text-sm font-bold text-white">SME Capital Markets Glossary</h2>
              <span className="text-[11px] text-slate-300">Plain-Language SEBI Terminology</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleGlossaryDrawer()}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Close Glossary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 bg-surface border-b border-border space-y-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SME IPO terms (e.g. EBITDA, CIN, OFS)..."
              className="w-full bg-background border border-border rounded-md text-xs pl-8 pr-3 py-1.5 text-text outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap transition ${
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-background text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-10 text-muted space-y-1">
              <HelpCircle size={28} className="mx-auto text-slate-400" />
              <p className="font-semibold text-slate-700">No matching capital market terms found.</p>
              <span className="text-[11px]">Try clearing your search query or selecting 'All' categories.</span>
            </div>
          ) : (
            filteredTerms.map((t) => (
              <div key={t.id} className="card p-3.5 bg-surface border-border space-y-2">
                <div className="flex items-center justify-between">
                  <b className="text-xs font-bold text-slate-900">{t.term}</b>
                  <span className="chip bg-primary/10 text-primary text-[10.5px]">
                    {t.category}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed font-medium">{t.simpleDefinition}</p>

                {t.example && (
                  <div className="text-[11px] text-slate-600 bg-background p-2.5 rounded border border-border italic">
                    <span className="font-semibold not-italic text-slate-900">Example: </span>
                    {t.example}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Guidance */}
        <div className="p-3 bg-surface border-t border-border flex items-center justify-between text-xs text-muted">
          <span>Confused about a field?</span>
          <button
            type="button"
            onClick={() => {
              toggleGlossaryDrawer()
              toggleAIDrawer()
            }}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <Sparkles size={13} className="text-accent" /> Ask Sahayak Assistant
          </button>
        </div>
      </div>
    </div>
  )
}
