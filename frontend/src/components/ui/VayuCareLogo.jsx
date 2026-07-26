import React from 'react'

export function VayuCareIcon({ className = "h-8 w-8", dark = false }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dynamic Airflow V Symbol */}
      <path 
        d="M12 14C20 34 27 48 32 48C37 48 44 34 52 14C42 24 37 36 32 36C27 36 22 24 12 14Z" 
        fill={dark ? "#38BDF8" : "#38BDF8"} 
      />
      <path 
        d="M20 12C26 26 29 34 32 34C35 34 38 26 44 12C38 18 35 24 32 24C29 24 26 18 20 12Z" 
        fill="#10B981" 
        opacity="0.9"
      />
      <circle cx="32" cy="18" r="4.5" fill={dark ? "#FFFFFF" : "#0F172A"} />
    </svg>
  )
}

export function VayuCareLogo({ variant = 'horizontal', mode = 'light', size = 'md', className = '' }) {
  const isDark = mode === 'dark' || mode === 'black'
  const isMonochrome = mode === 'black' || mode === 'white'

  // Height mappings
  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10'

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <VayuCareIcon className={heightClass} dark={isDark} />
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <VayuCareIcon className="h-12 w-12" dark={isDark} />
        <div className="flex items-center tracking-tight text-xl font-display">
          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Vayu</span>
          <span className={`font-medium ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>Care</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* Icon Container with subtle scale hover */}
      <div className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
        <VayuCareIcon className={heightClass} dark={isDark} />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline text-xl font-display tracking-tight">
          <span className={`font-bold text-slate-900 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Vayu
          </span>
          <span className={`font-medium ml-0.5 ${isDark ? 'text-sky-400' : 'text-sky-500'}`}>
            Care
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mt-1">
          Climate Platform
        </span>
      </div>
    </div>
  )
}
