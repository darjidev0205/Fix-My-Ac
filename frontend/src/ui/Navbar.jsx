import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Download, Smartphone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { VayuCareLogo } from '../components/ui/VayuCareLogo'
import { useInstallApp } from '../hooks/useInstallApp'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/booking', label: 'Booking' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { triggerInstall, deferredPrompt, isAndroid, apkUrl, isCapacitor, isInstalled } = useInstallApp()

  const dashboardPath = user?.role === 'technician' ? '/technician' : '/dashboard'
  const displayName = user?.displayName || user?.email?.split('@')[0] || user?.email || user?.phoneNumber || 'User'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U'

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  async function handleLogout() {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/auth')
    } catch {
      toast.error('Failed to log out')
    }
  }

  async function handleHeaderInstall() {
    if (deferredPrompt) {
      await triggerInstall()
    } else if (isAndroid) {
      toast.success('Downloading VayuCare APK...', { icon: '📲' })
      window.open(apkUrl, '_blank')
    } else {
      toast.success('App is already installed or supported via browser menu!', { icon: '✨' })
    }
  }

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all">
      <div className="site-container flex h-full items-center justify-between gap-4">
        
        {/* Left: VayuCare Brand Logo Group */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center text-left shrink-0 focus:outline-none rounded-2xl p-1 -ml-1 transition-opacity hover:opacity-95"
        >
          <VayuCareLogo size="md" />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2 min-w-0 shrink">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 text-xs xl:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-[#3563F6]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to={dashboardPath}
              className={({ isActive }) =>
                `px-3 py-2 text-xs xl:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-[#3563F6]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right: User Identity, Install App, Logout & Primary CTA Group */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">

          {/* Permanent Install App Header Button (When not in Capacitor & not installed) */}
          {!isCapacitor && !isInstalled && (
            <button
              type="button"
              onClick={handleHeaderInstall}
              className="hidden md:inline-flex items-center justify-center gap-1.5 h-11 px-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors whitespace-nowrap shrink-0"
              title="Install VayuCare App"
            >
              <Smartphone className="w-4 h-4 text-[#3563F6]" />
              <span>Install App</span>
            </button>
          )}

          {user ? (
            <>
              {/* Compact User Identity Pill */}
              <button
                type="button"
                onClick={() => navigate(dashboardPath)}
                title={user.email || user.phoneNumber}
                className="hidden md:flex items-center gap-2.5 h-11 px-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors shrink-0 max-w-[170px] text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <div className="h-7 w-7 rounded-full bg-[#3563F6] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-slate-800 truncate whitespace-nowrap">
                    {displayName}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 leading-none">
                    Customer
                  </span>
                </div>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:inline-flex items-center justify-center h-11 px-4 rounded-xl text-xs font-bold text-[#3563F6] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-colors whitespace-nowrap shrink-0"
              >
                Logout
              </button>
            </>
          ) : (
            /* Login / Register Button */
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="hidden md:inline-flex items-center justify-center h-11 px-4 rounded-xl text-xs font-bold text-[#3563F6] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-colors whitespace-nowrap shrink-0"
            >
              Login / Register
            </button>
          )}

          {/* Primary CTA: Book Now Button */}
          <button
            type="button"
            onClick={() => navigate('/booking')}
            className="inline-flex items-center justify-center h-11 px-4 sm:px-5 rounded-xl text-xs font-bold text-white bg-[#3563F6] hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all whitespace-nowrap shrink-0"
          >
            Book Now
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 bg-slate-900/40 backdrop-blur-md lg:hidden">
          <div className="border-b border-slate-200 bg-white px-4 py-6 shadow-2xl space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {user && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="h-10 w-10 rounded-full bg-[#3563F6] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {displayName}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {user.email || user.phoneNumber}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#3563F6]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to={dashboardPath}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#3563F6]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Permanent Install App item in Mobile Drawer */}
            {!isCapacitor && !isInstalled && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleHeaderInstall}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-sky-200 bg-sky-50 text-xs font-bold text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  Install VayuCare Mobile App
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 space-y-2">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full h-12 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="w-full h-12 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-[#3563F6] hover:bg-blue-100 transition-colors"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

