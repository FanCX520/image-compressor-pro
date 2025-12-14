import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { AboutModal } from './AboutModal';

export const Header: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <>
      <header className="text-center my-6 animate-slide-in-up relative">
        {/* Action Buttons */}
        <div className="absolute top-0 right-0 flex gap-2">
          {/* About Button */}
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group"
            title="关于项目"
          >
            <Info className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition-colors" />
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-lg opacity-20 animate-pulse-soft"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 to-emerald-500 p-4 rounded-2xl">
              <img 
                src="/logo.png" 
                alt="Image Compressor Pro" 
                className="w-12 h-12 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          智能图片压缩
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          专业的在线图片压缩工具，智能算法保证最佳质量，精确控制文件大小
        </p>
      </header>

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </>
  );
};