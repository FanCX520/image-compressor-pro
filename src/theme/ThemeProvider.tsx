import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export type Theme = 'apple' | 'material'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
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
  const [theme, setTheme] = useState<Theme>('apple')

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    // Get saved theme from localStorage or default to 'apple'
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'apple' || savedTheme === 'material')) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document.documentElement and document.body
    if (mounted) {
      const root = document.documentElement
      const body = document.body
      
      // Remove any existing data-theme attributes
      root.removeAttribute('data-theme')
      body.removeAttribute('data-theme')
      
      // Apply the current theme to both root and body
      root.setAttribute('data-theme', theme)
      body.setAttribute('data-theme', theme)
      
      // Also set the class on body for backwards compatibility
      body.className = body.className.replace(/theme-\w+/g, '').trim()
      body.classList.add(`theme-${theme}`)
    }
  }, [theme, mounted])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme)
    localStorage.setItem('theme', newTheme)
  }

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="apple"
      enableSystem={false}
      storageKey="theme"
      {...props}
    >
      <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
        <div data-theme={theme} className="theme-provider">
          {children}
        </div>
      </ThemeContext.Provider>
    </NextThemesProvider>
  )
}