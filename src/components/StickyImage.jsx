import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyImage = ({ currentImage, images, scrollProgress, activeSection }) => {
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentImageSrc, setCurrentImageSrc] = useState(currentImage);
  const preloadedImages = useRef(new Set());

  // Preload all images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((imageSrc) => {
        if (!preloadedImages.current.has(imageSrc)) {
          const img = new Image();
          img.onload = () => {
            setImageLoaded(prev => ({ ...prev, [imageSrc]: true }));
            preloadedImages.current.add(imageSrc);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
          };
          img.src = imageSrc;
        }
      });
    };

    preloadImages();
  }, [images]);

  // Update current image when activeSection changes
  useEffect(() => {
    if (currentImage && currentImage !== currentImageSrc) {
      setCurrentImageSrc(currentImage);
    }
  }, [currentImage, currentImageSrc]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentImageSrc}-${activeSection}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: `brightness(${0.6 + scrollProgress * 0.2}) contrast(${1.1 + scrollProgress * 0.1})`
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative w-full h-full"
        >
          {/* Main Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${currentImageSrc})`,
              transform: `scale(${1 + scrollProgress * 0.05})`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          {/* Multiple Gradient Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          
          {/* Dynamic Color Overlay based on section */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                ${activeSection === 0 ? 'rgba(147, 51, 234, 0.1)' : 
                  activeSection === 1 ? 'rgba(59, 130, 246, 0.1)' : 
                  'rgba(16, 185, 129, 0.1)'} 0%, 
                transparent 50%, 
                ${activeSection === 0 ? 'rgba(219, 39, 119, 0.1)' : 
                  activeSection === 1 ? 'rgba(99, 102, 241, 0.1)' : 
                  'rgba(6, 182, 212, 0.1)'} 100%)`
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}-${activeSection}`}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          {/* Loading State */}
          {!imageLoaded[currentImageSrc] && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-white/60 text-sm">Loading...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StickyImage;
