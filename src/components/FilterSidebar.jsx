import { X } from 'lucide-react'
import FilterSection from './FilterSection'

const REPERFUSION_OPTIONS = [
  { value: '0 min permanent', label: '0 min permanent' },
  { value: '60 min', label: '60 min' },
  { value: '90 min', label: '90 min' },
  { value: 'NR (unverified)', label: 'NR (unverified)' },
]

const TIMEPOINT_OPTIONS = [
  { value: 'acute', label: 'Acute (≤ D3)' },
  { value: 'subacute', label: 'Subacute (D4-D13)' },
  { value: 'chronic', label: 'Chronic (≥ D14)' },
]

export default function FilterSidebar({
  options,
  filters,
  onToggle,
  onReset,
  visibleCount,
  totalCount,
  onClose,
}) {
  return (
    <div className="p-5">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        )}
      </header>

      <p className="text-sm text-slate-400">
        Showing <span className="text-slate-200 font-medium">{visibleCount}</span>{' '}
        of {totalCount} datasets
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-xs text-blue-400 hover:text-blue-300 underline mt-1 mb-2"
      >
        Reset filters
      </button>

      <FilterSection
        title="Stroke Model"
        options={options.strokeModels}
        selected={filters.strokeModel}
        onToggle={(v) => onToggle('strokeModel', v)}
      />
      <FilterSection
        title="Assay"
        options={options.assays}
        selected={filters.assay}
        onToggle={(v) => onToggle('assay', v)}
      />
      <FilterSection
        title="Species"
        options={options.species}
        selected={filters.species}
        onToggle={(v) => onToggle('species', v)}
      />
      <FilterSection
        title="Reperfusion"
        options={REPERFUSION_OPTIONS}
        selected={filters.reperfusion}
        onToggle={(v) => onToggle('reperfusion', v)}
      />
      <FilterSection
        title="Timepoint Coverage"
        options={TIMEPOINT_OPTIONS}
        selected={filters.timepoint}
        onToggle={(v) => onToggle('timepoint', v)}
      />
      <FilterSection
        title="Tissue Region"
        options={options.tissueRegions}
        selected={filters.tissueRegion}
        onToggle={(v) => onToggle('tissueRegion', v)}
      />
    </div>
  )
}
