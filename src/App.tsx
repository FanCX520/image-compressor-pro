import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CompressionSettings } from './components/CompressionSettings';
import { CompressionResult } from './components/CompressionResult';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.css';

export interface CompressionConfig {
    targetSizeKB?: number;
    quality: number;
    outputFormat: 'jpeg' | 'png' | 'webp';
    maxWidth?: number;
    maxHeight?: number;
}

export interface CompressedImageData {
    originalFile: File;
    compressedFile: File;
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    originalUrl: string;
    compressedUrl: string;
}

function App() {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [compressionConfig, setCompressionConfig] = useState<CompressionConfig>({
        quality: 0.8,
        outputFormat: 'jpeg'
    });
    const [compressedData, setCompressedData] = useState<CompressedImageData | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState(0);

    const handleImageUpload = (file: File) => {
        setOriginalImage(file);
        setCompressedData(null);
        setCompressionProgress(0);
    };

    const handleCompressionComplete = (data: CompressedImageData) => {
        setCompressedData(data);
        setIsCompressing(false);
        setCompressionProgress(100);
    };

    const handleCompressionStart = () => {
        setIsCompressing(true);
        setCompressionProgress(0);
    };

    const handleReset = () => {
        setOriginalImage(null);
        setCompressedData(null);
        setIsCompressing(false);
        setCompressionProgress(0);
    };

    return (
        <div 
            className="min-h-screen motion-deliberate"
            style={{
                background: 'var(--bg-gradient-primary)',
            }}
        >
            <div className="container mx-auto px-4 py-8 mb-10">
                <Header />

                <main className="max-w-6xl mx-auto space-y-8 motion-moderate">
                    {/* Upload Section */}
                    <div className="glass-card motion-quick" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                        <ImageUploader
                            onImageUpload={handleImageUpload}
                            isCompressing={isCompressing}
                            onReset={handleReset}
                        />
                    </div>

                    {/* Settings and Processing */}
                    {originalImage && (
                        <div className="grid lg:grid-cols-2 gap-8 motion-moderate">
                            {/* Compression Settings */}
                            <div className="glass-card motion-quick" style={{ borderRadius: 'var(--radius-large)', padding: 'var(--space-6)' }}>
                                <CompressionSettings
                                    originalImage={originalImage}
                                    config={compressionConfig}
                                    onConfigChange={setCompressionConfig}
                                    onCompressionStart={handleCompressionStart}
                                    onCompressionComplete={handleCompressionComplete}
                                    isCompressing={isCompressing}
                                    progress={compressionProgress}
                                    onProgressUpdate={setCompressionProgress}
                                />
                            </div>

                            {/* Results */}
                            <div className="glass-card motion-quick" style={{ borderRadius: 'var(--radius-large)', padding: 'var(--space-6)' }}>
                                <CompressionResult
                                    compressedData={compressedData}
                                    isCompressing={isCompressing}
                                    progress={compressionProgress}
                                />
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default App;