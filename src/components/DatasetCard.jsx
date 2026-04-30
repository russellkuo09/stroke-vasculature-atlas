import { ExternalLink } from 'lucide-react'

const MODEL_BADGE = {
  'tMCAO': 'bg-blue-900/40 text-blue-200',
  'pMCAO': 'bg-orange-900/40 text-orange-200',
  'dMCAO': 'bg-purple-900/40 text-purple-200',
  'ICH': 'bg-red-900/40 text-red-200',
  'ET-1/L-NAME': 'bg-teal-900/40 text-teal-200',
}

function strokeModelLine(model, reperfusionMin) {
  if (model === 'tMCAO') {
    return reperfusionMin != null
      ? `tMCAO, ${reperfusionMin} min reperfusion`
      : 'tMCAO, reperfusion NR'
  }
  return model
}

function CardLink({ href, label }) {
  if (!href) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 cursor-not-allowed"
        aria-disabled="true"
      >
        <ExternalLink size={14} />
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
    >
      <ExternalLink size={14} />
      {label}
    </a>
  )
}

export default function DatasetCard({ dataset }) {
  const badgeClass =
    MODEL_BADGE[dataset.stroke_model] ?? 'bg-slate-700/40 text-slate-200'

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-lg p-5 transition-all hover:border-slate-700 hover:scale-[1.01]">
      <header className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-xl font-bold text-white tracking-tight">
          {dataset.accession}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${badgeClass}`}
        >
          {dataset.stroke_model}
        </span>
      </header>

      <p className="text-sm text-slate-400 mb-4">
        {dataset.first_author} et al. {dataset.year} · {dataset.journal}
      </p>

      <dl className="space-y-1.5 text-sm text-slate-200 mb-4">
        <div>
          <span className="text-slate-400">Cells: </span>
          {dataset.n_cells_atlas != null
            ? `${dataset.n_cells_atlas.toLocaleString()} cells`
            : '—'}
        </div>
        <div>
          <span className="text-slate-400">Model: </span>
          {strokeModelLine(dataset.stroke_model, dataset.reperfusion_time_minutes)}
        </div>
        <div>
          <span className="text-slate-400">Timepoints: </span>
          {dataset.timepoints || '—'}
        </div>
        <div>
          <span className="text-slate-400">Tissue: </span>
          {dataset.tissue_region || '—'}
        </div>
      </dl>

      <footer className="flex gap-4 pt-3 border-t border-slate-800">
        <CardLink href={dataset.geo_url} label="GEO" />
        <CardLink href={dataset.paper_url} label="Paper" />
      </footer>
    </article>
  )
}
