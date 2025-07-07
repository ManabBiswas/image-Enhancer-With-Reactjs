import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Zap, ImageIcon, Download } from 'lucide-react';

const ImagePreview = ({
  originalImage,
  enhancedImage,
  isProcessing,
  onEnhance,
  onDownload,
  onClear,
}) => {
  if (!originalImage) return null;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Image Preview</h2>
          <motion.button
            onClick={onClear}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Image Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original */}
          <motion.div
            className="space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Original
            </h3>
            <div className="relative h-72 bg-gray-400/20 backdrop-blur-2xl rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src={originalImage}
                alt="Original"
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Enhanced */}
          <motion.div
            className="space-y-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Enhanced
            </h3>
            <div className="relative h-72 bg-gray-400/20 backdrop-blur-2xl rounded-2xl flex items-center justify-center overflow-hidden">
              {isProcessing ? (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <p className="text-white mt-4">Enhancing...</p>
                </motion.div>
              ) : enhancedImage ? (
                <motion.img
                  src={enhancedImage}
                  alt="Enhanced"
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Zap className="h-12 w-12 mx-auto mb-2" />
                  <p>Enhanced image will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          className="flex flex-wrap gap-4 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={onEnhance}
            disabled={isProcessing}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isProcessing ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Processing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Enhance Image
              </>
            )}
          </motion.button>

          {enhancedImage && (
            <motion.button
              onClick={onDownload}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImagePreview;