import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Gui from './gui/Gui'
import Tui from './tui/Tui'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/gui" element={<Gui />} />
      <Route path="/tui" element={<Tui />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
