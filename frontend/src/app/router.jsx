import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { HomePage } from '../pages/HomePage'
import { PricingPage } from '../pages/PricingPage'
import { BookingPage } from '../pages/BookingPage'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'
import { FaqPage } from '../pages/FaqPage'
import { TermsPage } from '../pages/TermsPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { AuthPage } from '../pages/AuthPage'
import { UserDashboardPage } from '../pages/dashboards/UserDashboardPage'
import { TechnicianDashboardPage } from '../pages/dashboards/TechnicianDashboardPage'
import { ProtectedRoute } from '../routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/booking', element: <BookingPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/auth', element: <AuthPage /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/technician',
        element: (
          <ProtectedRoute requireRole="technician">
            <TechnicianDashboardPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

