import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export function NotFoundPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-fix-border)] bg-white p-10 text-center shadow-[var(--shadow-fix-soft)]">
        <div className="text-sm font-semibold text-sky-700">404</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fix-ink)]">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-[var(--color-fix-muted)]">
          The page you’re looking for doesn’t exist (or was moved).
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button as={Link} to="/" variant="secondary">
            Go home
          </Button>
          <Button as={Link} to="/booking">
            Book a technician
          </Button>
        </div>
      </div>
    </div>
  )
}

