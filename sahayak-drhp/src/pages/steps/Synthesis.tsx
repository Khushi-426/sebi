import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, GitMerge, AlertTriangle, Check, FileText, Layers, Grid3x3 } from 'lucide-react'
import { useStore } from '../../store'
import { Ring } from '../../components/ui'
import { SECTIONS, DOCS } from '../../data/mock'

const docName = (id: string) => DOCS.find((d) => d.id === id)!.short

export default function Synthesis() {
  const goStep = useStore((s) => s.goStep)
  const showToast = useStore((s) => s.showToast)
  const [tab, setTab] = useState<'sections' | 'matrix'>('sections')

  const avg = Math.round(SECTIONS.reduce((a, s) => a + s.complete, 0) / SECTIONS.length)
  const flagged = SECTIONS.filter((s) => s.flags.length).length

  return (
    <div>
      <div className="chip bg-navy-900 text-gold-soft mb-3"><GitMerge size={13} /> Document synthesis engine</div>
      <h2 className="text-[26px] tracking-[-0.02em] font-extrabold mb-1.5">DRHP Synthesis</h2>
      <p className="text-muted text-[15px] mb-6 max-w-[580px]">
        The offer document is a synthesis of many sources — one document feeds several sections, one
        section pulls from several documents. Here’s that mapping, built for you.
      </p>

      {/* overview banner */}
      <div className="flex items-center gap-6 rounded-[14px] px-7 py-5 text-[#eaf0fb] mb-5 shadow-md2"
        style={{ background: 'linear-gradient(120deg,#0b1e3f,#0f2a54)' }}>
        <Ring value={avg} size={72} stroke={7} color="#d4af5f" track="rgba(255,255,255,.15)" />
        <div className="flex-1">
          <h3 className="text-[18px] text-white font-bold mb-1">Draft is {avg}% complete</h3>
          <p className="text-[#adbfdd] text-[13.5px] max-w-[440px]">14 sections synthesised from 8 source documents. {flagged} sections have gaps flagged for review.</p>
        </div>
        <div className="flex gap-6 text-center shrink-0">
          <div><b className="text-[22px] text-white block mono">14</b><span className="text-[11.5px] text-[#93a6c6]">Sections</span></div>
          <div><b className="text-[22px] text-white block mono">8</b><span className="text-[11.5px] text-[#93a6c6]">Sources</span></div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="inline-flex bg-white border border-line rounded-xl p-1 shadow-sm2">
          <button onClick={() => setTab('sections')} className={`px-4 py-2 text-[13.5px] font-semibold rounded-lg flex items-center gap-1.5 ${tab === 'sections' ? 'bg-navy-900 text-white' : 'text-muted'}`}>
            <Layers size={15} /> Sections
          </button>
          <button onClick={() => setTab('matrix')} className={`px-4 py-2 text-[13.5px] font-semibold rounded-lg flex items-center gap-1.5 ${tab === 'matrix' ? 'bg-navy-900 text-white' : 'text-muted'}`}>
            <Grid3x3 size={15} /> Provenance map
          </button>
        </div>
        <span className="text-[12.5px] text-muted">{tab === 'sections' ? 'Click a section to see how it was built' : 'Which document feeds which section'}</span>
      </div>

      {/* ---- SECTIONS ---- */}
      {tab === 'sections' && (
        <div>
          {SECTIONS.map((s, i) => (
            <motion.button key={s.no} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}
              onClick={() => showToast(`Opening “${s.title}” — sources: ${s.sources.map(docName).join(', ')}`)}
              className="w-full flex items-center gap-4 px-5 py-4 card mb-2.5 hover:shadow-md2 hover:-translate-y-px transition text-left">
              <span className="text-[12px] font-extrabold text-muted w-6 shrink-0 mono">{s.no}</span>
              <div className="flex-1 min-w-0">
                <b className="text-[15.5px] block mb-1.5">{s.title}</b>
                <div className="flex gap-1.5 flex-wrap items-center">
                  {s.sources.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 text-[11px] font-semibold text-info bg-info-bg px-2 py-0.5 rounded-md">
                      <FileText size={10} /> {docName(d)}
                    </span>
                  ))}
                  {s.flags.map((f) => (
                    <span key={f.text} className="inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-md"
                      style={{ color: f.type === 'inconsistency' ? '#b23428' : '#a5651a', background: f.type === 'inconsistency' ? '#fbe9e7' : '#fdf3e2' }}>
                      <AlertTriangle size={11} /> {f.text}
                    </span>
                  ))}
                </div>
              </div>
              <Ring value={s.complete} size={46} stroke={5}
                color={s.complete === 100 ? '#159a62' : s.complete >= 85 ? '#d4af5f' : '#d9902a'} />
            </motion.button>
          ))}
        </div>
      )}

      {/* ---- MATRIX ---- */}
      {tab === 'matrix' && (
        <div className="overflow-x-auto card">
          <table className="border-collapse w-full text-[12.5px]" style={{ minWidth: 780 }}>
            <thead>
              <tr>
                <th className="text-left font-bold text-ink-2 px-3 py-2.5 bg-paper sticky left-0 z-10">Source document ↓ / Section →</th>
                {SECTIONS.map((s) => <th key={s.no} className="px-2 py-2.5 bg-paper font-bold text-ink-2 whitespace-nowrap">{s.no}</th>)}
              </tr>
            </thead>
            <tbody>
              {DOCS.map((d) => (
                <tr key={d.id}>
                  <td className="text-left font-semibold text-ink px-3 py-2.5 whitespace-nowrap sticky left-0 bg-white z-10 border-r border-line">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-navy-900 text-gold-soft grid place-items-center text-[9px] font-extrabold">{d.id}</span>
                      {d.short}
                    </span>
                  </td>
                  {SECTIONS.map((s) => (
                    <td key={s.no} className="px-2 py-2.5 text-center border-b border-line">
                      {s.sources.includes(d.id) ? (
                        <span className="inline-grid place-items-center w-[18px] h-[18px] rounded-[5px] bg-navy-900 mx-auto"><Check size={11} className="text-gold-soft" /></span>
                      ) : <span className="text-line">·</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center flex-wrap gap-3 border-t border-line pt-6 mt-6">
        <div className="text-[13.5px] text-muted max-w-[430px]">
          Sections are drafted. Next, review everything we flagged before it reaches your banker.
        </div>
        <button onClick={() => goStep('gaps')} className="btn btn-gold btn-lg">Review gaps <ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
