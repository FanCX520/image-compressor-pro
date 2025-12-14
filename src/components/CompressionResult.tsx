import React, { useEffect } from 'react'
import { CheckCircle, Eye, RotateCcw } from 'lucide-react'
import { CompressedImageData } from '../App'
import { CompressionStats } from './CompressionStats'
import { DownloadButton } from './DownloadButton'
import { ImagePreview } from './ImagePreview'
import { ProgressBar } from './ProgressBar'

interface CompressionResultProps {
  compressedData: CompressedImageData | null
  isCompressing: boolean
  progress: number
}

export const CompressionResult: React.FC<CompressionResultProps> = ({
  compressedData,
  isCompressing,
  progress,
}) => {
  useEffect(() => {
    return () => {
      if (compressedData) {
        URL.revokeObjectURL(compressedData.originalUrl)
        URL.revokeObjectURL(compressedData.compressedUrl)
      }
    }
  }, [compressedData])

  if (!isCompressing && !compressedData) {
    return (
      <div className="text-center py-12">
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgb(var(--color-surface-tertiary))' }}
        >
          <Eye className="w-12 h-12" style={{ color: 'rgb(var(--color-text-tertiary))' }} />
        </div>
        <h3 className="text-xl font-semibold theme-text-secondary mb-2">等待压缩结果</h3>
        <p className="theme-text-tertiary">设置参数后点击开始压缩</p>
      </div>
    )
  }

  if (isCompressing) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold theme-text-primary mb-2">正在压缩</h2>
          <p className="theme-text-secondary">请稍候，正在优化您的图片...</p>
        </div>

        <ProgressBar progress={progress} isComplete={false} message="智能压缩中..." />

        <div className="theme-panel" style={{ background: 'rgba(var(--color-primary), 0.08)' }}>
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center animate-pulse-soft"
            style={{ background: 'var(--gradient-brand)' }}
          >
            <RotateCcw
              className="w-8 h-8 animate-spin-slow"
              style={{ color: 'rgb(var(--color-text-inverse))' }}
            />
          </div>
          <p className="font-medium" style={{ color: 'rgb(var(--color-primary))' }}>
            正在使用智能算法优化图片质量和大小
          </p>
        </div>
      </div>
    )
  }

  if (!compressedData) return null

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-6 h-6" style={{ color: 'rgb(var(--color-success))' }} />
          <h2 className="text-2xl font-bold theme-text-primary">压缩完成</h2>
        </div>
        <p className="theme-text-secondary">图片已成功压缩，质量保持良好</p>
      </div>

      <CompressionStats data={compressedData} className="mb-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold theme-text-primary text-center">效果对比</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImagePreview
            imageUrl={compressedData.originalUrl}
            fileName={compressedData.originalFile.name}
            fileSize={compressedData.originalSize}
            format={compressedData.originalFile.type.split('/')[1]}
            title="原始图片"
          />

          <ImagePreview
            imageUrl={compressedData.compressedUrl}
            fileName={compressedData.compressedFile.name}
            fileSize={compressedData.compressedSize}
            format={compressedData.compressedFile.type.split('/')[1]}
            title="压缩后"
          />
        </div>
      </div>

      <div className="theme-panel theme-panel--success">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold theme-text-primary mb-2">下载结果</h3>
          <p className="theme-text-secondary text-sm">
            已为您节省{' '}
            {(((compressedData.originalSize - compressedData.compressedSize) / compressedData.originalSize) * 100).toFixed(1)}%
            的存储空间
          </p>
        </div>

        <DownloadButton
          file={compressedData.compressedFile}
          originalFileName={compressedData.originalFile.name}
          className="w-full"
        />

        <div className="mt-4 text-center">
          <p className="text-xs theme-text-tertiary">文件名将自动添加 "_compressed" 后缀</p>
        </div>
      </div>
    </div>
  )
}
