import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 glass-surface"
      style={{ borderTop: 'var(--border-prominent)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-sm mb-1 theme-text-secondary">智能图片压缩 - 让图片处理更简单</p>
          <p className="text-xs theme-text-tertiary">Powered by Cyaraon</p>
        </div>
      </div>
    </footer>
  )
}
