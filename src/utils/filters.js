export function organismToSpecies(organism) {
  if (!organism) return null
  if (/Mus/i.test(organism)) return 'Mouse'
  if (/Rattus/i.test(organism)) return 'Rat'
  return organism
}

export function parseTimepointDays(timepointStr) {
  if (!timepointStr) return []
  const days = []

  for (const m of timepointStr.matchAll(/\bD(\d+(?:\.\d+)?)\b/g)) {
    days.push(parseFloat(m[1]))
  }
  for (const m of timepointStr.matchAll(/(\d+(?:\.\d+)?)\s*h(?:r|rs|ours?)?\b/gi)) {
    days.push(parseFloat(m[1]) / 24)
  }
  for (const m of timepointStr.matchAll(/(\d+(?:\.\d+)?)\s*days?\b/gi)) {
    days.push(parseFloat(m[1]))
  }
  for (const m of timepointStr.matchAll(/(\d+(?:\.\d+)?)\s*weeks?\b/gi)) {
    days.push(parseFloat(m[1]) * 7)
  }
  for (const m of timepointStr.matchAll(/(\d+(?:\.\d+)?)\s*months?\b/gi)) {
    days.push(parseFloat(m[1]) * 30)
  }

  return days
}

const TIMEPOINT_BIN_TESTS = {
  acute: (d) => d <= 3,
  subacute: (d) => d > 3 && d < 14,
  chronic: (d) => d >= 14,
}

const TIMEPOINT_KEYWORD_PATTERNS = {
  acute: [/\bacute\b/i, /\bearly\b/i, /\bhours?\b/i],
  subacute: [/\bsubacute\b/i],
  chronic: [
    /\bchronic\b/i,
    /\blate\b/i,
    /\bmonths?\b/i,
    /\bweeks?\b/i,
    /\blong[-\s]?term\b/i,
  ],
}

export function matchesTimepointBin(timepointStr, bin) {
  if (!timepointStr) return false

  const days = parseTimepointDays(timepointStr)
  if (days.length > 0) {
    const test = TIMEPOINT_BIN_TESTS[bin]
    return test ? days.some(test) : false
  }

  const patterns = TIMEPOINT_KEYWORD_PATTERNS[bin]
  if (!patterns) return false
  return patterns.some((re) => re.test(timepointStr))
}

export function matchesReperfusion(dataset, selected) {
  if (selected.size === 0) return true
  const checks = []
  if (selected.has('0 min permanent')) {
    checks.push(['pMCAO', 'dMCAO'].includes(dataset.stroke_model))
  }
  if (selected.has('60 min')) {
    checks.push(dataset.reperfusion_time_minutes === 60)
  }
  if (selected.has('90 min')) {
    checks.push(dataset.reperfusion_time_minutes === 90)
  }
  if (selected.has('NR (unverified)')) {
    checks.push(
      dataset.stroke_model === 'tMCAO' &&
        dataset.reperfusion_time_minutes == null
    )
  }
  return checks.some(Boolean)
}

export function applyFilters(datasets, filters) {
  return datasets.filter((d) => {
    if (filters.strokeModel.size > 0 && !filters.strokeModel.has(d.stroke_model)) {
      return false
    }
    if (filters.assay.size > 0 && !filters.assay.has(d.assay)) {
      return false
    }
    if (filters.species.size > 0) {
      const sp = organismToSpecies(d.organism)
      if (!filters.species.has(sp)) return false
    }
    if (filters.reperfusion.size > 0 && !matchesReperfusion(d, filters.reperfusion)) {
      return false
    }
    if (filters.timepoint.size > 0) {
      const anyMatch = [...filters.timepoint].some((bin) =>
        matchesTimepointBin(d.timepoints, bin)
      )
      if (!anyMatch) return false
    }
    if (filters.tissueRegion.size > 0 && !filters.tissueRegion.has(d.tissue_region)) {
      return false
    }
    return true
  })
}

export function emptyFilterState() {
  return {
    strokeModel: new Set(),
    assay: new Set(),
    species: new Set(),
    reperfusion: new Set(),
    timepoint: new Set(),
    tissueRegion: new Set(),
  }
}
