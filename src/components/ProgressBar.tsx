import React from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

interface ProgressBarProps {
  progress: number
  isComplete: boolean
  message?: string
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isComplete,
  message,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="theme-text-secondary">{message || '处理中...'}</span>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-4 h-4" style={{ color: 'rgb(var(--color-success))' }} />
          ) : (
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'rgb(var(--color-primary))' }} />
          )}
          <span className="font-semibold theme-text-primary">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: 'rgb(var(--color-surface-quaternary))' }}>
        <div
          className={`h-full progress-bar ${isComplete ? 'bg-success-gradient' : 'bg-progress-gradient'}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {!isComplete && (
            <div
              className="h-full w-full animate-pulse"
              style={{ background: 'rgba(var(--color-text-inverse), 0.25)' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
