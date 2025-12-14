import React, { useState } from 'react'
import { Info, Settings } from 'lucide-react'
import { AboutModal } from './AboutModal'
import { PreferencesModal } from './PreferencesModal'

export const Header: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  return (
    <>
      <header className="text-center my-6 animate-slide-in-up relative">
        <div className="absolute top-0 right-0 flex gap-2">
          <button
            type="button"
            onClick={() => setIsPreferencesOpen(true)}
            className="icon-button"
            title="设置"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsAboutModalOpen(true)}
            className="icon-button"
            title="关于项目"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-lg opacity-20 animate-pulse-soft"
              style={{ background: 'var(--gradient-brand)' }}
            />
            <div
              className="relative p-4 rounded-2xl"
              style={{ background: 'var(--gradient-brand)' }}
            >
              <img
                src="https://i.imgs.ovh/2025/01/20/n6O.png"
                alt="Image Compressor Pro"
                className="w-12 h-12 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <h2
          className="text-5xl font-bold mb-4"
          style={{
            backgroundImage: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          智能图片压缩
        </h2>

        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed theme-text-secondary">
          专业的在线图片压缩工具，智能算法保证最佳质量，精确控制文件大小
        </p>
      </header>

      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <PreferencesModal isOpen={isPreferencesOpen} onClose={() => setIsPreferencesOpen(false)} />
    </>
  )
}
