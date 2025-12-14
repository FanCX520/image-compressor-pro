import { useCallback, useEffect, useState } from 'react'

export type MaterialThemeLoaderStatus = 'idle' | 'loading' | 'loaded' | 'error'

const MATERIAL_3_CDN_STYLESHEET_ID = 'material-3-cdn-stylesheet'
const MATERIAL_3_CDN_STYLESHEET_HREF =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'

let globalLoadPromise: Promise<void> | null = null

function getLink(): HTMLLinkElement | null {
  if (typeof document === 'undefined') return null
  return document.getElementById(MATERIAL_3_CDN_STYLESHEET_ID) as HTMLLinkElement | null
}

function getCurrentStatus(): MaterialThemeLoaderStatus {
  const link = getLink()
  if (!link || link.disabled) return 'idle'
  if (link.dataset.loaded === 'true') return 'loaded'
  return 'loading'
}

export function useMaterialThemeLoader() {
  const [status, setStatus] = useState<MaterialThemeLoaderStatus>(() => getCurrentStatus())
  const [error, setError] = useState<Error | undefined>(undefined)

  const load = useCallback(async () => {
    if (typeof document === 'undefined') return

    setError(undefined)

    let link = getLink()
    if (link) {
      link.disabled = false
      if (link.dataset.loaded === 'true') {
        setStatus('loaded')
        return
      }
    }

    if (!link) {
      link = document.createElement('link')
      link.id = MATERIAL_3_CDN_STYLESHEET_ID
      link.rel = 'stylesheet'
      link.href = MATERIAL_3_CDN_STYLESHEET_HREF
      link.dataset.loaded = 'false'
      document.head.appendChild(link)
    }

    setStatus('loading')

    if (!globalLoadPromise) {
      globalLoadPromise = new Promise<void>((resolve, reject) => {
        const onLoad = () => {
          link!.dataset.loaded = 'true'
          resolve()
        }

        const onError = () => {
          reject(new Error('Failed to load Material 3 CDN stylesheet'))
        }

        link!.addEventListener('load', onLoad, { once: true })
        link!.addEventListener('error', onError, { once: true })
      })
    }

    try {
      await globalLoadPromise
      const currentLink = getLink()
      if (!currentLink || currentLink.disabled) {
        setStatus('idle')
      } else {
        setStatus('loaded')
      }
    } catch (e) {
      const nextError = e instanceof Error ? e : new Error('Failed to load Material 3 CDN stylesheet')
      setError(nextError)
      setStatus('error')
      globalLoadPromise = null
    }
  }, [])

  const disable = useCallback(() => {
    const link = getLink()
    if (link) {
      link.disabled = true
    }
    setStatus('idle')
  }, [])

  useEffect(() => {
    setStatus(getCurrentStatus())
  }, [])

  return {
    status,
    error,
    load,
    disable,
  }
}
