import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download, Send, Check, FileCheck2, ShieldCheck, X, Landmark, Clock,
} from 'lucide-react'
import { useStore } from '../../store'
import { COMPANY, ISSUE, FINANCIALS, CAP_TABLE, OBJECTS, BOARD } from '../../data/mock'

const TOC = [
  ['cover', 'Cover Page'],
  ['risk', 'III · Risk Factors'],
  ['business', 'VI · Our Business'],
  ['fin', 'VII · Financial Information'],
  ['capital', 'VIII · Capital Structure'],
  ['objects', 'IX · Objects of the Issue'],
  ['mgmt', 'XII · Our Management'],
]

export default function FinalDRHP() {
  const showToast = useStore((s) => s.showToast)
  const [active, setActive] = useState('cover')
  const [sent, setSent] = useState(false)
  const [modal, setModal] = useState(false)

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(`drhp-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  function send() { setModal(false); setSent(true); showToast('Draft sent to Meridian Capital Advisors for certification') }

  return (
    <div className="max-w-none">
      <div className="chip bg-navy-900 text-gold-soft mb-3"><FileCheck2 size={13} /> Substantially complete draft</div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h2 className="text-[26px] tracking-[-0.02em] font-extrabold mb-1.5">Draft Red Herring Prospectus</h2>
          <p className="text-muted text-[15px] max-w-[520px]">Every figure below traces to a source document. Ready for your merchant banker to review and certify.</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => showToast('Downloaded DRHP draft (mock PDF)')} className="btn btn-ghost btn-sm"><Download size={15} /> Download</button>
          <button onClick={() => setModal(true)} disabled={sent} className="btn btn-gold btn-sm">
            {sent ? <><Check size={15} /> Sent to banker</> : <><Send size={15} /> Send to banker</>}
          </button>
        </div>
      </div>

      {/* certification status */}
      <div className="card p-4 mb-5 flex items-center gap-4 flex-wrap"
        style={{ background: sent ? 'linear-gradient(120deg,#e6f6ee,#fff)' : undefined }}>
        <div className="flex items-center gap-2.5">
          <span className={`w-9 h-9 rounded-xl grid place-items-center ${sent ? 'bg-ok text-white' : 'bg-navy-900 text-gold-soft'}`}>
            {sent ? <Check size={18} /> : <Clock size={17} />}
          </span>
          <div>
            <b className="text-[14px] block">{sent ? 'In merchant-banker review' : 'Awaiting your submission'}</b>
            <span className="text-[12.5px] text-muted">Lead manager · {ISSUE.leadManager}</span>
          </div>
        </div>
        <div className="h-8 w-px bg-line mx-2 hidden sm:block" />
        <div className="flex items-center gap-6 text-[12.5px] text-muted">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-ok" /> Human-in-loop certification</span>
          <span className="flex items-center gap-1.5"><Check size={14} className="text-ok" /> Provenance trail attached</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[210px_1fr] gap-5">
        {/* TOC */}
        <div className="lg:sticky lg:top-4 self-start card p-4 max-h-[calc(100vh-160px)] overflow-y-auto hidden lg:block">
          <div className="text-[11px] font-extrabold tracking-wide text-muted uppercase mb-2.5">Contents</div>
          {TOC.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`block w-full text-left text-[13px] px-2.5 py-2 rounded-lg leading-tight ${active === id ? 'bg-navy-900 text-white' : 'text-ink-2 hover:bg-paper'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* PAPER */}
        <div className="bg-white border border-line rounded-lg shadow-md2 overflow-hidden font-serif text-[#1a2334]">
          {/* cover */}
          <section id="drhp-cover" className="px-10 sm:px-14 py-12 text-center" style={{ background: 'linear-gradient(180deg,#fbfcfe,#fff)', borderBottom: '3px double #c9b688' }}>
            <div className="text-[11px] tracking-[0.24em] text-gold-deep font-bold uppercase font-sans">Draft Red Herring Prospectus</div>
            <h1 className="text-[30px] font-bold my-4 tracking-tight">{COMPANY.proposedName}</h1>
            <div className="text-[12.5px] text-muted font-sans">CIN: {COMPANY.cin} · Incorporated {COMPANY.incorporated} · {COMPANY.roc}</div>
            <div className="text-[12.5px] text-muted font-sans mt-1">Registered Office: {COMPANY.regOffice}</div>
            <div className="mt-5 max-w-[440px] mx-auto text-[12.5px] leading-relaxed font-sans text-ink-2">
              Initial Public Offering of Equity Shares of face value ₹{ISSUE.faceValue} each · {ISSUE.type} aggregating up to
              <b> ₹{ISSUE.sizeCr} crore</b> · Proposed listing on the <b>{ISSUE.platform}</b>.
            </div>
            <div className="mt-5 inline-block border-[1.5px] border-[#d4493f] text-[#d4493f] font-sans font-extrabold text-[12px] tracking-[0.12em] px-4 py-1.5 rounded" style={{ transform: 'rotate(-1deg)', opacity: 0.85 }}>
              DRAFT · FOR MERCHANT-BANKER CERTIFICATION
            </div>
            <div className="grid grid-cols-3 gap-3 mt-7 font-sans text-left">
              {[['Lead Manager', ISSUE.leadManager], ['Registrar', ISSUE.registrar], ['Market Maker', ISSUE.marketMaker]].map(([k, v]) => (
                <div key={k} className="bg-paper rounded-lg p-3 border border-line">
                  <div className="text-[10px] text-muted uppercase tracking-wide">{k}</div>
                  <div className="text-[12.5px] font-semibold mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="px-10 sm:px-14 py-8">
            {/* risk */}
            <Sec id="risk" no="III" title="Risk Factors">
              <p>Prospective investors should carefully consider the risks described below, together with the other information in this Draft Red Herring Prospectus, before making an investment decision.</p>
              <Risk t="Revenue concentration">A substantial portion of revenue is derived from the modern-trade and quick-commerce channels. Loss of a key distribution arrangement could adversely affect operations.</Risk>
              <Risk t="Promoter concentration">Post-issue, the Promoters will collectively hold approximately 52.4% of paid-up equity, enabling significant influence over matters requiring shareholder approval.</Risk>
              <Risk t="Regulatory & tax matters">The Company has a pending indirect-tax matter of ₹18.4 lakh under appeal. An adverse outcome, though not currently material, could result in additional liability. (Refer Section XI.)</Risk>
            </Sec>

            {/* business */}
            <Sec id="business" no="VI" title="Our Business">
              <p>{COMPANY.about}</p>
              <p>The Company operates an asset-light, brand-led model spanning its own D2C platform, quick-commerce partnerships and 4,200+ modern-trade outlets across western and southern India, supported by a leased manufacturing facility at Baner, Pune.</p>
              <ul className="list-disc ml-5 my-2">
                <li>Millet-based snacks and ready-to-cook health mixes</li>
                <li>Cold-pressed edible oils</li>
                <li>Own-brand distribution across 4 states and 14 quick-commerce cities</li>
              </ul>
            </Sec>

            {/* financials */}
            <Sec id="fin" no="VII" title="Financial Information (Restated Summary)">
              <p>The restated summary statements below are derived from the audited financial statements for FY21–FY23. Figures in ₹ lakh.</p>
              <table className="w-full border-collapse font-sans text-[13px] my-3">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">Particulars</th>
                    {FINANCIALS.map((f) => <th key={f.fy} className="text-right px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">{f.fy}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {([['Revenue from operations', 'revenue'], ['EBITDA', 'ebitda'], ['Profit after tax', 'pat'], ['Net worth', 'netWorth'], ['Net tangible assets', 'nta']] as const).map(([label, key], idx) => (
                    <tr key={label} className={idx === 2 ? 'font-bold' : ''}>
                      <td className={`text-left px-3 py-2 border-b border-[#e6eaf1] ${idx === 2 ? 'bg-[#fbfcfe]' : ''}`}>{label}</td>
                      {FINANCIALS.map((f) => (
                        <td key={f.fy} className={`text-right px-3 py-2 border-b border-[#e6eaf1] mono ${idx === 2 ? 'bg-[#fbfcfe]' : ''}`}>
                          {(f[key] as number).toLocaleString('en-IN')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[12.5px] text-muted font-sans">Revenue grew at a 49.2% CAGR over FY21–FY23 with PAT margin expanding to 8.7%.</p>
            </Sec>

            {/* capital */}
            <Sec id="capital" no="VIII" title="Capital Structure (Pre-Issue Shareholding)">
              <table className="w-full border-collapse font-sans text-[13px] my-3">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">Category of shareholder</th>
                    <th className="text-right px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">% holding</th>
                  </tr>
                </thead>
                <tbody>
                  {CAP_TABLE.map((c) => (
                    <tr key={c.holder}>
                      <td className="text-left px-3 py-2 border-b border-[#e6eaf1]">{c.holder} <span className="text-muted">· {c.role}</span></td>
                      <td className="text-right px-3 py-2 border-b border-[#e6eaf1] mono">{c.pct.toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="text-left px-3 py-2 bg-[#fbfcfe]">Total</td>
                    <td className="text-right px-3 py-2 bg-[#fbfcfe] mono">100.0%</td>
                  </tr>
                </tbody>
              </table>
            </Sec>

            {/* objects */}
            <Sec id="objects" no="IX" title="Objects of the Issue">
              <p>The net proceeds of the Fresh Issue are proposed to be deployed towards the following objects (₹ crore):</p>
              <table className="w-full border-collapse font-sans text-[13px] my-3">
                <tbody>
                  {OBJECTS.map((o) => (
                    <tr key={o.purpose}>
                      <td className="text-left px-3 py-2 border-b border-[#e6eaf1]">{o.purpose}</td>
                      <td className="text-right px-3 py-2 border-b border-[#e6eaf1] mono">{o.amtCr.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="text-left px-3 py-2 bg-[#fbfcfe]">Total</td>
                    <td className="text-right px-3 py-2 bg-[#fbfcfe] mono">{OBJECTS.reduce((a, o) => a + o.amtCr, 0).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </Sec>

            {/* management */}
            <Sec id="mgmt" no="XII" title="Our Management (Board of Directors)">
              <table className="w-full border-collapse font-sans text-[13px] my-3">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">Name</th>
                    <th className="text-left px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">Designation</th>
                    <th className="text-left px-3 py-2 bg-paper border-b-2 border-[#d9e0ec] font-bold text-ink-2">On board</th>
                  </tr>
                </thead>
                <tbody>
                  {BOARD.map((b) => (
                    <tr key={b.name}>
                      <td className="text-left px-3 py-2 border-b border-[#e6eaf1]">{b.name}</td>
                      <td className="text-left px-3 py-2 border-b border-[#e6eaf1]">{b.role}</td>
                      <td className="text-left px-3 py-2 border-b border-[#e6eaf1]">{b.tenure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[12.5px] text-muted font-sans">Note: DIN validation for one Independent Director is pending — flagged for certification.</p>
            </Sec>
          </div>
        </div>
      </div>

      {/* SEND MODAL */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-[150] grid place-items-center p-4" style={{ background: 'rgba(8,20,40,.55)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white rounded-2xl2 shadow-lg2 max-w-[460px] w-full p-7" style={{ borderRadius: 20 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl grid place-items-center bg-navy-900 text-gold-soft"><Landmark size={24} /></div>
                <button onClick={() => setModal(false)} className="text-muted hover:text-ink"><X size={20} /></button>
              </div>
              <h3 className="text-[20px] font-extrabold tracking-tight mb-1.5">Send draft for certification</h3>
              <p className="text-[14px] text-muted mb-4 leading-relaxed">
                The draft DRHP and its full provenance trail will be shared with your lead manager for
                due diligence and certification. Nothing is filed with SEBI or the exchange until they sign off.
              </p>
              <div className="card p-4 mb-4 bg-paper">
                <div className="flex justify-between text-[13px] py-1"><span className="text-muted">Recipient</span><b>{ISSUE.leadManager}</b></div>
                <div className="flex justify-between text-[13px] py-1"><span className="text-muted">Draft completeness</span><b className="text-ok">90% · 14 sections</b></div>
                <div className="flex justify-between text-[13px] py-1"><span className="text-muted">Open flags disclosed</span><b className="text-warn">5 items</b></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModal(false)} className="btn btn-ghost flex-1 justify-center">Cancel</button>
                <button onClick={send} className="btn btn-gold flex-1 justify-center"><Send size={16} /> Confirm & send</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Sec({ id, no, title, children }: { id: string; no: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`drhp-${id}`} className="py-5 border-b border-[#edf0f5] last:border-0 scroll-mt-4">
      <div className="text-[11px] font-sans font-bold tracking-wide text-gold-deep">SECTION {no}</div>
      <h3 className="text-[19px] text-navy-900 font-bold tracking-tight mb-1">{title}</h3>
      <div className="[&>p]:text-[14.5px] [&>p]:leading-[1.72] [&>p]:my-2.5 [&>p]:text-[#2a3547]">{children}</div>
    </section>
  )
}
function Risk({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#fdf8f0] border-l-[3px] border-gold px-4 py-3 my-2.5 rounded-r-lg">
      <b className="font-sans text-[13px] text-gold-deep block mb-0.5">{t}</b>
      <span className="text-[13.5px] leading-relaxed text-[#2a3547]">{children}</span>
    </div>
  )
}
