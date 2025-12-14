import React, { useState } from 'react'
import { FileImage, Play, Settings, Sliders, Target } from 'lucide-react'
import { CompressionConfig, CompressedImageData } from '../App'
import { compressImage, createImageUrl } from '../utils/imageCompression'
import { formatFileSize, parseTargetSize } from '../utils/formatters'
import { ProgressBar } from './ProgressBar'

interface CompressionSettingsProps {
  originalImage: File
  config: CompressionConfig
  onConfigChange: (config: CompressionConfig) => void
  onCompressionStart: () => void
  onCompressionComplete: (data: CompressedImageData) => void
  isCompressing: boolean
  progress: number
  onProgressUpdate: (progress: number) => void
}

export const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  originalImage,
  config,
  onConfigChange,
  onCompressionStart,
  onCompressionComplete,
  isCompressing,
  progress,
  onProgressUpdate,
}) => {
  const [targetSizeInput, setTargetSizeInput] = useState('')
  const [compressionMessage, setCompressionMessage] = useState('')
  const [hasTargetSize, setHasTargetSize] = useState(false)

  const handleQualityChange = (quality: number) => {
    onConfigChange({ ...config, quality })
  }

  const handleFormatChange = (format: 'jpeg' | 'png' | 'webp') => {
    onConfigChange({ ...config, outputFormat: format })
  }

  const handleTargetSizeChange = (value: string) => {
    setTargetSizeInput(value)
    const targetSizeKB = parseTargetSize(value)

    if (targetSizeKB && targetSizeKB > 0) {
      setHasTargetSize(true)
      onConfigChange({ ...config, targetSizeKB })
    } else {
      setHasTargetSize(false)
      onConfigChange({ ...config, targetSizeKB: undefined })
    }
  }

  const handleCompress = async () => {
    try {
      onCompressionStart()

      const compressedFile = await compressImage(originalImage, config, (progressData) => {
        setCompressionMessage(progressData.message)
        onProgressUpdate(progressData.progress)
      })

      const originalUrl = createImageUrl(originalImage)
      const compressedUrl = createImageUrl(compressedFile)

      const data: CompressedImageData = {
        originalFile: originalImage,
        compressedFile,
        originalSize: originalImage.size,
        compressedSize: compressedFile.size,
        compressionRatio: compressedFile.size / originalImage.size,
        originalUrl,
        compressedUrl,
      }

      onCompressionComplete(data)
    } catch (error) {
      console.error('Compression failed:', error)
      setCompressionMessage('压缩失败，请重试')
    }
  }

  const getQualityLabel = (quality: number): string => {
    if (quality >= 0.9) return '最高质量'
    if (quality >= 0.7) return '高质量'
    if (quality >= 0.5) return '中等质量'
    if (quality >= 0.3) return '低质量'
    return '最低质量'
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Settings className="w-6 h-6" style={{ color: 'rgb(var(--color-primary))' }} />
          <h2 className="text-2xl font-bold theme-text-primary">压缩设置</h2>
        </div>
        <p className="theme-text-secondary">调整参数以获得最佳压缩效果</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: 'rgb(var(--color-secondary))' }} />
          <label className="font-semibold theme-text-primary">目标文件大小（可选）</label>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="例如: 1.5MB, 500KB"
            value={targetSizeInput}
            onChange={(e) => handleTargetSizeChange(e.target.value)}
            className="theme-input"
            disabled={isCompressing}
          />

          {hasTargetSize && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span
                className="theme-pill"
                style={{ background: 'rgba(var(--color-success), 0.14)', color: 'rgb(var(--color-success))' }}
              >
                ✓ 已设置
              </span>
            </div>
          )}
        </div>

        <p className="text-sm theme-text-tertiary">原始大小: {formatFileSize(originalImage.size)}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5" style={{ color: 'rgb(var(--color-primary))' }} />
          <label className="font-semibold theme-text-primary">图片质量</label>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={config.quality}
            onChange={(e) => handleQualityChange(parseFloat(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            disabled={isCompressing}
          />

          <div className="flex justify-between text-sm">
            <span className="theme-text-tertiary">最小文件</span>
            <span className="font-semibold" style={{ color: 'rgb(var(--color-primary))' }}>
              {(config.quality * 100).toFixed(0)}% - {getQualityLabel(config.quality)}
            </span>
            <span className="theme-text-tertiary">最佳质量</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileImage className="w-5 h-5" style={{ color: 'rgb(var(--color-success))' }} />
          <label className="font-semibold theme-text-primary">输出格式</label>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['jpeg', 'png', 'webp'] as const).map((format) => {
            const active = config.outputFormat === format
            return (
              <button
                key={format}
                type="button"
                onClick={() => handleFormatChange(format)}
                disabled={isCompressing}
                className={`theme-choice hover-lift ${active ? 'theme-choice--active' : ''}`}
              >
                {format.toUpperCase()}
              </button>
            )
          })}
        </div>

        <div className="text-sm theme-text-tertiary space-y-1">
          <div>• JPEG: 最小文件，适合照片</div>
          <div>• PNG: 支持透明，适合图标</div>
          <div>• WebP: 新格式，更高压缩率</div>
        </div>
      </div>

      {isCompressing && (
        <ProgressBar
          progress={progress}
          isComplete={false}
          message={compressionMessage}
          className="mt-6"
        />
      )}

      <button
        type="button"
        onClick={handleCompress}
        disabled={isCompressing}
        className="btn-primary w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg hover-lift"
      >
        <Play className={`w-6 h-6 ${isCompressing ? 'animate-pulse' : ''}`} />
        <span>{isCompressing ? '正在压缩...' : '开始压缩'}</span>
      </button>
    </div>
  )
}
