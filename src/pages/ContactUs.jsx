import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

function ContactUs() {
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntranceDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundColor: entranceDone ? '#ffffff' : '#000000',
        color: entranceDone ? '#000000' : '#ffffff',
      }}
    >
      <Navbar entranceDone={entranceDone} />
      <main className="flex flex-col items-center pt-20 px-4 sm:px-6 min-h-screen">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-center tracking-wide"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Contact Us
        </h1>
        <h2 className='text-3xl xl:text-4xl font-extrabold text-center tracking-wide mt-50'
          style={{
            fontFamily: "'Brush Script MT', cursive",
            background: 'white',
          }}
        >Comming soon </h2>
      </main>
    </motion.div>
  );
}

export default ContactUs;