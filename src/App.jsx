import React, { useState } from "react";
import { motion } from "framer-motion";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TypingEffect from "./Components/TypingEffect";

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (image) => {
    setOriginalImage(image);
    setEnhancedImage(null); // Clear previous result
  };

  const handleEnhance = async () => {
    setIsProcessing(true);
    try {
      // Simulate enhancement call (replace with real API)
      const enhanced = await fakeEnhanceImage(originalImage);
      setEnhancedImage(enhanced);
    } catch (error) {
      console.error("Enhancement failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = enhancedImage;
    link.download = "enhanced-image.png";
    link.click();
  };

  const onClear = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
  };

  // Dummy enhancer for demonstration
  const fakeEnhanceImage = (image) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(image), 2000);
    });

  return (
    <>
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className="text-5xl font-bold m-4">
            <TypingEffect text="It's a free image enhancer" />
          </h1>
          <div className="mt-4">
            <h2>
              <TypingEffect text="Enhance images with AI, made by Manab Biswas!" />
            </h2>
          </div>
          <p className="text-xl text-gray-300 my-2.5">
            Upload the Image to enhance with AI
          </p>
          <p>Made By Manab Biswas</p>
          <p>Powered By picWish API</p>
          <p>Special thanks to Sheryian Coding School</p>
        </motion.div>
      </motion.div>
      <Home
        originalImage={originalImage}
        enhancedImage={enhancedImage}
        isProcessing={isProcessing}
        onImageUpload={handleImageUpload}
        onEnhance={handleEnhance}
        onDownload={handleDownload}
        onClear={onClear}
      />
      <Footer />
    </>
  );
};

export default App;