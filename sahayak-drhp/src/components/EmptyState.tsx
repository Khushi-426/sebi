import { FileText, Plus } from 'lucide-react'

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="card p-8 text-center border-dashed my-4 bg-paper/50">
      <div className="w-12 h-12 rounded-2xl bg-white border border-line shadow-xs grid place-items-center mx-auto mb-3 text-muted">
        <FileText size={22} />
      </div>
      <h4 className="text-sm font-bold text-navy-900">{title}</h4>
      <p className="text-xs text-muted max-w-[420px] mx-auto mt-1 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-navy btn-sm mt-4 inline-flex items-center gap-1.5">
          <Plus size={14} /> {actionLabel}
        </button>
      )}
    </div>
  )
}
