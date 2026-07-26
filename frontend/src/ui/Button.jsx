import clsx from 'clsx'

export function Button({
  as: As = 'button',
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) {
  return (
    <As
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3563F6] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]',
        size === 'sm' && 'h-10 px-4 text-xs tracking-wide',
        size === 'md' && 'h-12 px-5 text-sm',
        size === 'lg' && 'h-14 px-7 text-base shadow-lg',
        variant === 'primary' &&
          'bg-[#3563F6] text-white shadow-md shadow-blue-500/25 hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5',
        variant === 'secondary' &&
          'bg-blue-50 text-[#3563F6] ring-1 ring-blue-100 hover:bg-blue-100/70 hover:ring-blue-200 hover:-translate-y-0.5',
        variant === 'outline' &&
          'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5',
        variant === 'ghost' &&
          'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        className,
      )}
      {...props}
    />
  )
}
