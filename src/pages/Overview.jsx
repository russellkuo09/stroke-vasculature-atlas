import { useMemo, useState } from 'react'
import { Menu } from 'lucide-react'

import datasets from '../data/datasets.json'
import DatasetCard from '../components/DatasetCard'
import FilterSidebar from '../components/FilterSidebar'
import {
  applyFilters,
  emptyFilterState,
  organismToSpecies,
} from '../utils/filters'

function unique(values) {
  return [...new Set(values.filter((v) => v != null && v !== ''))].sort()
}

export default function Overview() {
  const [filters, setFilters] = useState(emptyFilterState)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const options = useMemo(
    () => ({
      strokeModels: unique(datasets.map((d) => d.stroke_model)),
      assays: unique(datasets.map((d) => d.assay)),
      species: unique(datasets.map((d) => organismToSpecies(d.organism))),
      tissueRegions: unique(datasets.map((d) => d.tissue_region)),
    }),
    []
  )

  const filtered = useMemo(() => applyFilters(datasets, filters), [filters])

  function toggleFilter(category, value) {
    setFilters((prev) => {
      const next = new Set(prev[category])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...prev, [category]: next }
    })
  }

  function resetFilters() {
    setFilters(emptyFilterState())
  }

  const sidebarProps = {
    options,
    filters,
    onToggle: toggleFilter,
    onReset: resetFilters,
    visibleCount: filtered.length,
    totalCount: datasets.length,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile top bar with hamburger */}
      <div className="md:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open filters"
          className="text-slate-300 hover:text-white"
        >
          <Menu size={22} />
        </button>
        <span className="text-sm text-slate-400">Filters</span>
      </div>

      {/* Mobile backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="md:flex">
        {/* Sidebar — fixed drawer on mobile, sticky column on desktop */}
        <aside
          className={`
            fixed md:sticky inset-y-0 left-0 z-50
            w-[280px] flex-shrink-0
            bg-slate-900 md:bg-slate-900/50
            border-r border-slate-800
            md:top-0 md:h-screen overflow-y-auto
            transform transition-transform duration-200 ease-out
            ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
          aria-label="Filters"
        >
          <FilterSidebar {...sidebarProps} onClose={() => setDrawerOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-10">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Dataset Overview
            </h1>
            <p className="text-slate-400">
              16 datasets · ~619,000 cells across mouse and rat ischemic stroke models
            </p>
          </header>

          {filtered.length === 0 ? (
            <div className="text-slate-400 text-sm">
              No datasets match the current filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((d) => (
                <DatasetCard key={d.accession} dataset={d} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
