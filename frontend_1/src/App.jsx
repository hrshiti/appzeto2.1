import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProductShowcase from './pages/ProductShowcase'
import AboutUs from './pages/AboutUs'
import Career from './pages/Career'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import ChitChat from './pages/ChitChat'
import Login from './pages/Login'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import TaxiProductShowcase from './pages/TaxiProductShowcase'
import EcommerceProductShowcase from './pages/EcommerceProductShowcase'
import HospitalProductShowcase from './pages/HospitalProductShowcase'
import ChannelPartnersPage from './pages/ChannelPartnersPage'
import DemoCenter from './pages/DemoCenter'
import OfficeDetail from './pages/OfficeDetail'
import CustomCursor from './components/CustomCursor'
import './App.css'

// Admin Imports
import { AdminAuthProvider, ProtectedAdminRoute } from './admin/context/AdminAuthContext'
import AdminLayout from './admin/layouts/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminServices from './admin/pages/AdminServices'
import AdminProjects from './admin/pages/AdminProjects'
import AdminBlogs from './admin/pages/AdminBlogs'
import AdminProducts from './admin/pages/AdminProducts'
import AdminVideos from './admin/pages/AdminVideos'
import AdminMessages from './admin/pages/AdminMessages'
import AdminUsers from './admin/pages/AdminUsers'
import HRDashboard from './admin/pages/HRDashboard'
import AdminLeads from './admin/pages/AdminLeads'
import AdminQueries from './admin/pages/AdminQueries'
import HRJobs from './admin/pages/HRJobs'
import HRInternships from './admin/pages/HRInternships'
import HRApplications from './admin/pages/HRApplications'
import AdminSettings from './admin/pages/AdminSettings'
import AdminTeam from './admin/pages/AdminTeam'
import AdminPartners from './admin/pages/AdminPartners'
import AdminApplications from './admin/pages/AdminApplications'

import { ToastProvider } from './admin/context/ToastContext'

function App() {
  return (
    <>
      <CustomCursor />
      <ToastProvider>
        <AdminAuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/chit-chat" element={<ChitChat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appzeto-food" element={<ProductShowcase />} />
            <Route path="/appzeto-taxi" element={<TaxiProductShowcase />} />
            <Route path="/appzeto-ecommerce" element={<EcommerceProductShowcase />} />
            <Route path="/appzeto-hospital" element={<HospitalProductShowcase />} />
            <Route path="/channel-partners" element={<ChannelPartnersPage />} />
            <Route path="/demo" element={<DemoCenter />} />
            <Route path="/offices/:slug" element={<OfficeDetail />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes (Restricted to ADMIN role only) */}
            <Route path="/admin" element={
              <ProtectedAdminRoute requiredRole="ADMIN">
                <AdminLayout />
              </ProtectedAdminRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="videos" element={<AdminVideos />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="queries" element={<AdminQueries />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="partners" element={<AdminPartners />} />
            </Route>

            {/* HR Routes (Accessible by HR and ADMIN) */}
            <Route path="/hr" element={
              <ProtectedAdminRoute requiredRole="HR">
                <AdminLayout />
              </ProtectedAdminRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="jobs" element={<HRJobs />} />
              <Route path="internships" element={<HRInternships />} />
              <Route path="applications" element={<HRApplications />} />
            </Route>

          </Routes>
        </AdminAuthProvider>
      </ToastProvider>
    </>
  )
}

export default App
