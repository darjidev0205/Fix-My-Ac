import React from 'react'
import { ShieldCheck, Clock } from 'lucide-react'

export function QuoteSummary({ quote, loading = false, mode = 'pricing' }) {
  if (!quote) {
    return (
      <div className="invoice-preview p-6 text-white animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded mb-4" />
        <div className="h-20 bg-slate-800 rounded mb-4" />
        <div className="h-10 bg-slate-800 rounded" />
      </div>
    )
  }

  return (
    <div className="invoice-preview space-y-6 text-white relative">
      {loading && (
        <div className="absolute top-3 right-3 text-[10px] text-sky-400 font-bold bg-sky-900/60 px-2 py-0.5 rounded-full border border-sky-500/30 animate-pulse">
          Updating...
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-800 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400 block">
            Real-time Quote Summary
          </span>
          <h3 className="text-xl font-bold text-white">Itemized Invoice</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 border border-emerald-500/30">
          <ShieldCheck size={14} />
          Guaranteed
        </span>
      </div>

      {/* Itemized Rows */}
      <div className="space-y-3 text-xs">
        {quote.items?.map((item, idx) => (
          <div key={idx} className="invoice-row text-slate-300">
            <span className="invoice-label text-xs">{item.label}</span>
            <span className="invoice-price font-bold text-white text-xs">₹{item.amount.toLocaleString()}</span>
          </div>
        ))}
        <div className="invoice-row text-slate-500 pt-2 border-t border-slate-800">
          <span className="invoice-label text-xs">GST ({quote.gstRate}%)</span>
          <span className="invoice-price font-bold text-slate-400 text-xs">₹{quote.gstAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Total Highlight Box */}
      <div className="p-4 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div>
          <span className="text-xs text-slate-400 font-medium">Estimated Total Payable</span>
          <div className="text-3xl font-black text-white tracking-tight mt-0.5">
            ₹{quote.grandTotal.toLocaleString()}
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="block text-xs text-emerald-400 font-bold">✓ Zero Hidden Fees</span>
          <span className="text-[10px] text-slate-400">Includes {quote.warrantyDays}-Day Warranty</span>
        </div>
      </div>

      {/* Timeline estimate */}
      <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl gap-2 border border-slate-800">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-sky-400 shrink-0" />
          <span>Est. Job Duration: <strong className="text-white">{quote.estimatedDuration}</strong></span>
        </span>
        <span className="text-sky-400 font-semibold shrink-0">Tech Available</span>
      </div>
    </div>
  )
}
