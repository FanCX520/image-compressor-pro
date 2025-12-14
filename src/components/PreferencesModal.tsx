import React from 'react'
import { Loader2, Palette, X } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

interface PreferencesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  const { theme, appliedTheme, setTheme, materialCdnStatus, materialCdnError } = useTheme()

  if (!isOpen) return null

  const isMaterialSelected = theme === 'material'
  const isMaterialLoading = isMaterialSelected && materialCdnStatus === 'loading'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'var(--overlay-backdrop)' }}
      onClick={onClose}
    >
      <div
        className="glass-card elevation-4 w-full max-w-md motion-moderate"
        style={{ borderRadius: 'var(--radius-2xl)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: 'var(--space-6)', borderBottom: 'var(--border-prominent)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl"
              style={{ background: 'rgba(var(--color-primary), 0.12)' }}
            >
              <Palette className="w-5 h-5" style={{ color: 'rgb(var(--color-primary))' }} />
            </div>
            <h2 className="text-xl font-bold theme-text-primary">设置</h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4" style={{ padding: 'var(--space-6)' }}>
          <div className="space-y-3">
            <div className="text-sm font-semibold theme-text-primary">主题</div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                className={`theme-option ${theme === 'apple' ? 'theme-option--active' : ''}`}
                onClick={() => setTheme('apple')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Apple</div>
                    <div className="text-xs theme-text-tertiary">默认，玻璃态与景深</div>
                  </div>
                  {appliedTheme === 'apple' && (
                    <span className="theme-pill">已启用</span>
                  )}
                </div>
              </button>

              <button
                type="button"
                className={`theme-option ${theme === 'material' ? 'theme-option--active' : ''}`}
                onClick={() => setTheme('material')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Material 3</div>
                    <div className="text-xs theme-text-tertiary">按需加载 Roboto & Material 3 视觉</div>
                  </div>
                  {appliedTheme === 'material' && (
                    <span className="theme-pill">已启用</span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {isMaterialSelected && materialCdnStatus !== 'loaded' && (
            <div className="theme-inline-status">
              {isMaterialLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>正在加载 Material 3 CDN 样式…</span>
                </>
              ) : materialCdnStatus === 'error' ? (
                <span>
                  加载失败：{materialCdnError?.message || 'Material 3 CDN 样式加载失败'}
                </span>
              ) : (
                <span>准备加载 Material 3 样式…</span>
              )}
            </div>
          )}

          <div className="text-xs theme-text-tertiary">
            刷新页面后会保持你的主题选择。
          </div>
        </div>
      </div>
    </div>
  )
}
