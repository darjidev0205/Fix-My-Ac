import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { router } from './app/router'
import { store } from './app/store'
import { AuthProvider } from './context/AuthContext'
import { QuoteProvider } from './context/QuoteContext'
import { LoadingPage } from './ui/LoadingPage'

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <QuoteProvider>
          <RouterProvider router={router} fallbackElement={<LoadingPage />} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: { background: '#0b1220', color: 'white' },
            }}
          />
        </QuoteProvider>
      </AuthProvider>
    </Provider>
  )
}
