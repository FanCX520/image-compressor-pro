import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useMaterialThemeLoader } from '../hooks/useMaterialThemeLoader'

export type Theme = 'apple' | 'material'

interface ThemeContextValue {
  theme: Theme
  appliedTheme: Theme
  setTheme: (theme: Theme) => void
  materialCdnStatus: 'idle' | 'loading' | 'loaded' | 'error'
  materialCdnError?: Error
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<Theme>('apple')

  const {
    status: materialCdnStatus,
    error: materialCdnError,
    load: loadMaterialCdn,
    disable: disableMaterialCdn,
  } = useMaterialThemeLoader()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme === 'apple' || savedTheme === 'material') {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (theme === 'material') {
      void loadMaterialCdn()
    } else {
      disableMaterialCdn()
    }
  }, [theme, mounted, loadMaterialCdn, disableMaterialCdn])

  const appliedTheme: Theme = useMemo(() => {
    if (theme === 'material') {
      return materialCdnStatus === 'loaded' ? 'material' : 'apple'
    }
    return 'apple'
  }, [theme, materialCdnStatus])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const body = document.body

    root.setAttribute('data-theme', appliedTheme)
    body.setAttribute('data-theme', appliedTheme)

    body.className = body.className.replace(/\btheme-\w+\b/g, '').trim()
    body.classList.add(`theme-${appliedTheme}`)
  }, [appliedTheme, mounted])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      appliedTheme,
      setTheme,
      materialCdnStatus,
      materialCdnError,
    }),
    [theme, appliedTheme, setTheme, materialCdnStatus, materialCdnError],
  )

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="apple"
      enableSystem={false}
      storageKey="theme"
      themes={['apple', 'material']}
      forcedTheme={appliedTheme}
      {...props}
    >
      <ThemeContext.Provider value={value}>
        <div data-theme={appliedTheme} className="theme-provider">
          {children}
        </div>
      </ThemeContext.Provider>
    </NextThemesProvider>
  )
}
