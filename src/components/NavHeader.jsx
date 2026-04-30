import { NavLink } from 'react-router-dom'

const tabClass = ({ isActive }) =>
  `inline-block px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
    isActive
      ? 'border-blue-500 text-white'
      : 'border-transparent text-slate-400 hover:text-slate-200'
  }`

export default function NavHeader() {
  return (
    <header className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-white tracking-tight">
          Stroke Vasculature Atlas
        </span>
        <nav className="flex gap-1">
          <NavLink to="/" end className={tabClass}>
            Overview
          </NavLink>
          <NavLink to="/gene-explorer" className={tabClass}>
            Gene Explorer
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
