import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Smartphone, X, Check, ShieldCheck, Share, ExternalLink, RefreshCw } from 'lucide-react'
import { useInstallApp } from '../hooks/useInstallApp'
import { VayuCareIcon } from './ui/VayuCareLogo'
import toast from 'react-hot-toast'

export function InstallAppPopup() {
  const {
    canShowPopup,
    deferredPrompt,
    isAndroid,
    isIOS,
    triggerInstall,
    dismissPopup,
    apkUrl,
    needRefresh,
    applyUpdate,
  } = useInstallApp()

  const [visible, setVisible] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [isDownloadingApk, setIsDownloadingApk] = useState(false)

  // Delay popup appearance by 4 seconds
  useEffect(() => {
    if (!canShowPopup) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [canShowPopup])

  async function handleInstallPWA() {
    if (deferredPrompt) {
      const installed = await triggerInstall()
      if (installed) {
        toast.success('VayuCare App Installed Successfully!')
        setVisible(false)
      }
    } else if (isIOS) {
      setShowIOSGuide(true)
    } else {
      toast.error('App installation is not supported on this browser context.')
    }
  }

  function handleDownloadAPK() {
    setIsDownloadingApk(true)
    toast.success('Starting VayuCare Android APK Download...', { icon: '📲' })
    
    // Trigger download
    const link = document.createElement('a')
    link.href = apkUrl
    link.download = 'vayucare.apk'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      setIsDownloadingApk(false)
    }, 2500)
  }

  function handleClose() {
    setVisible(false)
    dismissPopup()
  }

  return (
    <>
      {/* Non-intrusive Version Update Toast Banner */}
      <AnimatePresence>
        {needRefresh && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-xl"
          >
            <RefreshCw className="w-5 h-5 text-sky-400 animate-spin" />
            <div className="text-xs">
              <p className="font-bold text-sm">New version available!</p>
              <p className="text-slate-300">Update now for the latest features.</p>
            </div>
            <button
              onClick={applyUpdate}
              className="ml-2 px-3 py-1.5 bg-[#3563F6] hover:bg-blue-600 font-bold text-xs rounded-xl text-white transition-colors"
            >
              Update Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Install Popup Component */}
      <AnimatePresence>
        {visible && (
          <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-popup-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-md bg-slate-900/95 text-white border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl p-6 sm:p-7 relative"
            >
              {/* Close Icon Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close installation dialog"
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header section with branding logo */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/10">
                  <VayuCareIcon className="h-9 w-9" dark={true} />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    <ShieldCheck className="w-3 h-3" /> Official App
                  </span>
                  <h3 id="install-popup-title" className="text-lg font-bold text-white mt-0.5 leading-tight">
                    Get Faster AC Service with VayuCare
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Install the VayuCare app for quicker bookings, instant service access, booking updates and a smooth mobile experience.
              </p>

              {/* iOS Installation Helper Box */}
              {showIOSGuide ? (
                <div className="mb-6 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sky-400">
                    <Share className="w-4 h-4" /> Safari iOS Installation:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Tap the <span className="font-semibold text-white">Share</span> button in Safari.</li>
                    <li>Scroll down & select <span className="font-semibold text-white">"Add to Home Screen"</span>.</li>
                    <li>Tap <span className="font-semibold text-white">Add</span> in the top right corner.</li>
                  </ol>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* 1. Install PWA Button (When available or iOS) */}
                {(deferredPrompt || isIOS) && (
                  <button
                    type="button"
                    onClick={handleInstallPWA}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#3563F6] to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <Smartphone className="w-4 h-4" />
                    Install Web App
                  </button>
                )}

                {/* 2. Download Android APK (Show for Android or general fallback) */}
                {isAndroid && (
                  <button
                    type="button"
                    onClick={handleDownloadAPK}
                    disabled={isDownloadingApk}
                    className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-75"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloadingApk ? 'Downloading APK...' : 'Download Android APK'}
                  </button>
                )}

                {/* Android installation note */}
                {isAndroid && (
                  <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                    Android may request permission to install apps from your browser.
                  </p>
                )}

                {/* 3. Maybe Later Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
