import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { Footer } from '../ui/Footer'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

