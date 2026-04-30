import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

function normalizeOption(opt) {
  if (typeof opt === 'string') return { value: opt, label: opt }
  return opt
}

export default function FilterSection({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen)
  const normalized = options.map(normalizeOption)

  return (
    <section className="border-b border-slate-800 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-300 hover:text-white"
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {open && (
        <ul className="mt-2 space-y-1.5">
          {normalized.map(({ value, label }) => {
            const checked = selected.has(value)
            return (
              <li key={value}>
                <label className="group flex items-center gap-2 cursor-pointer text-sm text-slate-400 hover:text-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(value)}
                    className="accent-blue-600 h-3.5 w-3.5 cursor-pointer"
                  />
                  <span className={checked ? 'text-slate-200' : ''}>{label}</span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
