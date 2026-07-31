import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { Footer } from '../ui/Footer'
import { InstallAppPopup } from '../components/InstallAppPopup'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
      <InstallAppPopup />
      <ScrollRestoration />
    </div>
  )
}


