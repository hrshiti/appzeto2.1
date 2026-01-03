import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductShowcase from './pages/ProductShowcase'
import AboutUs from './pages/AboutUs'
import Career from './pages/Career'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Blogs from './pages/Blogs'
import ChitChat from './pages/ChitChat'
import Login from './pages/Login'
import TaxiProductShowcase from './pages/TaxiProductShowcase'
import EcommerceProductShowcase from './pages/EcommerceProductShowcase'
import HospitalProductShowcase from './pages/HospitalProductShowcase'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chit-chat" element={<ChitChat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/appzeto-food" element={<ProductShowcase />} />
      <Route path="/appzeto-taxi" element={<TaxiProductShowcase />} />
      <Route path="/appzeto-ecommerce" element={<EcommerceProductShowcase />} />
      <Route path="/appzeto-hospital" element={<HospitalProductShowcase />} />
    </Routes>
  )
}

export default App
