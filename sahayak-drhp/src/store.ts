import { create } from 'zustand'
import { DRHPFormData, DRHPSectionId } from './types/drhp'
import { COMPANY, FINANCIALS, ISSUE, OBJECTS, CAP_TABLE, BOARD } from './data/mock'

export type Screen = 'landing' | 'ingest' | 'workspace'
export type StepId = 'base' | 'kyc' | 'eligibility' | 'synthesis' | 'gaps' | 'final'
export type RightPanelTab = 'preview' | 'explain' | 'checklist' | 'activity'

export type ChatMsg = {
  id: number
  role: 'ai' | 'user'
  text: string
  callout?: { kind: 'warn' | 'ok'; text: string }
  quicks?: string[]
}

const DEFAULT_FORM_DATA: DRHPFormData = {
  legalName: COMPANY.legalName,
  proposedName: COMPANY.proposedName,
  cin: COMPANY.cin,
  pan: COMPANY.pan,
  gstin: COMPANY.gstin,
  incorporatedDate: COMPANY.incorporated,
  rocOffice: COMPANY.roc,
  registeredAddress: COMPANY.regOffice,
  industrySector: COMPANY.sector,
  subSector: COMPANY.subSector,
  website: COMPANY.website,
  employeeCount: COMPANY.employees,

  businessModel: 'Asset-light D2C and quick-commerce health foods model operating across 4 states with leased automated manufacturing facility at Baner, Pune.',
  coreProducts: ['Millet-based organic snacks', 'Cold-pressed edible oils', 'Ready-to-cook healthy breakfast mixes'],
  keyStrengths: ['Omnichannel presence across 4,200+ outlets', 'Direct-to-consumer digital funnel with 38% repeat purchases', 'SEBI & FSSAI certified production standard'],
  growthStrategy: 'Expand quick-commerce dark-store coverage to 20 new tier-1 cities and introduce functional beverage line.',
  manufacturingLocation: 'Leased Facility, Sector 4, Baner, Pune, MH - 411045',
  targetCustomers: 'Health-conscious urban households, fitness enthusiasts, and quick-commerce shoppers.',

  fy23RevenueCr: +(FINANCIALS[2].revenue / 100).toFixed(2),
  fy23PatCr: +(FINANCIALS[2].pat / 100).toFixed(2),
  fy23EbitdaCr: +(FINANCIALS[2].ebitda / 100).toFixed(2),
  fy23NetWorthCr: +(FINANCIALS[2].netWorth / 100).toFixed(2),
  totalBorrowingsCr: 4.85,
  debtEquityRatio: '0.24x',
  ebitdaMargin: '14.8%',
  patMargin: '8.7%',

  promoters: [
    { name: 'Rajesh Satvik', age: 44, dinPan: 'DIN 08492019', stakePct: 42.5, role: 'Managing Director & Promoter' },
    { name: 'Sunita Satvik', age: 41, dinPan: 'DIN 08492022', stakePct: 24.0, role: 'Whole-time Director & Co-Promoter' },
  ],
  directors: [
    { name: 'Rajesh Satvik', din: '08492019', role: 'Managing Director', tenureYears: 7, status: 'Complete' },
    { name: 'Sunita Satvik', din: '08492022', role: 'Whole-time Director', tenureYears: 7, status: 'Complete' },
    { name: 'Aarav Mehta', din: '09124410', role: 'Non-Executive Independent Director', tenureYears: 2, status: 'Needs DIN' },
  ],

  risks: [
    {
      id: 'r1',
      title: 'Quick-commerce Channel Concentration',
      category: 'Internal',
      severity: 'High',
      description: 'Approximately 42% of revenue comes from two major quick-commerce distribution platforms. Termination or margin revision could impact profitability.',
      mitigation: 'Expanding direct D2C portal and regional modern trade retail partnerships across South India.',
    },
    {
      id: 'r2',
      title: 'Agricultural Raw Material Price Volatility',
      category: 'External',
      severity: 'Medium',
      description: 'Prices of raw millets and cold-pressed oilseeds fluctuate based on monsoon patterns and farm output.',
      mitigation: 'Entering into long-term contract farming arrangements with grower cooperatives in Maharashtra and Karnataka.',
    },
    {
      id: 'r3',
      title: 'Pending Indirect Tax Proceeding',
      category: 'Regulatory',
      severity: 'Low',
      description: 'An open GST dispute of ₹18.4 Lakh is pending before the Appellate Commissionerate, Pune.',
      mitigation: 'Legal opinion indicates high probability of favorable order; full provision kept in contingency reserve.',
    },
  ],

  litigations: [
    {
      id: 'l1',
      party: 'Company',
      type: 'Tax',
      amountLakh: 18.4,
      status: 'Pending Appeal',
      summary: 'GST input tax credit classification dispute for FY 2021-22 under Section 73 of CGST Act.',
    },
  ],

  issueType: ISSUE.type,
  totalIssueSizeCr: ISSUE.sizeCr,
  freshIssueCr: 24.0,
  ofsCr: 4.0,
  faceValue: ISSUE.faceValue,
  priceBand: ISSUE.priceBand,
  lotSize: ISSUE.lotSize,
  targetExchange: ISSUE.platform,
  leadManager: ISSUE.leadManager,
  registrar: ISSUE.registrar,
  objects: OBJECTS,
}

type State = {
  // Existing state fields (preserved 100%)
  screen: Screen
  step: StepId
  crawlDone: boolean
  chat: ChatMsg[]
  typing: boolean
  toast: string | null

  // Enhanced Phase 2 Shell & Design System features
  viewMode: 'journey' | 'drhp_builder'
  drhpSection: DRHPSectionId
  showPreviewPanel: boolean
  showGlossaryDrawer: boolean
  showAIDrawer: boolean
  leftSidebarCollapsed: boolean
  rightPanelCollapsed: boolean
  rightPanelTab: RightPanelTab
  glossaryFilterTerm: string | null
  searchQuery: string
  intermediaryMode: boolean
  saveStatus: 'saved' | 'saving' | 'dirty'
  lastSavedTime: string
  formData: DRHPFormData
  undoHistory: DRHPFormData[]
  recentActivities: string[]

  // Action methods
  goScreen: (s: Screen) => void
  goStep: (s: StepId) => void
  setCrawlDone: (b: boolean) => void
  pushChat: (m: Omit<ChatMsg, 'id'>) => void
  setTyping: (b: boolean) => void
  showToast: (t: string) => void

  // Shell action methods
  setViewMode: (m: 'journey' | 'drhp_builder') => void
  setDrhpSection: (sec: DRHPSectionId) => void
  toggleLeftSidebar: () => void
  toggleRightPanel: () => void
  setRightPanelTab: (t: RightPanelTab) => void
  togglePreviewPanel: () => void
  setShowPreviewPanel: (b: boolean) => void
  toggleGlossaryDrawer: (termId?: string) => void
  toggleAIDrawer: () => void
  setGlossaryFilterTerm: (term: string | null) => void
  setSearchQuery: (q: string) => void
  toggleIntermediaryMode: () => void
  updateFormData: (fieldOrPatch: Partial<DRHPFormData>) => void
  undoLastEdit: () => void
  resetFormData: () => void
  saveDraftToLocalStorage: () => void
}

let cid = 100

function loadSavedFormData(): DRHPFormData {
  try {
    const raw = localStorage.getItem('sahayak_drhp_draft_v1')
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...DEFAULT_FORM_DATA, ...parsed }
    }
  } catch (err) {
    console.warn('Failed to load saved DRHP draft', err)
  }
  return DEFAULT_FORM_DATA
}

export const useStore = create<State>((set, get) => ({
  screen: 'landing',
  step: 'base',
  crawlDone: false,
  chat: [],
  typing: false,
  toast: null,

  viewMode: 'journey',
  drhpSection: 'company',
  showPreviewPanel: false,
  showGlossaryDrawer: false,
  showAIDrawer: false,
  leftSidebarCollapsed: false,
  rightPanelCollapsed: false,
  rightPanelTab: 'explain',
  glossaryFilterTerm: null,
  searchQuery: '',
  intermediaryMode: false,
  saveStatus: 'saved',
  lastSavedTime: 'Just now',
  formData: loadSavedFormData(),
  undoHistory: [],
  recentActivities: ['Website data ingested', 'MCA CIN verified', 'Restated financials loaded'],

  goScreen: (s) => set({ screen: s }),
  goStep: (s) => set({ step: s }),
  setCrawlDone: (b) => set({ crawlDone: b }),
  pushChat: (m) => set((st) => ({ chat: [...st.chat, { ...m, id: cid++ }] })),
  setTyping: (b) => set({ typing: b }),
  showToast: (t) => {
    set({ toast: t })
    setTimeout(() => set((st) => (st.toast === t ? { toast: null } : {})), 3200)
  },

  setViewMode: (m) => set({ viewMode: m }),
  setDrhpSection: (sec) => set({ drhpSection: sec }),
  toggleLeftSidebar: () => set((st) => ({ leftSidebarCollapsed: !st.leftSidebarCollapsed })),
  toggleRightPanel: () => set((st) => ({ rightPanelCollapsed: !st.rightPanelCollapsed })),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab, rightPanelCollapsed: false }),
  togglePreviewPanel: () => set((st) => ({ showPreviewPanel: !st.showPreviewPanel })),
  setShowPreviewPanel: (b) => set({ showPreviewPanel: b }),
  toggleGlossaryDrawer: (termId) => set((st) => ({ 
    showGlossaryDrawer: termId ? true : !st.showGlossaryDrawer,
    glossaryFilterTerm: termId || null
  })),
  toggleAIDrawer: () => set((st) => ({ showAIDrawer: !st.showAIDrawer })),
  setGlossaryFilterTerm: (term) => set({ glossaryFilterTerm: term }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleIntermediaryMode: () => set((st) => {
    const next = !st.intermediaryMode
    get().showToast(next ? 'Switched to Intermediary Review Mode' : 'Switched to Promoter Drafting Mode')
    return { intermediaryMode: next }
  }),

  updateFormData: (patch) => {
    const current = get().formData
    const updated = { ...current, ...patch }
    const patchKeys = Object.keys(patch).join(', ')
    const activityText = `Updated field(s): ${patchKeys} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    set((st) => ({
      formData: updated,
      saveStatus: 'dirty',
      undoHistory: [current, ...st.undoHistory.slice(0, 9)],
      recentActivities: [activityText, ...st.recentActivities.slice(0, 4)],
    }))

    // Debounced local storage save
    setTimeout(() => {
      try {
        localStorage.setItem('sahayak_drhp_draft_v1', JSON.stringify(updated))
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        set({ saveStatus: 'saved', lastSavedTime: nowStr })
      } catch (e) {
        console.warn('Storage save failed', e)
      }
    }, 600)
  },

  undoLastEdit: () => {
    const { undoHistory } = get()
    if (undoHistory.length === 0) return
    const [previous, ...rest] = undoHistory
    set({
      formData: previous,
      undoHistory: rest,
      saveStatus: 'saved',
    })
    get().showToast('Undid last field change')
  },

  resetFormData: () => {
    localStorage.removeItem('sahayak_drhp_draft_v1')
    set({ formData: DEFAULT_FORM_DATA, saveStatus: 'saved', undoHistory: [] })
    get().showToast('Draft reset to sample data')
  },

  saveDraftToLocalStorage: () => {
    try {
      localStorage.setItem('sahayak_drhp_draft_v1', JSON.stringify(get().formData))
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      set({ saveStatus: 'saved', lastSavedTime: nowStr })
      get().showToast('Draft manually saved to browser storage')
    } catch (e) {
      get().showToast('Error saving draft locally')
    }
  },
}))
