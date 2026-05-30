export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="font-semibold text-lg">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}