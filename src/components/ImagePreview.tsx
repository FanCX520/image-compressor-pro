import React from 'react'
import { formatFileSize } from '../utils/formatters'

interface ImagePreviewProps {
  imageUrl: string
  fileName: string
  fileSize: number
  format: string
  title: string
  className?: string
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  fileName,
  fileSize,
  format,
  title,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold theme-text-primary">{title}</h4>

      <div className="theme-dashed-surface">
        <img
          src={imageUrl}
          alt={fileName}
          className="w-full h-48 object-contain rounded-lg"
          style={{ background: 'rgb(var(--color-surface-primary))' }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="theme-text-secondary">文件大小:</span>
          <span className="file-size-badge">{formatFileSize(fileSize)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="theme-text-secondary">格式:</span>
          <span className={`format-badge format-${format.toLowerCase()}`}>{format.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
