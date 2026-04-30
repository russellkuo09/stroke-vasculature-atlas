import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import mockExpression from '../data/mockExpression.json'

const TIMEPOINTS = ['Sham', 'D1', 'D3', 'D7', 'D14', 'D28']

const CELL_TYPES = [
  'Endothelial',
  'Pericyte',
  'Astrocyte',
  'Microglia',
  'Neuron',
  'Oligodendrocyte',
  'OPC',
]

const CELL_TYPE_COLORS = {
  Endothelial: '#3b82f6',
  Pericyte: '#a855f7',
  Astrocyte: '#10b981',
  Microglia: '#f59e0b',
  Neuron: '#ef4444',
  Oligodendrocyte: '#14b8a6',
  OPC: '#8b5cf6',
}

const KNOWN_GENES = Object.keys(mockExpression)
const GENE_BY_LOWER = Object.fromEntries(
  KNOWN_GENES.map((g) => [g.toLowerCase(), g])
)

function lookupGene(input) {
  const canonical = GENE_BY_LOWER[input.trim().toLowerCase()]
  return canonical ? { canonical, data: mockExpression[canonical] } : null
}

function buildChartData(geneData) {
  return TIMEPOINTS.map((tp) => {
    const row = { timepoint: tp }
    for (const ct of CELL_TYPES) {
      row[ct] = geneData[ct]?.[tp] ?? null
    }
    return row
  })
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const sorted = [...payload]
    .filter((p) => p.value != null)
    .sort((a, b) => b.value - a.value)
  return (
    <div className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm shadow-lg">
      <div className="text-slate-200 font-medium mb-1.5">{label}</div>
      <div className="space-y-1">
        {sorted.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: p.color }}
            />
            <span className="text-slate-400 mr-3">{p.dataKey}</span>
            <span className="text-slate-100 font-mono ml-auto">
              {p.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GeneExplorer() {
  const [gene, setGene] = useState('Cldn5')
  const [hidden, setHidden] = useState(() => new Set())

  const result = useMemo(() => lookupGene(gene), [gene])
  const chartData = useMemo(
    () => (result ? buildChartData(result.data) : null),
    [result]
  )

  function toggleCellType(name) {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const trimmedGene = gene.trim()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Gene Expression Time Course
          </h1>
          <p className="text-slate-400">
            Trace gene expression across timepoints and cell types post-stroke.
          </p>
        </header>

        <div className="bg-yellow-900/20 border border-yellow-700/50 text-yellow-200 p-4 rounded-md mb-8 text-sm">
          ⚠ Mock data for UI development. Once the harmonized AnnData object lands,
          this page will load real per-(cell type × timepoint) expression values from
          the integrated atlas.
        </div>

        <div className="mb-8 max-w-md">
          <label
            htmlFor="gene-input"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Gene symbol
          </label>
          <input
            id="gene-input"
            type="text"
            value={gene}
            onChange={(e) => setGene(e.target.value)}
            placeholder="Cldn5"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            autoComplete="off"
            spellCheck="false"
          />
          <p className="mt-2 text-xs text-slate-500">
            10 genes available in current mock data: {KNOWN_GENES.join(', ')}
          </p>
        </div>

        {result ? (
          <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={480}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="timepoint"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#475569' }}
                  tickLine={{ stroke: '#475569' }}
                  label={{
                    value: 'Expression (log-norm)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#94a3b8', textAnchor: 'middle' },
                  }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: '#475569', strokeDasharray: '3 3' }}
                />
                <Legend
                  onClick={(e) => toggleCellType(e.dataKey)}
                  wrapperStyle={{ cursor: 'pointer', paddingTop: 16 }}
                />
                {CELL_TYPES.map((ct) => (
                  <Line
                    key={ct}
                    type="monotone"
                    dataKey={ct}
                    stroke={CELL_TYPE_COLORS[ct]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    hide={hidden.has(ct)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : trimmedGene ? (
          <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-12 flex items-center justify-center">
            <p className="text-slate-400 italic text-center">
              No mock data for {trimmedGene}. Full transcriptome will be available
              after harmonization.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-12 flex items-center justify-center">
            <p className="text-slate-500 italic text-center">
              Enter a gene symbol above.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
