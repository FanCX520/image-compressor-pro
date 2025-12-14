import React from 'react'
import { FileText, TrendingDown, Zap } from 'lucide-react'
import { CompressedImageData } from '../App'
import { formatFileSize } from '../utils/formatters'

interface CompressionStatsProps {
  data: CompressedImageData
  className?: string
}

export const CompressionStats: React.FC<CompressionStatsProps> = ({ data, className = '' }) => {
  const { originalSize, compressedSize, compressionRatio } = data
  const savings = originalSize - compressedSize
  const savingsPercentage = (savings / originalSize) * 100

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="stat-icon" style={{ background: 'rgba(var(--color-primary), 0.16)' }}>
            <TrendingDown className="w-4 h-4" style={{ color: 'rgb(var(--color-primary))' }} />
          </div>
          <span className="font-semibold theme-text-primary">压缩比例</span>
        </div>
        <div className="text-2xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>
          {(compressionRatio * 100).toFixed(1)}%
        </div>
        <div className="text-sm theme-text-secondary">原始大小的 {(compressionRatio * 100).toFixed(1)}%</div>
      </div>

      <div className="stat-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="stat-icon" style={{ background: 'rgba(var(--color-success), 0.16)' }}>
            <FileText className="w-4 h-4" style={{ color: 'rgb(var(--color-success))' }} />
          </div>
          <span className="font-semibold theme-text-primary">减少大小</span>
        </div>
        <div className="text-2xl font-bold" style={{ color: 'rgb(var(--color-success))' }}>
          {formatFileSize(savings)}
        </div>
        <div className="text-sm theme-text-secondary">节省 {savingsPercentage.toFixed(1)}% 空间</div>
      </div>

      <div className="stat-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="stat-icon" style={{ background: 'rgba(var(--color-secondary), 0.16)' }}>
            <Zap className="w-4 h-4" style={{ color: 'rgb(var(--color-secondary))' }} />
          </div>
          <span className="font-semibold theme-text-primary">最终大小</span>
        </div>
        <div className="text-2xl font-bold" style={{ color: 'rgb(var(--color-secondary))' }}>
          {formatFileSize(compressedSize)}
        </div>
        <div className="text-sm theme-text-secondary">优化后的文件大小</div>
      </div>
    </div>
  )
}
