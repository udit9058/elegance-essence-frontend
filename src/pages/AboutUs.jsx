import React from 'react';
import Navbar from '../components/navbar';
import one from '../assets/landing-images/one.png';
import two from '../assets/landing-images/two.png';
import three from '../assets/landing-images/three.png';
import video from '../assets/videos/brand-video.mp4';

function AboutUs() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Navbar - Rendered immediately without animation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 sm:px-6 min-h-screen">
        {/* Header */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About Elegance Essence
        </h1>

        {/* Brand Description */}
        <section className="max-w-3xl text-center mb-16">
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
        </section>

        {/* Collection Showcase */}
        <section className="max-w-5xl w-full mb-16">
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
            ].map((item) => (
              <div
                key={item.title}
                className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg"
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
              </div>
            ))}
          </div>
        </section>

        {/* Promotional Video */}
        <section className="max-w-4xl w-full mb-16">
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
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-3xl text-center">
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
          <a
            href="/shop"
            className="inline-block px-6 py-2 rounded-full font-medium transition duration-300 bg-white text-black hover:bg-gray-200"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Shop Now
          </a>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;