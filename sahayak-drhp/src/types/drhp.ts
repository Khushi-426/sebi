export type DRHPSectionId = 
  | 'company'
  | 'business'
  | 'financials'
  | 'promoters'
  | 'risks'
  | 'litigation'
  | 'offer'
  | 'review'

export type DRHPSectionMeta = {
  id: DRHPSectionId
  number: string
  title: string
  plainLabel: string
  description: string
  iconName: string
  requiredCount: number
  filledCount: number
  status: 'done' | 'attention' | 'todo'
  warnings: string[]
}

export type GlossaryTerm = {
  id: string
  term: string
  category: 'Corporate' | 'Financial' | 'Capital Market' | 'Legal & Compliance'
  simpleDefinition: string
  example: string
  whyItMatters: string
}

export type RiskItem = {
  id: string
  title: string
  category: 'Internal' | 'External' | 'Financial' | 'Regulatory'
  severity: 'High' | 'Medium' | 'Low'
  description: string
  mitigation: string
}

export type LitigationItem = {
  id: string
  party: 'Company' | 'Promoter' | 'Director'
  type: 'Tax' | 'Civil' | 'Criminal' | 'Regulatory'
  amountLakh: number
  status: 'Pending Appeal' | 'Under Notice' | 'In Court'
  summary: string
}

export type DRHPFormData = {
  // Company Basics
  legalName: string
  proposedName: string
  cin: string
  pan: string
  gstin: string
  incorporatedDate: string
  rocOffice: string
  registeredAddress: string
  industrySector: string
  subSector: string
  website: string
  employeeCount: number

  // Business Overview
  businessModel: string
  coreProducts: string[]
  keyStrengths: string[]
  growthStrategy: string
  manufacturingLocation: string
  targetCustomers: string

  // Financial Snapshot
  fy23RevenueCr: number
  fy23PatCr: number
  fy23EbitdaCr: number
  fy23NetWorthCr: number
  totalBorrowingsCr: number
  debtEquityRatio: string
  ebitdaMargin: string
  patMargin: string

  // Promoters & Management
  promoters: Array<{ name: string; age: number; dinPan: string; stakePct: number; role: string }>
  directors: Array<{ name: string; din: string; role: string; tenureYears: number; status: 'Complete' | 'Needs DIN' }>

  // Risk Factors
  risks: RiskItem[]

  // Litigation
  litigations: LitigationItem[]

  // Offer Details
  issueType: string
  totalIssueSizeCr: number
  freshIssueCr: number
  ofsCr: number
  faceValue: number
  priceBand: string
  lotSize: number
  targetExchange: string
  leadManager: string
  registrar: string
  objects: Array<{ purpose: string; amtCr: number }>
}
