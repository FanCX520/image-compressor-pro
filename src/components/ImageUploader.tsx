import React, { useRef, useState } from 'react'
import { FileText, Image as ImageIcon, Upload, X } from 'lucide-react'
import { formatFileSize } from '../utils/formatters'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  isCompressing: boolean
  onReset: () => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  isCompressing,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')

  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return '仅支持 JPEG, PNG, WebP 格式的图片'
    }
    if (file.size > maxSize) {
      return '文件大小不能超过 10MB'
    }
    return null
  }

  const handleFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setUploadedFile(file)
    onImageUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleReset = () => {
    setUploadedFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold theme-text-primary mb-2">上传图片</h2>
        <p className="theme-text-secondary">支持 JPEG, PNG, WebP 格式，最大 10MB</p>
      </div>

      {!uploadedFile ? (
        <div
          className={`theme-dropzone hover-lift ${dragActive ? 'theme-dropzone--active' : 'theme-dropzone--idle'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isCompressing}
          />

          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-brand-gradient rounded-2xl flex items-center justify-center">
              <Upload className="w-10 h-10" style={{ color: 'rgb(var(--color-text-inverse))' }} />
            </div>

            <div>
              <p className="text-lg font-semibold theme-text-primary mb-2">拖拽图片到此处，或点击选择文件</p>
              <p className="text-sm theme-text-tertiary">支持 JPEG, PNG, WebP • 最大 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="theme-panel theme-panel--success">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success-gradient rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6" style={{ color: 'rgb(var(--color-text-inverse))' }} />
              </div>
              <div>
                <h3 className="font-semibold theme-text-primary">{uploadedFile.name}</h3>
                <p className="text-sm theme-text-secondary flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: 'rgb(var(--color-text-tertiary))' }} />
                  {formatFileSize(uploadedFile.size)}
                  <span className="theme-pill" style={{ background: 'rgba(var(--color-success), 0.14)', color: 'rgb(var(--color-success))' }}>
                    {uploadedFile.type.split('/')[1].toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              disabled={isCompressing}
              className="icon-button icon-button--danger"
              title="重新选择图片"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="rounded-xl" style={{ background: 'rgba(var(--color-surface-primary), 0.6)', padding: 'var(--space-4)' }}>
            <p className="text-sm theme-text-secondary mb-2">图片信息:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="theme-text-tertiary">文件大小:</span>
                <span className="ml-2 font-semibold theme-text-primary">{formatFileSize(uploadedFile.size)}</span>
              </div>
              <div>
                <span className="theme-text-tertiary">格式:</span>
                <span className="ml-2 font-semibold theme-text-primary">{uploadedFile.type.split('/')[1].toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="theme-panel theme-panel--danger flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(var(--color-danger), 0.15)' }}
          >
            <X className="w-4 h-4" style={{ color: 'rgb(var(--color-danger))' }} />
          </div>
          <p className="font-medium" style={{ color: 'rgb(var(--color-danger))' }}>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
