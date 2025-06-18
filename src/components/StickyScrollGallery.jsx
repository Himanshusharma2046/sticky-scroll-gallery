import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StickyImage from './StickyImage';
import ScrollSection from './ScrollSection';
import NavigationDots from './NavigationDots';
import useScrollPosition from '../hooks/useScrollPosition';
import { sectionsData } from '../data/sectionsData';
import { throttle } from '../utils/scrollUtils';

const StickyScrollGallery = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const { scrollPosition, scrollDirection } = useScrollPosition();

  // Get all images including hero
  const allImages = ['/images/hero-bg.jpg', ...sectionsData.map(section => section.image)];

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = allImages.map((imageSrc) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(imageSrc);
          img.onerror = () => {
            console.error(`Failed to load: ${imageSrc}`);
            resolve(imageSrc); // Resolve anyway to not block loading
          };
          img.src = imageSrc;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Handle section changes with better logic
  const handleSectionInView = useCallback(
    throttle((sectionIndex) => {
      if (sectionIndex !== activeSection) {
        setActiveSection(sectionIndex);
      }
    }, 150),
    [activeSection]
  );

  // Determine current image based on scroll position and active section
  const getCurrentImage = () => {
    if (scrollPosition < window.innerHeight * 0.5) {
      return '/images/hero-bg.jpg';
    }
    return sectionsData[activeSection]?.image || sectionsData[0].image;
  };

  const scrollProgress = Math.min(scrollPosition / (document.body.scrollHeight - window.innerHeight), 1);
  const currentImage = getCurrentImage();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-white/80 text-lg mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Experience...
          </motion.p>
          <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: imagesPreloaded ? '100%' : '60%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Sticky Background Image */}
      <StickyImage
        currentImage={currentImage}
        images={allImages}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center text-center section-padding z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-6xl lg:text-8xl font-black mb-6 text-white leading-tight drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sticky Scroll
            <br />
            Gallery
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of web interactions through immersive
            <br />
            storytelling and cutting-edge design
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('section-0')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Journey
            </motion.button>
            
            <motion.button
              className="px-8 py-4 glass-effect text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-white/70"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-10">
        {sectionsData.map((section, index) => (
          <div key={section.id} id={`section-${index}`}>
            <ScrollSection
              section={section}
              index={index}
              onInView={handleSectionInView}
              isActive={activeSection === index}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <NavigationDots
        sections={sectionsData}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />

       {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
      />

      {/* Floating Action Button */}
      <AnimatePresence>
        {scrollPosition > 200 && (
          <motion.button
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-full shadow-2xl z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StickyScrollGallery;
