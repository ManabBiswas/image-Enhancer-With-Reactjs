import React from 'react'
import { motion } from 'framer-motion';
import ImagePreview from '../Components/ImagePreview'
import ImageUpload from '../Components/imageUpload'

const Home = ({ originalImage, enhancedImage, isProcessing, onImageUpload, onEnhance, onDownload, onClear }) => {
  return (
    <motion.div
      className="min-h-screen pt-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <ImageUpload onImageUpload={onImageUpload} isProcessing={isProcessing} />
        <ImagePreview
          originalImage={originalImage}
          enhancedImage={enhancedImage}
          isProcessing={isProcessing}
          onEnhance={onEnhance}
          onDownload={onDownload}
          onClear={onClear}
        />
      </div>
    </motion.div>
  );
};

export default Home
