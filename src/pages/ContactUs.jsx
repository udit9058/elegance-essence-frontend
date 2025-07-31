import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function ContactUs() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Navbar - Rendered immediately without animation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 px-4 sm:px-6 min-h-screen">
        {/* Header */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-center tracking-wide mb-12"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Contact Us
        </h1>

        {/* Contact Information and Map */}
        <div className="max-w-6xl w-full mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Get in Touch */}
          <section>
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 text-center"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Arial', sans-serif" }}>
                    Phone
                  </h3>
                  <p className="text-sm text-gray-600">
                    <a href="tel:+911234567890" className="hover:underline">
                      +91 123-456-7890
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Arial', sans-serif" }}>
                    Email
                  </h3>
                  <p className="text-sm text-gray-600">
                    <a href="mailto:support@eleganceessence.com" className="hover:underline">
                      support@eleganceessence.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Arial', sans-serif" }}>
                    Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    P26C+27C, Maktampur Rd, Maktampur, Bharuch, Gujarat 392012
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ fontFamily: "'Arial', sans-serif" }}>
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/eleganceessence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/eleganceessence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.325-.597 1.325-1.325V1.325C24 .597 23.403 0 22.675 0z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/eleganceessence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06c0 2.385 1.693 4.374 3.946 4.827a4.923 4.923 0 01-2.224.084c.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.115 2.105-.397 0-.79-.023-1.175-.068a13.953 13.953 0 007.548 2.209c9.057 0 14.01-7.507 14.01-14.008 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.59c-.85.378-1.765.63-2.047.649z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Find Us */}
          <section>
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 text-center"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              Find Us
            </h2>
            <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.119627534647!2d73.01802007395602!3d21.710057564032937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0217881631f3b%3A0x84c23bb71d5fc13c!2sAditi%20collection!5e1!3m2!1sen!2sin!4v1753941738149!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Elegance Essence Location"
              ></iframe>
            </div>
          </section>
        </div>
      </main>
    <Footer></Footer>
    </div>
  );
}

export default ContactUs;