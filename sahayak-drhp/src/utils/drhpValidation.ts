import { DRHPFormData, DRHPSectionId, DRHPSectionMeta } from '../types/drhp'

export type CompletenessResult = {
  overallPercentage: number
  totalFields: number
  filledFields: number
  sectionMetas: Record<DRHPSectionId, DRHPSectionMeta>
  allWarnings: Array<{ sectionId: DRHPSectionId; fieldName: string; warningText: string; severity: 'high' | 'medium' | 'info' }>
  isReadyForIntermediary: boolean
}

export function validateDRHP(data: DRHPFormData): CompletenessResult {
  const warnings: CompletenessResult['allWarnings'] = []

  // 1. Company Basics
  let companyFilled = 0
  const companyTotal = 7
  if (data.legalName.trim()) companyFilled++
  if (data.cin.trim()) {
    companyFilled++
    if (data.cin.length !== 21) {
      warnings.push({ sectionId: 'company', fieldName: 'cin', warningText: 'CIN must be exactly 21 characters long.', severity: 'high' })
    }
  } else {
    warnings.push({ sectionId: 'company', fieldName: 'cin', warningText: 'Corporate Identity Number (CIN) is required.', severity: 'high' })
  }
  if (data.pan.trim()) {
    companyFilled++
    if (data.pan.length !== 10) {
      warnings.push({ sectionId: 'company', fieldName: 'pan', warningText: 'PAN must be 10 characters long.', severity: 'medium' })
    }
  }
  if (data.gstin.trim()) companyFilled++
  if (data.incorporatedDate.trim()) companyFilled++
  if (data.registeredAddress.trim()) companyFilled++
  if (data.industrySector.trim()) companyFilled++

  // 2. Business Overview
  let businessFilled = 0
  const businessTotal = 5
  if (data.businessModel.trim().length > 20) businessFilled++
  else warnings.push({ sectionId: 'business', fieldName: 'businessModel', warningText: 'Provide a comprehensive business model description (min 20 chars).', severity: 'medium' })
  
  if (data.coreProducts.length > 0) businessFilled++
  if (data.keyStrengths.length >= 2) businessFilled++
  else warnings.push({ sectionId: 'business', fieldName: 'keyStrengths', warningText: 'Listing at least 2 competitive strengths strengthens investor appeal.', severity: 'info' })
  
  if (data.growthStrategy.trim()) businessFilled++
  if (data.manufacturingLocation.trim()) businessFilled++

  // 3. Financial Snapshot
  let financialFilled = 0
  const financialTotal = 6
  if (data.fy23RevenueCr > 0) financialFilled++
  if (data.fy23PatCr > 0) financialFilled++
  if (data.fy23EbitdaCr > 0) financialFilled++
  if (data.fy23NetWorthCr > 0) financialFilled++
  if (data.totalBorrowingsCr >= 0) financialFilled++
  if (data.ebitdaMargin.trim()) financialFilled++

  if (data.fy23PatCr > data.fy23RevenueCr) {
    warnings.push({ sectionId: 'financials', fieldName: 'fy23PatCr', warningText: 'Inconsistent data: PAT cannot exceed total revenue.', severity: 'high' })
  }

  // 4. Promoters & Management
  let promotersFilled = 0
  const promotersTotal = 4
  if (data.promoters.length >= 1) promotersFilled++
  else warnings.push({ sectionId: 'promoters', fieldName: 'promoters', warningText: 'At least one promoter profile is mandatory.', severity: 'high' })

  const promotersWithValidDin = data.promoters.filter(p => p.dinPan.trim())
  if (promotersWithValidDin.length === data.promoters.length) promotersFilled++

  if (data.directors.length >= 3) promotersFilled++
  else warnings.push({ sectionId: 'promoters', fieldName: 'directors', warningText: 'SME Board should have at least 3 directors including an Independent Director.', severity: 'medium' })

  const directorNeedsDin = data.directors.filter(d => d.status === 'Needs DIN' || !d.din)
  if (directorNeedsDin.length === 0) promotersFilled++
  else warnings.push({ sectionId: 'promoters', fieldName: 'directors', warningText: `${directorNeedsDin.length} director(s) require DIN allotment before final DRHP filing.`, severity: 'medium' })

  // 5. Risk Factors
  let riskFilled = 0
  const riskTotal = 3
  const internalRisks = data.risks.filter(r => r.category === 'Internal')
  const externalRisks = data.risks.filter(r => r.category === 'External' || r.category === 'Regulatory')
  
  if (data.risks.length >= 3) riskFilled++
  else warnings.push({ sectionId: 'risks', fieldName: 'risks', warningText: 'SEBI requires detailed disclosure of top internal and external risk factors.', severity: 'high' })
  
  if (internalRisks.length >= 1) riskFilled++
  if (externalRisks.length >= 1) riskFilled++

  // 6. Litigation & Compliance
  let litigationFilled = 0
  const litigationTotal = 2
  if (data.litigations.length >= 0) litigationFilled++ // Disclosed list
  const pendingLitigation = data.litigations.filter(l => l.status === 'Pending Appeal' || l.status === 'In Court')
  if (pendingLitigation.length > 0) {
    warnings.push({ sectionId: 'litigation', fieldName: 'litigations', warningText: `${pendingLitigation.length} pending legal proceeding(s) disclosed for intermediary due diligence review.`, severity: 'info' })
  }
  litigationFilled++

  // 7. Offer Details
  let offerFilled = 0
  const offerTotal = 6
  if (data.totalIssueSizeCr > 0) offerFilled++
  if (data.freshIssueCr > 0) offerFilled++
  if (data.leadManager.trim()) offerFilled++
  if (data.registrar.trim()) offerFilled++
  if (data.targetExchange.trim()) offerFilled++

  const calculatedTotal = (data.freshIssueCr || 0) + (data.ofsCr || 0)
  if (Math.abs(calculatedTotal - data.totalIssueSizeCr) > 0.05) {
    warnings.push({
      sectionId: 'offer',
      fieldName: 'totalIssueSizeCr',
      warningText: `Inconsistent math: Fresh Issue (₹${data.freshIssueCr}Cr) + OFS (₹${data.ofsCr}Cr) = ₹${calculatedTotal.toFixed(2)}Cr, which does not match Total Issue Size (₹${data.totalIssueSizeCr}Cr).`,
      severity: 'high',
    })
  } else {
    offerFilled++
  }

  const objectsTotalSum = data.objects.reduce((sum, o) => sum + o.amtCr, 0)
  if (Math.abs(objectsTotalSum - data.freshIssueCr) > 0.05) {
    warnings.push({
      sectionId: 'offer',
      fieldName: 'objects',
      warningText: `Objects sum (₹${objectsTotalSum.toFixed(2)}Cr) must equal Net Fresh Issue proceeds (₹${data.freshIssueCr}Cr).`,
      severity: 'high',
    })
  }

  // 8. Review & Export
  const totalFields = companyTotal + businessTotal + financialTotal + promotersTotal + riskTotal + litigationTotal + offerTotal
  const filledFields = companyFilled + businessFilled + financialFilled + promotersFilled + riskFilled + litigationFilled + offerFilled
  const overallPercentage = Math.min(100, Math.round((filledFields / totalFields) * 100))

  const sectionMetas: Record<DRHPSectionId, DRHPSectionMeta> = {
    company: {
      id: 'company',
      number: 'I',
      title: 'Company Basics',
      plainLabel: '1. Corporate Basics & Registration',
      description: 'Legal entity name, CIN, incorporation details, registered office, and tax identifiers.',
      iconName: 'Building2',
      requiredCount: companyTotal,
      filledCount: companyFilled,
      status: companyFilled === companyTotal && !warnings.some(w => w.sectionId === 'company' && w.severity === 'high') ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'company').map(w => w.warningText),
    },
    business: {
      id: 'business',
      number: 'VI',
      title: 'Business Overview',
      plainLabel: '2. What Your Business Does',
      description: 'Core products, business model, operating facilities, target markets, and competitive strengths.',
      iconName: 'Briefcase',
      requiredCount: businessTotal,
      filledCount: businessFilled,
      status: businessFilled === businessTotal ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'business').map(w => w.warningText),
    },
    financials: {
      id: 'financials',
      number: 'VII',
      title: 'Financial Snapshot',
      plainLabel: '3. Financial Highlights (3-Year)',
      description: 'Restated revenue, operating profit (EBITDA), profit after tax (PAT), borrowings, and net worth.',
      iconName: 'Landmark',
      requiredCount: financialTotal,
      filledCount: financialFilled,
      status: financialFilled === financialTotal && !warnings.some(w => w.sectionId === 'financials' && w.severity === 'high') ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'financials').map(w => w.warningText),
    },
    promoters: {
      id: 'promoters',
      number: 'XII',
      title: 'Promoters & Management',
      plainLabel: '4. Founders & Board of Directors',
      description: 'Promoter background, shareholding percentage, Board composition, and Director Identification Numbers (DIN).',
      iconName: 'Users',
      requiredCount: promotersTotal,
      filledCount: promotersFilled,
      status: promotersFilled === promotersTotal ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'promoters').map(w => w.warningText),
    },
    risks: {
      id: 'risks',
      number: 'III',
      title: 'Risk Factors',
      plainLabel: '5. What Could Impact Your Business',
      description: 'Internal operational risks, raw material dependencies, regulatory risks, and mitigation strategies.',
      iconName: 'AlertTriangle',
      requiredCount: riskTotal,
      filledCount: riskFilled,
      status: riskFilled === riskTotal ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'risks').map(w => w.warningText),
    },
    litigation: {
      id: 'litigation',
      number: 'XI',
      title: 'Litigation & Compliance',
      plainLabel: '6. Legal & Tax Disclosures',
      description: 'Pending tax notices, court cases, statutory compliance certificates, and material contracts.',
      iconName: 'Scale',
      requiredCount: litigationTotal,
      filledCount: litigationFilled,
      status: 'done',
      warnings: warnings.filter(w => w.sectionId === 'litigation').map(w => w.warningText),
    },
    offer: {
      id: 'offer',
      number: 'IX',
      title: 'Offer Details & Objects',
      plainLabel: '7. Issue Size & Fund Usage',
      description: 'Total issue size, fresh issue vs OFS split, planned objects of funds, Lead Manager & Registrar details.',
      iconName: 'PieChart',
      requiredCount: offerTotal,
      filledCount: offerFilled,
      status: offerFilled === offerTotal && !warnings.some(w => w.sectionId === 'offer' && w.severity === 'high') ? 'done' : 'attention',
      warnings: warnings.filter(w => w.sectionId === 'offer').map(w => w.warningText),
    },
    review: {
      id: 'review',
      number: 'DRHP',
      title: 'Review & Export',
      plainLabel: '8. Final Review & Certification Ready',
      description: 'Complete audit checklist, gap analysis, formal document preview, and merchant banker review sign-off.',
      iconName: 'FileCheck2',
      requiredCount: 1,
      filledCount: overallPercentage >= 85 ? 1 : 0,
      status: overallPercentage >= 85 ? 'done' : 'attention',
      warnings: [],
    },
  }

  const highSeverityWarnings = warnings.filter(w => w.severity === 'high')
  const isReadyForIntermediary = overallPercentage >= 80 && highSeverityWarnings.length === 0

  return {
    overallPercentage,
    totalFields,
    filledFields,
    sectionMetas,
    allWarnings: warnings,
    isReadyForIntermediary,
  }
}
