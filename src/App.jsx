import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import ToastContainer from './components/ui/Toast'
import SplashScreen from './components/ui/SplashScreen'
import HomePage from './components/pages/home/HomePage'
import LoginPage from './components/pages/auth/LoginPage'
import RegisterPage from './components/pages/auth/RegisterPage'
import FoodPage from './components/pages/food/FoodPage'
import MarketPage from './components/pages/market/MarketPage'
import TripsPage from './components/pages/trips/TripsPage'
import ProfilePage from './components/pages/profile/ProfilePage'

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const location = useLocation()

  const hideHeader = ['/login', '/register'].includes(location.pathname)

  if (!splashDone) return <SplashScreen onDone={() => setSplashDone(true)} />

  return (
    <div className="relative">
      {!hideHeader && <Header onMenuOpen={() => setSidebarOpen(true)} />}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}