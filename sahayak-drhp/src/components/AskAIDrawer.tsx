import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, HelpCircle, BookOpen, ChevronRight, Check, Sparkles, MessageSquare,
  FileText, RotateCcw, ArrowRight, Lightbulb, ShieldCheck, AlertTriangle,
} from 'lucide-react'
import { useStore } from '../store'
import { DRHPSectionId } from '../types/drhp'

type AIResponseCard = {
  id: string
  question: string
  purpose?: string
  simpleDefinition: string
  bullets: string[]
  commonMistakes?: string[]
  glossaryTermId?: string
  sampleSnippet?: string
}

// Predefined mock knowledge bank per section
const SECTION_KNOWLEDGE: Record<string, {
  pageTitle: string
  purpose: string
  requiredInfo: string
  expectedOutcome: string
  commonErrors: string
  suggestedQuestions: Array<{ q: string; response: AIResponseCard }>
}> = {
  company: {
    pageTitle: 'Company Basics & Legal Identity',
    purpose: 'Establishes legal existence, incorporation details, and corporate identifiers under MCA regulations.',
    requiredInfo: 'Legal Name, CIN (21 digits), PAN, GSTIN, Date of Incorporation, Registered Office Address.',
    expectedOutcome: 'Section I of DRHP populated with verified Corporate Identity details.',
    commonErrors: 'Typo in 21-digit CIN, mismatched company name vs MCA Certificate of Incorporation.',
    suggestedQuestions: [
      {
        q: 'Explain Corporate Identity Number (CIN)',
        response: {
          id: 'q_cin',
          question: 'What is a Corporate Identity Number (CIN)?',
          simpleDefinition: 'A 21-digit alphanumeric code issued by the Ministry of Corporate Affairs (MCA) when your company is registered in India.',
          bullets: [
            'Format: U[Industry Code][State][Year][Type][Registration No].',
            'Appears on Page 1 of the DRHP and Section I Corporate Identity.',
            'Proves valid incorporation and RoC jurisdiction.',
          ],
          commonMistakes: ['Entering 20 or 22 digits instead of 21', 'Using LLP registration number instead of Pvt Ltd CIN'],
          glossaryTermId: 'cin',
          sampleSnippet: 'U15490MH2016PTC284912',
        },
      },
      {
        q: 'Why is Registered Office Address critical?',
        response: {
          id: 'q_reg_off',
          question: 'Why is Registered Office Address critical in DRHP?',
          simpleDefinition: 'Determines statutory jurisdiction of legal courts and RoC oversight for investor queries.',
          bullets: [
            'Must match official Form INC-22 filed with RoC.',
            'Discloses inspectability of corporate books to prospective investors.',
          ],
        },
      },
    ],
  },

  business: {
    pageTitle: 'Business Overview & Model',
    purpose: 'Explains how your SME operates, generates revenue, reaches customers, and maintains competitive advantages.',
    requiredInfo: 'Core Business Model, Primary Product Lines, Operational Facilities, Competitive Strengths, Growth Strategy.',
    expectedOutcome: 'Clear, plain-English Section VI description understandable to non-expert retail investors.',
    commonErrors: 'Using vague marketing jargon instead of concrete operational descriptions.',
    suggestedQuestions: [
      {
        q: 'How detailed should this section be?',
        response: {
          id: 'q_bus_detail',
          question: 'How detailed should the Business Overview be?',
          simpleDefinition: 'Detailed enough for a non-finance retail investor to understand your revenue engine in 2 minutes.',
          bullets: [
            'State primary products and revenue percentage contribution.',
            'Disclose manufacturing capacity, leased vs owned facilities.',
            'List 3-4 distinct competitive strengths backed by verifiable facts.',
          ],
          commonMistakes: ['Claiming unverified market leadership', 'Failing to explain distribution channels'],
        },
      },
      {
        q: 'Show a simple Business Description example',
        response: {
          id: 'q_bus_example',
          question: 'Sample SME Business Description',
          simpleDefinition: 'Satvik Foods operates an asset-light D2C health foods model spanning 4,200+ retail outlets across Maharashtra and Karnataka.',
          bullets: [
            'Products: Organic millet snacks, cold-pressed oils, ready-to-cook breakfast mixes.',
            'Distribution: 42% Quick-commerce, 35% Modern Trade, 23% Direct D2C website.',
            'Manufacturing: Leased automated facility in Baner, Pune (Capacity: 12,000 units/day).',
          ],
        },
      },
    ],
  },

  financials: {
    pageTitle: 'Financial Snapshot & Restated Financials',
    purpose: 'Presents audited financial performance for the past 3 fiscal years formatted per SEBI accounting policies.',
    requiredInfo: 'Restated Revenue, EBITDA, PAT, Net Worth, Borrowings, Debt-Equity Ratio, Operating Margins.',
    expectedOutcome: 'Standardized apples-to-apples financial metrics verified by a Peer-Reviewed CA.',
    commonErrors: 'Mismatch between narrative revenue figures and restated audit statement tables.',
    suggestedQuestions: [
      {
        q: 'Explain EBITDA and why investors check it',
        response: {
          id: 'q_ebitda',
          question: 'What is EBITDA and why do investors check it?',
          simpleDefinition: 'Earnings Before Interest, Tax, Depreciation, and Amortization — measures pure core operational cash flow.',
          bullets: [
            'EBITDA = Revenue minus Operating Cash Costs (excluding interest & tax).',
            'Removes distortion from heavy bank debt or tax write-offs.',
            'Enables direct peer comparison across SME companies.',
          ],
          glossaryTermId: 'ebitda',
          sampleSnippet: 'FY23 Revenue: ₹28.5 Cr · EBITDA: ₹4.2 Cr (14.8% Margin)',
        },
      },
      {
        q: 'What are Restated Financial Statements?',
        response: {
          id: 'q_restated',
          question: 'What are Restated Financial Statements?',
          simpleDefinition: 'Audited statements for 3 years re-compiled under uniform SEBI ICDR accounting policies.',
          bullets: [
            'Must be certified by a Peer-Reviewed Chartered Accountant.',
            'Adjusts past non-recurring expenses or tax reclassifications.',
          ],
          glossaryTermId: 'restated-financials',
        },
      },
    ],
  },

  promoters: {
    pageTitle: 'Promoters & Board of Directors',
    purpose: 'Discloses background, track record, equity stake, and DIN credentials of founders and board members.',
    requiredInfo: 'Promoter names, age, DIN/PAN, pre-issue stake %, Director roles, DIN allotment status.',
    expectedOutcome: 'Complete Section XII compliance establishing promoter governance credentials.',
    commonErrors: 'Unallotted DIN for Independent Directors or missing promoter group definitions.',
    suggestedQuestions: [
      {
        q: 'Who qualifies as a Promoter?',
        response: {
          id: 'q_promoter_def',
          question: 'Who qualifies as a Promoter under SEBI norms?',
          simpleDefinition: 'Founders, major shareholders holding management control, or entities named in Annual Returns.',
          bullets: [
            'Promoter holding minimum 20% post-issue capital is locked in for 3 years.',
            'Immediate relatives and group firms form the Promoter Group.',
          ],
          glossaryTermId: 'promoter-group',
        },
      },
    ],
  },

  risks: {
    pageTitle: 'Mandatory Risk Factors',
    purpose: 'Highlights internal operational hazards and external market threats to protect investors and promoters.',
    requiredInfo: 'Internal risks, supplier/channel dependencies, raw material volatility, regulatory matters.',
    expectedOutcome: 'Comprehensive Section III disclosures protecting all parties legally.',
    commonErrors: 'Failing to disclose major revenue channel concentration or pending tax demands.',
    suggestedQuestions: [
      {
        q: 'Explain Risk Factors & why SEBI requires them',
        response: {
          id: 'q_risk_why',
          question: 'Why are Risk Factors mandatory in a DRHP?',
          simpleDefinition: 'Provides full transparency so investors know potential business risks before investing.',
          bullets: [
            'Internal Risks: Operational, customer concentration, debt obligations.',
            'External Risks: Monsoon, raw material prices, government policy changes.',
            'Protects promoters legally against future shareholder non-disclosure lawsuits.',
          ],
        },
      },
      {
        q: 'Show sample Risk Disclosure with mitigation',
        response: {
          id: 'q_risk_sample',
          question: 'Sample Risk Factor Disclosure',
          simpleDefinition: 'Customer Concentration Risk: 42% of sales come from 2 quick-commerce platforms.',
          bullets: [
            'Potential Impact: Termination or margin cut by platform partners would affect quarterly profits.',
            'Mitigation: Expanding direct D2C portal and regional modern trade retail network across South India.',
          ],
        },
      },
    ],
  },

  litigation: {
    pageTitle: 'Litigation & Compliance Status',
    purpose: 'Discloses pending tax appeals, legal disputes, statutory clearances, and material proceedings.',
    requiredInfo: 'Tax dispute amounts, appeal stage, GST/PF clearances, material contract disputes.',
    expectedOutcome: 'Full legal transparency under Section XI.',
    commonErrors: 'Omitting open GST input-tax demand notices.',
    suggestedQuestions: [
      {
        q: 'What is Material Litigation for SMEs?',
        response: {
          id: 'q_lit_def',
          question: 'What is Material Litigation for SME IPOs?',
          simpleDefinition: 'Any open legal case, tax demand, or arbitration involving company or promoters.',
          bullets: [
            'Even small tax disputes (e.g. ₹15–20 Lakh GST demands) must be disclosed.',
            'Include legal counsel opinion on probable outcome.',
          ],
          glossaryTermId: 'material-litigation',
        },
      },
    ],
  },

  offer: {
    pageTitle: 'Offer Details & Objects of the Issue',
    purpose: 'Details total money to be raised, Fresh Issue vs OFS split, and itemized expenditure plans.',
    requiredInfo: 'Total Issue Size, Fresh Issue Cr, OFS Cr, Objects sum, Lead Manager & Registrar details.',
    expectedOutcome: 'Valid Section IX structure matching Fresh Issue proceeds exactly.',
    commonErrors: 'Objects sum not matching Net Fresh Issue amount.',
    suggestedQuestions: [
      {
        q: 'What are Objects of the Issue?',
        response: {
          id: 'q_obj_def',
          question: 'What are Objects of the Issue?',
          simpleDefinition: 'The exact planned uses for Fresh Issue money (e.g. machinery, factory setup, working capital).',
          bullets: [
            'SEBI mandates that funds cannot be diverted to unapproved uses.',
            'Objects sum must equal Fresh Issue amount.',
          ],
          glossaryTermId: 'objects',
          sampleSnippet: 'Plant Machinery: ₹12.5 Cr · Working Capital: ₹8.0 Cr · General Corp: ₹3.5 Cr',
        },
      },
      {
        q: 'Explain Fresh Issue vs Offer for Sale (OFS)',
        response: {
          id: 'q_ofs_fresh',
          question: 'Fresh Issue vs Offer for Sale (OFS)',
          simpleDefinition: 'Fresh Issue creates new shares (money stays in company). OFS sells promoter shares (money goes to promoters).',
          bullets: [
            'Investors prefer high Fresh Issue percentage because funds fund business expansion.',
          ],
          glossaryTermId: 'ofs',
        },
      },
    ],
  },

  review: {
    pageTitle: 'Review Workspace & Banker Readiness',
    purpose: 'Audits all 8 sections for mandatory compliance, gap highlights, and merchant banker review sign-off.',
    requiredInfo: 'Completeness check, gap resolution, PDF export, provenance trail packaging.',
    expectedOutcome: 'Certified-ready draft prospectus prepared for Lead Manager due diligence.',
    commonErrors: 'Submitting draft with unresolved high-severity consistency warnings.',
    suggestedQuestions: [
      {
        q: 'What happens after I send draft to banker?',
        response: {
          id: 'q_after_send',
          question: 'What happens after sending draft to Merchant Banker?',
          simpleDefinition: 'Your Lead Manager reviews the draft, performs statutory due diligence, and signs off.',
          bullets: [
            'Lead Manager attaches Due Diligence Certificate.',
            'Nothing is filed with SEBI or Stock Exchange until Lead Manager certifies.',
          ],
          glossaryTermId: 'lead-manager',
        },
      },
    ],
  },
}

export default function AskAIDrawer() {
  const {
    showAIDrawer,
    toggleAIDrawer,
    drhpSection,
    step,
    viewMode,
    formData,
    toggleGlossaryDrawer,
  } = useStore()

  const [chatHistory, setChatHistory] = useState<AIResponseCard[]>([])
  const [selectedCard, setSelectedCard] = useState<AIResponseCard | null>(null)

  const activeKey = viewMode === 'drhp_builder' ? drhpSection : 'company'
  const sectionKnowledge = SECTION_KNOWLEDGE[activeKey] || SECTION_KNOWLEDGE.company

  useEffect(() => {
    // Default open with page summary explanation when drawer opens
    if (showAIDrawer && chatHistory.length === 0) {
      const pageSummaryCard: AIResponseCard = {
        id: `summary_${activeKey}`,
        question: `Overview of ${sectionKnowledge.pageTitle}`,
        purpose: sectionKnowledge.purpose,
        simpleDefinition: `Required Info: ${sectionKnowledge.requiredInfo}`,
        bullets: [
          `Expected Outcome: ${sectionKnowledge.expectedOutcome}`,
          `Watch out for: ${sectionKnowledge.commonErrors}`,
        ],
      }
      setChatHistory([pageSummaryCard])
      setSelectedCard(pageSummaryCard)
    }
  }, [showAIDrawer, activeKey])

  if (!showAIDrawer) return null

  function askQuestion(card: AIResponseCard) {
    setSelectedCard(card)
    if (!chatHistory.some((c) => c.id === card.id)) {
      setChatHistory([card, ...chatHistory])
    }
  }

  function handleExplainThisPage() {
    const summaryCard: AIResponseCard = {
      id: `explain_page_${activeKey}_${Date.now()}`,
      question: `Page Summary: ${sectionKnowledge.pageTitle}`,
      purpose: sectionKnowledge.purpose,
      simpleDefinition: `Information Required: ${sectionKnowledge.requiredInfo}`,
      bullets: [
        `Expected Result: ${sectionKnowledge.expectedOutcome}`,
        `Common Mistake to Avoid: ${sectionKnowledge.commonErrors}`,
      ],
    }
    askQuestion(summaryCard)
  }

  function handleClearHistory() {
    setChatHistory([])
    setSelectedCard(null)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] overflow-hidden select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleAIDrawer()}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-[500px] bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200"
        >
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold-soft grid place-items-center shrink-0 border border-gold/30 mt-0.5">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-gold-soft uppercase tracking-wider mb-0.5">
                  Knowledge Assistant · Contextual Guidance
                </div>
                <h2 className="text-base font-bold text-white tracking-tight">Ask AI Guidance</h2>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  Page: <span className="text-white font-semibold">{sectionKnowledge.pageTitle}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleAIDrawer()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Current Page Context & Explain Page CTA */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Current Screen Context
              </span>
              <button
                onClick={handleExplainThisPage}
                className="btn btn-navy btn-sm inline-flex items-center gap-1"
              >
                <Lightbulb size={13} /> Summarize Screen
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {sectionKnowledge.purpose}
            </p>
          </div>

          {/* Suggested Question Chips */}
          <div className="p-4 bg-white border-b border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Suggested Questions for this Screen
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sectionKnowledge.suggestedQuestions.map((sq) => (
                <button
                  key={sq.q}
                  onClick={() => askQuestion(sq.response)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition text-left border ${
                    selectedCard?.id === sq.response.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-gold'
                  }`}
                >
                  {sq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Explanation Card Display */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {selectedCard ? (
              <div className="card p-5 bg-white space-y-4 border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-deep uppercase tracking-wider border-b border-slate-100 pb-2.5">
                  <BookOpen size={14} /> {selectedCard.question}
                </div>

                {selectedCard.purpose && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {selectedCard.purpose}
                  </p>
                )}

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Simple Explanation
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {selectedCard.simpleDefinition}
                  </p>
                </div>

                {selectedCard.bullets.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Key Takeaways
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedCard.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-[10px] font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCard.commonMistakes && selectedCard.commonMistakes.length > 0 && (
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs">
                    <span className="font-bold text-amber-900 uppercase tracking-wider block text-[10.5px] mb-1">
                      Common SME Mistakes to Avoid
                    </span>
                    <ul className="space-y-1 text-amber-950">
                      {selectedCard.commonMistakes.map((m, idx) => (
                        <li key={idx}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCard.glossaryTermId && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Need deeper regulatory definition?</span>
                    <button
                      onClick={() => toggleGlossaryDrawer(selectedCard.glossaryTermId)}
                      className="text-xs font-bold text-gold-deep hover:text-slate-900 flex items-center gap-1"
                    >
                      Open Glossary <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <HelpCircle size={36} className="mx-auto text-slate-300 mb-2" />
                <h4 className="text-sm font-bold text-slate-800">Select a question above</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Click any suggested question or "Summarize Screen" to view structured AI guidance.
                </p>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              onClick={handleClearHistory}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium"
            >
              <RotateCcw size={13} /> Clear History
            </button>
            <span className="text-slate-400">Frontend Mock Assistant</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
