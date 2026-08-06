import { useState } from 'react'
import {
  Building2, Check, Calendar, ArrowRight, ArrowLeft, Lightbulb, ChevronRight,
} from 'lucide-react'
import { useStore } from '../../store'

export default function CompanyBasicsForm() {
  const {
    formData,
    updateFormData,
    setDrhpSection,
    showToast,
    toggleAIDrawer,
    lastSavedTime,
  } = useStore()

  const [companyEmail, setCompanyEmail] = useState('info@sunriseglobal.com')
  const [telephoneNo, setTelephoneNo] = useState('020-4123 4567')

  return (
    <div className="space-y-6 text-slate-900 pb-16 select-none">
      {/* Top Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Step Number Circle */}
          <div className="w-10 h-10 rounded-full bg-brand/10 text-brand font-black text-lg flex items-center justify-center shrink-0 mt-0.5 border border-brand/20">
            1
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Company Basics
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tell us the fundamental details about your company.
            </p>
          </div>
        </div>

        {/* Section Guide Trigger Button */}
        <button
          onClick={() => toggleAIDrawer()}
          className="btn btn-ghost btn-sm text-xs font-semibold text-brand bg-brand-light border-brand/20 hover:bg-brand-light/80 flex items-center gap-1.5 px-3 py-2 rounded-lg"
        >
          <Lightbulb size={16} className="text-brand" />
          <span>Section Guide</span>
        </button>
      </div>

      {/* SECTION CARD 1.1: Corporate Identity */}
      <div className="card p-6 space-y-5 bg-surface shadow-card border-slate-200/80 rounded-xl">
        <div>
          <h3 className="text-base font-bold text-slate-950">
            1.1 Corporate Identity
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            All fields marked <span className="text-danger font-bold">*</span> are mandatory
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label htmlFor="legalName" className="block text-xs font-bold text-slate-700 mb-1">
              Company Name <span className="text-danger">*</span>
            </label>
            <input
              id="legalName"
              type="text"
              value={formData.legalName || 'Sunrise Global Solutions Private Limited'}
              onChange={(e) => updateFormData({ legalName: e.target.value })}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition font-medium"
            />
          </div>

          {/* Company Email */}
          <div>
            <label htmlFor="companyEmail" className="block text-xs font-bold text-slate-700 mb-1">
              Company Email <span className="text-danger">*</span>
            </label>
            <input
              id="companyEmail"
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition font-medium"
            />
          </div>

          {/* CIN */}
          <div>
            <label htmlFor="cin" className="block text-xs font-bold text-slate-700 mb-1">
              CIN <span className="text-danger">*</span>
            </label>
            <input
              id="cin"
              type="text"
              value={formData.cin || 'U72900PN2015PTC154321'}
              onChange={(e) => updateFormData({ cin: e.target.value.toUpperCase() })}
              maxLength={21}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 mono font-bold outline-none focus:ring-2 focus:ring-brand/40 transition"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-xs font-bold text-slate-700 mb-1">
              Website
            </label>
            <input
              id="website"
              type="text"
              value={formData.website || 'https://www.sunriseglobal.com'}
              onChange={(e) => updateFormData({ website: e.target.value })}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition"
            />
          </div>

          {/* Date of Incorporation */}
          <div>
            <label htmlFor="incorporatedDate" className="block text-xs font-bold text-slate-700 mb-1">
              Date of Incorporation <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <input
                id="incorporatedDate"
                type="text"
                value={formData.incorporatedDate || '12/03/2015'}
                onChange={(e) => updateFormData({ incorporatedDate: e.target.value })}
                className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition font-medium"
              />
              <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Telephone No. */}
          <div>
            <label htmlFor="telephoneNo" className="block text-xs font-bold text-slate-700 mb-1">
              Telephone No. <span className="text-danger">*</span>
            </label>
            <input
              id="telephoneNo"
              type="text"
              value={telephoneNo}
              onChange={(e) => setTelephoneNo(e.target.value)}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition font-medium"
            />
          </div>

          {/* Registered Office Address */}
          <div>
            <label htmlFor="registeredAddress" className="block text-xs font-bold text-slate-700 mb-1">
              Registered Office Address <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <textarea
                id="registeredAddress"
                rows={3}
                value={formData.registeredAddress || 'Unit No. 501, 5th Floor, West Tower, Business Bay, Pune, Maharashtra - 411001'}
                onChange={(e) => updateFormData({ registeredAddress: e.target.value })}
                className="w-full bg-surface border border-slate-300 rounded-lg text-xs p-3.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 transition leading-relaxed font-medium"
              />
              <span className="absolute right-3 bottom-2 text-[10.5px] font-mono text-slate-400">
                {formData.registeredAddress?.length || 79}/200
              </span>
            </div>
          </div>

          {/* PAN */}
          <div>
            <label htmlFor="pan" className="block text-xs font-bold text-slate-700 mb-1">
              PAN <span className="text-danger">*</span>
            </label>
            <input
              id="pan"
              type="text"
              value={formData.pan || 'AABCS1234D'}
              onChange={(e) => updateFormData({ pan: e.target.value.toUpperCase() })}
              maxLength={10}
              className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 mono font-bold outline-none focus:ring-2 focus:ring-brand/40 transition"
            />
          </div>
        </div>
      </div>

      {/* SECTION CARD 1.2: Country of Incorporation */}
      <div className="card p-6 space-y-4 bg-surface shadow-card border-slate-200/80 rounded-xl">
        <h3 className="text-base font-bold text-slate-950">
          1.2 Country of Incorporation
        </h3>

        <div>
          <select
            id="country"
            className="w-full bg-surface border border-slate-300 rounded-lg text-xs px-3.5 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-brand/40 font-medium"
          >
            <option value="India">India</option>
          </select>
        </div>
      </div>

      {/* Bottom Sticky Footer Action Bar */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 bg-surface px-4 py-3 rounded-xl shadow-xs border">
        <button
          onClick={() => showToast('First section')}
          className="btn btn-ghost btn-sm text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={16} /> Previous
        </button>

        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
          <Check size={14} className="text-emerald-600 stroke-[3]" /> All changes saved
        </span>

        <button
          onClick={() => {
            showToast('Saved Company Basics')
            setDrhpSection('business')
          }}
          className="btn btn-navy btn-sm text-xs font-bold text-white bg-sidebar hover:bg-sidebar-hover flex items-center gap-1.5 px-5 py-2 rounded-lg shadow-xs"
        >
          Save & Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
