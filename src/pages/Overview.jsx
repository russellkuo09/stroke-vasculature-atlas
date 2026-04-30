import datasets from '../data/datasets.json'
import DatasetCard from '../components/DatasetCard'

export default function Overview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Dataset Overview
          </h1>
          <p className="text-slate-400">
            16 datasets · ~619,000 cells across mouse and rat ischemic stroke models
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((d) => (
            <DatasetCard key={d.accession} dataset={d} />
          ))}
        </div>
      </div>
    </div>
  )
}
