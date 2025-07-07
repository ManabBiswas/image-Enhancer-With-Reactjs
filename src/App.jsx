import React from "react";
import { motion } from "framer-motion";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TypingEffect from "./Components/TypingEffect";

const App = () => {
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
            <TypingEffect text="It's a free image enhancer"/></h1>
          <div className="mt-4">
            <h2>
              {" "}
              <TypingEffect text="Enhance images with AI, made by Manab Biswas!" />
            </h2>{" "}
          </div>
          <p className="text-xl text-gray-300 my-2.5">
            Upload the Image to enhance with AI
          </p>
          <p className="">Made By Manab Biswas</p>
          <p className="">Powered By picWish API</p>
          <p className="">Special thanks to Sheryian Coding School</p>
        </motion.div>
      </motion.div>
      <Home />
      <Footer />
    </>
  );
};

export default App;
