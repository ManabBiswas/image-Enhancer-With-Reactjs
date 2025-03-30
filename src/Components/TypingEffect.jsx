import React from 'react';
import { motion } from "framer-motion";

const TypingEffect = ({ text }) => {
  return (
    <div>
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: index * 0.3 }}
          style={{ marginRight: '8px' }} // Add spacing between words
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default TypingEffect;