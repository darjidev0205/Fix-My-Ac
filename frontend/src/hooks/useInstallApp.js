import { useState, useEffect, useCallback } from 'react'

const DISMISSAL_KEY = 'vayucare_install_popup_dismissed_at'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function useInstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isCapacitor, setIsCapacitor] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)
  const [updateSW, setUpdateSW] = useState(null)

  useEffect(() => {
    // Detect Capacitor native app environment
    const inCapacitor = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())
    setIsCapacitor(inCapacitor)

    // Detect standalone mode (PWA installed and running)
    const inStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    setIsStandalone(inStandalone)

    // Device detection
    const ua = navigator.userAgent || ''
    const android = /android/i.test(ua)
    const ios = /iphone|ipad|ipod/i.test(ua)
    setIsAndroid(android)
    setIsIOS(ios)

    // Check 7-day dismissal cooldown
    const dismissedAt = localStorage.getItem(DISMISSAL_KEY)
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10)
      if (elapsed < SEVEN_DAYS_MS) {
        setIsDismissed(true)
      } else {
        localStorage.removeItem(DISMISSAL_KEY)
      }
    }

    // Listen for beforeinstallprompt event
    function handleBeforeInstallPrompt(e) {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // Listen for appinstalled event
    function handleAppInstalled() {
      setIsInstalled(true)
      setDeferredPrompt(null)
      localStorage.setItem('vayucare_pwa_installed', 'true')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Register PWA service worker update hook if virtual module is loaded
    if ('serviceWorker' in navigator) {
      import('virtual:pwa-register')
        .then(({ registerSW }) => {
          const update = registerSW({
            onNeedRefresh() {
              setNeedRefresh(true)
            },
            onOfflineReady() {
              setOfflineReady(true)
            },
          })
          setUpdateSW(() => update)
        })
        .catch(() => {
          // Virtual module missing or dev mode fallback
        })
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const triggerInstall = useCallback(async () => {
    if (!deferredPrompt) return false
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
      setDeferredPrompt(null)
      localStorage.setItem('vayucare_pwa_installed', 'true')
      return true
    }
    return false
  }, [deferredPrompt])

  const dismissPopup = useCallback(() => {
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString())
    setIsDismissed(true)
  }, [])

  const applyUpdate = useCallback(() => {
    if (updateSW) {
      updateSW(true)
    }
  }, [updateSW])

  const apkUrl = import.meta.env.VITE_ANDROID_APK_URL || '/downloads/vayucare.apk'

  // Rules determining if prompt modal should auto show
  const isInstalledState = isStandalone || isInstalled || localStorage.getItem('vayucare_pwa_installed') === 'true'
  const canShowPopup = !isCapacitor && !isStandalone && !isInstalledState && !isDismissed

  return {
    deferredPrompt,
    isStandalone,
    isCapacitor,
    isAndroid,
    isIOS,
    isDismissed,
    isInstalled: isInstalledState,
    canShowPopup,
    triggerInstall,
    dismissPopup,
    apkUrl,
    needRefresh,
    offlineReady,
    applyUpdate,
  }
}
