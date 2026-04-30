import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavHeader from './components/NavHeader'
import Overview from './pages/Overview'
// TODO: Consider React.lazy() for GeneExplorer to split Recharts bundle off Overview load.
import GeneExplorer from './pages/GeneExplorer'

export default function App() {
  return (
    <BrowserRouter basename="/stroke-vasculature-atlas">
      <NavHeader />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/gene-explorer" element={<GeneExplorer />} />
      </Routes>
    </BrowserRouter>
  )
}
