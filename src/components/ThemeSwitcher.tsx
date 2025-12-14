import React from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="glass-surface motion-quick" style={{ 
      borderRadius: 'var(--radius-medium)', 
      padding: 'var(--space-3)',
      display: 'flex',
      gap: 'var(--space-1)',
      alignItems: 'center'
    }}>
      <button
        onClick={() => setTheme('apple')}
        className={`p-2 motion-quick ${
          theme === 'apple' 
            ? 'opacity-100' 
            : 'opacity-60 hover:opacity-80'
        }`}
        style={{
          borderRadius: 'var(--radius-small)',
          background: theme === 'apple' 
            ? 'rgba(var(--color-primary), 0.1)' 
            : 'transparent'
        }}
        title="Apple Theme"
      >
        <Smartphone 
          className="w-4 h-4" 
          style={{ color: theme === 'apple' ? 'rgb(var(--color-primary))' : 'rgb(var(--color-text-tertiary))' }}
        />
      </button>
      <button
        onClick={() => setTheme('material')}
        className={`p-2 motion-quick ${
          theme === 'material' 
            ? 'opacity-100' 
            : 'opacity-60 hover:opacity-80'
        }`}
        style={{
          borderRadius: 'var(--radius-small)',
          background: theme === 'material' 
            ? 'rgba(var(--color-primary), 0.1)' 
            : 'transparent'
        }}
        title="Material Theme"
      >
        <Monitor 
          className="w-4 h-4" 
          style={{ color: theme === 'material' ? 'rgb(var(--color-primary))' : 'rgb(var(--color-text-tertiary))' }}
        />
      </button>
    </div>
  )
}