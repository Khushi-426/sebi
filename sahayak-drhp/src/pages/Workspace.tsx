import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import HeaderNav from '../components/HeaderNav'
import ProgressSidebar from '../components/ProgressSidebar'
import RightContextPanel from '../components/RightContextPanel'
import GlossaryDrawer from '../components/GlossaryDrawer'
import AskAIDrawer from '../components/AskAIDrawer'
import DraftPreviewPanel from '../components/DraftPreviewPanel'
import IntermediaryBanner from '../components/IntermediaryBanner'
import VisualTimeline from '../components/VisualTimeline'

// Existing 6 Journey Step Pages (Preserved 100%)
import CompanyBase from './steps/CompanyBase'
import KYC from './steps/KYC'
import Eligibility from './steps/Eligibility'
import Synthesis from './steps/Synthesis'
import Gaps from './steps/Gaps'
import FinalDRHP from './steps/FinalDRHP'

// Enhanced 8 DRHP Section Wizard Forms
import CompanyBasicsForm from './steps/CompanyBasicsForm'
import BusinessOverviewForm from './steps/BusinessOverviewForm'
import FinancialSnapshotForm from './steps/FinancialSnapshotForm'
import PromotersManagementForm from './steps/PromotersManagementForm'
import RiskFactorsForm from './steps/RiskFactorsForm'
import LitigationComplianceForm from './steps/LitigationComplianceForm'
import OfferDetailsForm from './steps/OfferDetailsForm'
import ReviewExportWorkspace from './steps/ReviewExportWorkspace'

export default function Workspace() {
  const {
    viewMode,
    drhpSection,
    step,
    toggleAIDrawer,
    togglePreviewPanel,
    toggleGlossaryDrawer,
    leftSidebarCollapsed,
    rightPanelCollapsed,
  } = useStore()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, drhpSection, viewMode])

  // Global Keyboard Shortcuts (Alt+A for Ask AI, Alt+P for Preview, Alt+G for Glossary)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        toggleAIDrawer()
      } else if (e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        togglePreviewPanel()
      } else if (e.altKey && e.key.toLowerCase() === 'g') {
        e.preventDefault()
        toggleGlossaryDrawer()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleAIDrawer, togglePreviewPanel, toggleGlossaryDrawer])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-text select-none">
      {/* Top Header Navigation */}
      <HeaderNav />

      {/* Main Responsive Shell Grid */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column: VS Code Explorer-Style Sidebar */}
        <ProgressSidebar />

        {/* Middle Column: Main Form & Journey Workspace */}
        <main ref={mainRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-background">
          <div className="max-w-[920px] mx-auto space-y-6">
            {/* Intermediary Mode Notice Banner */}
            <IntermediaryBanner />

            {/* Visual Document Drafting Journey Timeline */}
            <VisualTimeline />

            {/* Step / Section Form Renderer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode === 'drhp_builder' ? drhpSection : step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {viewMode === 'drhp_builder' ? (
                  <>
                    {drhpSection === 'company' && <CompanyBasicsForm />}
                    {drhpSection === 'business' && <BusinessOverviewForm />}
                    {drhpSection === 'financials' && <FinancialSnapshotForm />}
                    {drhpSection === 'promoters' && <PromotersManagementForm />}
                    {drhpSection === 'risks' && <RiskFactorsForm />}
                    {drhpSection === 'litigation' && <LitigationComplianceForm />}
                    {drhpSection === 'offer' && <OfferDetailsForm />}
                    {drhpSection === 'review' && <ReviewExportWorkspace />}
                  </>
                ) : (
                  <>
                    {step === 'base' && <CompanyBase />}
                    {step === 'kyc' && <KYC />}
                    {step === 'eligibility' && <Eligibility />}
                    {step === 'synthesis' && <Synthesis />}
                    {step === 'gaps' && <Gaps />}
                    {step === 'final' && <FinalDRHP />}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right Column: Single-Tab Context Panel */}
        <RightContextPanel />
      </div>

      {/* Slide-over Contextual Ask AI Knowledge Drawer */}
      <AskAIDrawer />

      {/* Slide-over Live DRHP Document Preview Drawer */}
      <DraftPreviewPanel />

      {/* Slide-over SME IPO Glossary Drawer ("Help Me Understand") */}
      <GlossaryDrawer />
    </div>
  )
}
