import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import one from '../assets/landing-images/one.png';
import two from '../assets/landing-images/two.png';
import three from '../assets/landing-images/three.png';

function AboutUs() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // 3D card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      boxShadow: '8px 8px 24px rgba(255,255,255,0.2)', // Adjusted for dark mode
      transition: { duration: 0.3 },
    },
  };

  // Video animation variants
  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <motion.div className="relative min-h-screen bg-black text-white">
      {/* Navbar - Rendered immediately without animation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 sm:px-6 min-h-screen">
        {/* Header */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          About Elegance Essence
        </motion.h1>

        {/* Brand Description */}
        <motion.section
          className="max-w-3xl text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h2
            className="text-xl sm:text-2xl font-semibold mb-4"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Our Story
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Elegance Essence is your premier online destination for branded costumes, where tradition meets modernity. We curate a stunning collection of Indian, Indo-Western, and Western wear, designed to celebrate your unique style. Our passion is to empower you with outfits that exude sophistication, crafted with the finest materials and inspired by the latest fashion trends.
          </p>
        </motion.section>

        {/* Collection Showcase with 3D Cards */}
        <motion.section
          className="max-w-5xl w-full mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <h2
            className="text-xl sm:text-2xl font-semibold mb-8 text-center"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Our Diverse Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Indian Wear',
                image: one,
                description: 'Vibrant sarees, lehengas, and kurtas that capture the essence of tradition.',
              },
              {
                title: 'Indo-Western Fusion',
                image: two,
                description: 'Blending cultural elegance with modern flair for a unique style.',
              },
              {
                title: 'Western Wear',
                image: three,
                description: 'Chic dresses and trendy outfits for every occasion.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '800px',
                }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-[512px] sm:max-h-[768px] object-contain"
                />
                <div className="p-4 text-center">
                  <h3
                    className="text-lg sm:text-xl font-medium mb-2 text-white"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-gray-300"
                    style={{ fontFamily: "'Arial', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Promotional Video */}
        <motion.section
          className="max-w-4xl w-full mb-16"
          variants={videoVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h2
            className="text-xl sm:text-2xl font-semibold mb-6 text-center"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Discover Our Vision
          </h2>
          <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="../assets/videos/brand-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="max-w-3xl text-center"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <h2
            className="text-xl sm:text-2xl font-semibold mb-4"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Shop with Elegance
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Dive into our exclusive collections and find the perfect outfit that defines your elegance. At Elegance Essence, every piece tells a story of style and craftsmanship.
          </p>
          <motion.a
            href="/shop"
            className="inline-block px-6 py-2 rounded-full font-medium transition duration-300 bg-white text-black hover:bg-gray-200"
            style={{ fontFamily: "'Arial', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.a>
        </motion.section>
      </main>
    </motion.div>
  );
}

export default AboutUs;