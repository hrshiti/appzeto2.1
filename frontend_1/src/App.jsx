import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductShowcase from './pages/ProductShowcase'
import AboutUs from './pages/AboutUs'
import Career from './pages/Career'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/appzeto-food" element={<ProductShowcase />} />
    </Routes>
  )
}

export default App
