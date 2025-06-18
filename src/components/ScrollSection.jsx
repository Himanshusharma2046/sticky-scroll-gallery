import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollSection = ({ section, index, onInView, isActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.4,
    margin: "-20% 0px -20% 0px"
  });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      onInView(index);
      setHasTriggered(true);
    } else if (!isInView && hasTriggered) {
      setHasTriggered(false);
    }
  }, [isInView, index, onInView, hasTriggered]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-end section-padding py-20 ${
        index === 0 ? 'mt-0' : 'mt-20'
      }`}
    >
      <motion.div
        className="w-full max-w-2xl ml-auto glass-effect rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Section Number */}
        <motion.div
          className="flex items-center mb-6"
          variants={itemVariants}
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${section.gradient} flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
        </motion.div>

        {/* Title and Subtitle */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h3 className="text-sm font-medium text-white/60 mb-2 tracking-wider uppercase">
            {section.subtitle}
          </h3>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent leading-tight`}>
            {section.title}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg prose-invert max-w-none"
          variants={itemVariants}
        >
          {section.content.split('\n\n').map((paragraph, pIndex) => (
            <motion.p
              key={pIndex}
              className="text-white/80 leading-relaxed mb-6 text-base lg:text-lg"
              variants={itemVariants}
            >
              {paragraph.trim()}
            </motion.p>
          ))}
        </motion.div>

        {/* Interactive Elements */}
        <motion.div
          className="flex items-center space-x-4 mt-8"
          variants={itemVariants}
        >
          <motion.button
            className={`px-6 py-3 rounded-full bg-gradient-to-r ${section.gradient} text-white font-medium hover:shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More
          </motion.button>
          
          <motion.div
            className="flex space-x-2"
            variants={itemVariants}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute -left-4 top-1/2 transform -translate-y-1/2"
          variants={itemVariants}
        >
          <div className="w-1 h-20 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className={`w-full bg-gradient-to-b ${section.gradient} rounded-full`}
              initial={{ height: 0 }}
              animate={{ height: isActive ? '100%' : '0%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ScrollSection;
