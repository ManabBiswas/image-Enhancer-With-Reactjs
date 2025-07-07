import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { enhancedImageAPI } from "../utils/enhanceImageApi";
import { Upload, ImageIcon } from 'lucide-react'; // Adjust based on your icon library
const ImageUpload = ({ onImageUpload, isProcessing }) => {
  const [dragOver, setDragOver] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
      try {
        const enhancedURL = await enhancedImageAPI(file);
        setEnhancedImage(enhancedURL);
        setloading(false);
      } catch (error) {
        console.log(error);
        alert("Error while enhancing the image. Please try again later.");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
            ? 'border-blue-400 bg-blue-50/10'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/5'
          } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
          className="hidden"
        />

        <motion.div
          animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Drop your image here
        </h3>
        <p className="text-gray-500 mb-4">
          or click to browse files
        </p>

        <motion.div
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Select Image
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImageUpload;