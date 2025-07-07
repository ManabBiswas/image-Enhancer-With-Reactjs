import React from 'react';
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react'; // or wherever it's sourced
const Navbar = () => {
  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">AI Enhancer</h1>
          </motion.div>
          <div className="flex items-center space-x-6">
            <motion.a 
              href="#home" 
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#about" 
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              About
            </motion.a>
            <motion.button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};


export default Navbar
