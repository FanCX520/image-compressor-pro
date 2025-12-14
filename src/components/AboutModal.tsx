import React from 'react'
import { Globe, Shield, Sparkles, Target, X, Zap } from 'lucide-react'
import { CompressIcon } from './CompressIcon'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'var(--overlay-backdrop)' }}
      onClick={onClose}
    >
      <div
        className="glass-card elevation-5 max-w-2xl w-full max-h-[90vh] flex flex-col motion-moderate"
        style={{ borderRadius: 'var(--radius-2xl)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: 'var(--space-6)', borderBottom: 'var(--border-prominent)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'var(--gradient-brand)' }}>
              <CompressIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold theme-text-primary">关于智能图片压缩专家</h2>
          </div>

          <button type="button" onClick={onClose} className="icon-button" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6" style={{ padding: 'var(--space-6)' }}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold theme-text-primary">项目介绍</h3>
            <p className="theme-text-secondary leading-relaxed">
              智能图片压缩专家是一款专业的在线图片压缩工具，采用先进的压缩算法，能够在保持图片质量的同时显著减小文件大小。
              支持多种图片格式，提供精确的文件大小控制，是您处理图片的最佳选择。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold theme-text-primary">核心功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="feature-card" style={{ background: 'rgba(var(--color-primary), 0.08)' }}>
                <Zap className="w-6 h-6 mt-0.5" style={{ color: 'rgb(var(--color-primary))' }} />
                <div>
                  <h4 className="font-semibold theme-text-primary">极速压缩</h4>
                  <p className="text-sm theme-text-secondary">采用多线程处理，压缩速度快</p>
                </div>
              </div>

              <div className="feature-card" style={{ background: 'rgba(var(--color-success), 0.10)' }}>
                <Shield className="w-6 h-6 mt-0.5" style={{ color: 'rgb(var(--color-success))' }} />
                <div>
                  <h4 className="font-semibold theme-text-primary">隐私保护</h4>
                  <p className="text-sm theme-text-secondary">本地处理，图片不上传服务器</p>
                </div>
              </div>

              <div className="feature-card" style={{ background: 'rgba(var(--color-secondary), 0.10)' }}>
                <Target className="w-6 h-6 mt-0.5" style={{ color: 'rgb(var(--color-secondary))' }} />
                <div>
                  <h4 className="font-semibold theme-text-primary">精确控制</h4>
                  <p className="text-sm theme-text-secondary">可设置目标文件大小</p>
                </div>
              </div>

              <div className="feature-card" style={{ background: 'rgba(var(--color-warning), 0.12)' }}>
                <Sparkles className="w-6 h-6 mt-0.5" style={{ color: 'rgb(var(--color-warning))' }} />
                <div>
                  <h4 className="font-semibold theme-text-primary">智能算法</h4>
                  <p className="text-sm theme-text-secondary">自动优化压缩参数</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold theme-text-primary">支持格式</h3>
            <div className="flex flex-wrap gap-2">
              <span className="format-badge format-jpeg">JPEG</span>
              <span className="format-badge format-png">PNG</span>
              <span className="format-badge format-webp">WebP</span>
            </div>
            <p className="text-sm theme-text-tertiary">支持主流图片格式的输入和输出，满足不同场景需求</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold theme-text-primary">技术特点</h3>
            <ul className="space-y-2 theme-text-secondary">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: 'rgb(var(--color-primary))' }} />
                <span>基于现代 Web 技术构建，无需安装</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: 'rgb(var(--color-success))' }} />
                <span>客户端处理，保护用户隐私安全</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: 'rgb(var(--color-warning))' }} />
                <span>Web Worker 多线程处理，提升性能</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: 'rgb(var(--color-secondary))' }} />
                <span>二分搜索算法，精确控制文件大小</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl" style={{ background: 'rgb(var(--color-surface-secondary))', padding: 'var(--space-4)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold theme-text-primary">版本信息</h4>
                <p className="text-sm theme-text-secondary">当前版本：v1.0.0</p>
              </div>
              <div className="text-right text-sm theme-text-tertiary">
                <p>构建于 React + TypeScript</p>
                <p>使用 Vite + Tailwind CSS</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: 'var(--border-prominent)', paddingTop: 'var(--space-6)' }}>
            <div className="text-center">
              <p className="text-sm theme-text-tertiary">智能图片压缩专家 - 让图片处理更简单</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
