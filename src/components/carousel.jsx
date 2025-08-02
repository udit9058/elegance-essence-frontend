import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import one from '../assets/landing-images/one.png';
import two from '../assets/landing-images/two.png';
import three from '../assets/landing-images/three.png';
import four from '../assets/landing-images/four.png';
import five from '../assets/landing-images/five.png';

// Card image component
const CardImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full object-cover rounded-[inherit]"
    draggable={false}
  />
);

// Image cards array
const cards = [
  { src: one, alt: 'Card 1', name: 'Velvet Midnight', price: '₹2' },
  { src: two, alt: 'Card 2', name: 'Urban Rose', price: '₹3,' },
  { src: three, alt: 'Card 3', name: 'Galactic Noir', price: '₹2' },
  { src: four, alt: 'Card 4', name: 'Jet Flame', price: '₹3,' },
  { src: five, alt: 'Card 5', name: 'Obsidian Grace', price: '₹2,' },
];

// Animation props for desktop and mobile
const getCardAnimationProps = (pos, isMobile) => {
  if (isMobile) {
    switch (pos) {
      case 0:
        return {
          x: 0,
          y: -10,
          scale: 1,
          zIndex: 10,
          opacity: 1,
          rotateY: 0,
          width: 120,
          height: 180,
          borderRadius: 'lg',
          clipPath: 'none',
          boxShadow: '6px 6px 20px rgba(0,0,0,0.1)',
          cursor: 'default',
        };
      case -1:
        return {
          x: -120,
          y: -70,
          scale: 0.85,
          zIndex: 9,
          opacity: 1,
          rotateY: 15,
          width: 120,
          height: 180,
          borderRadius: 'lg',
          clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
          boxShadow: '5px 5px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer',
        };
      case 1:
        return {
          x: 120,
          y: -70,
          scale: 0.85,
          zIndex: 9,
          opacity: 1,
          rotateY: -15,
          width: 120,
          height: 180,
          borderRadius: 'lg',
          clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
          boxShadow: '5px 5px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer',
        };
      case -2:
        return {
          x: -240,
          y: -70,
          scale: 0.7,
          zIndex: 8,
          opacity: 1,
          rotateY: 15,
          width: 100,
          height: 150,
          borderRadius: 'md',
          clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
          boxShadow: '3px 3px 12px rgba(0,0,0,0.03)',
          cursor: 'pointer',
        };
      case 2:
        return {
          x: 240,
          y: -70,
          scale: 0.7,
          zIndex: 8,
          opacity: 1,
          rotateY: -15,
          width: 100,
          height: 150,
          borderRadius: 'md',
          clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
          boxShadow: '3px 3px 12px rgba(0,0,0,0.03)',
          cursor: 'pointer',
        };
      default:
        return { opacity: 0, x: 0, y: 0, zIndex: 0, cursor: 'default' };
    }
  } else {
    switch (pos) {
      case 0:
        return {
          x: 0,
          y: -15,
          scale: 1,
          zIndex: 10,
          opacity: 1,
          rotateY: 0,
          width: 180,
          height: 260,
          borderRadius: '2xl',
          clipPath: 'none',
          boxShadow: '10px 10px 30px rgba(0,0,0,0.1)',
          cursor: 'default',
        };
      case -1:
        return {
          x: -180,
          y: -110,
          scale: 0.85,
          zIndex: 9,
          opacity: 1,
          rotateY: 20,
          width: 180,
          height: 260,
          borderRadius: '2xl',
          clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
          boxShadow: '8px 8px 24px rgba(0,0,0,0.05)',
          cursor: 'pointer',
        };
      case 1:
        return {
          x: 180,
          y: -110,
          scale: 0.85,
          zIndex: 9,
          opacity: 1,
          rotateY: -20,
          width: 180,
          height: 260,
          borderRadius: '2xl',
          clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
          boxShadow: '8px 8px 24px rgba(0,0,0,0.05)',
          cursor: 'pointer',
        };
      case -2:
        return {
          x: -350,
          y: -110,
          scale: 0.7,
          zIndex: 8,
          opacity: 1,
          rotateY: 20,
          width: 150,
          height: 225,
          borderRadius: 'xl',
          clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
          boxShadow: '5px 5px 16px rgba(0,0,0,0.03)',
          cursor: 'pointer',
        };
      case 2:
        return {
          x: 350,
          y: -110,
          scale: 0.7,
          zIndex: 8,
          opacity: 1,
          rotateY: -20,
          width: 150,
          height: 225,
          borderRadius: 'xl',
          clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
          boxShadow: '5px 5px 16px rgba(0,0,0,0.03)',
          cursor: 'pointer',
        };
      default:
        return { opacity: 0, x: 0, y: 0, zIndex: 0, cursor: 'default' };
    }
  }
};

// Entrance variants for desktop and mobile
const entranceVariants = (isMobile) => ({
  hiddenCenter: { y: isMobile ? 150 : 200, opacity: 0 },
  visibleCenter: { y: 0, opacity: 1, transition: { duration: 1 } },
  hiddenLeft1: { x: 0, y: isMobile ? -60 : -90, opacity: 0 },
  visibleLeft1: {
    x: isMobile ? -120 : -180,
    y: isMobile ? -70 : -110,
    opacity: 1,
    transition: { delay: 1, duration: 0.8 },
  },
  hiddenRight1: { x: 0, y: isMobile ? -60 : -90, opacity: 0 },
  visibleRight1: {
    x: isMobile ? 120 : 180,
    y: isMobile ? -70 : -110,
    opacity: 1,
    transition: { delay: 1, duration: 0.8 },
  },
  hiddenLeft2: { x: isMobile ? -150 : -200, y: isMobile ? -60 : -110, opacity: 0 },
  visibleLeft2: {
    x: isMobile ? -240 : -350,
    y: isMobile ? -70 : -110,
    opacity: 1,
    transition: { delay: 2, duration: 0.6 },
  },
  hiddenRight2: { x: isMobile ? 150 : 200, y: isMobile ? -60 : -110, opacity: 0 },
  visibleRight2: {
    x: isMobile ? 240 : 350,
    y: isMobile ? -70 : -110,
    opacity: 1,
    transition: { delay: 2, duration: 0.6 },
  },
});

// Cart animation variants for desktop and mobile
const cartAnimationVariants = (isMobile) => ({
  initial: { scale: 1, opacity: 1, x: 0, y: 0 },
  animate: (custom) => ({
    x: custom.x,
    y: custom.y,
    scale: isMobile ? 0.4 : 0.3,
    opacity: 0.7,
    transition: { duration: 0.6, ease: 'easeInOut' },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
});

const Carousel = ({
  cartItems,
  setCartItems,
  quantities,
  setQuantities,
  cartRef,
  isLoggedIn,
  setShowLoginPopup,
  showEntranceAnimation,
}) => {
  const [centerIndex, setCenterIndex] = useState(2);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevCard = () => {
    setCenterIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const nextCard = () => {
    setCenterIndex((prev) => (prev + 1) % cards.length);
  };

  const getRelativePos = (index) => {
    let diff = index - centerIndex;
    if (diff < -2) diff += cards.length;
    if (diff > 2) diff -= cards.length;
    return diff;
  };

  const addToCart = (card, cardElement) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    const priceValue = parseFloat(card.price.replace('₹', '').replace(',', ''));
    const quantity = quantities[card.alt] || 1;
    const newCartItem = { ...card, price: priceValue, quantity };

    if (cardElement && cartRef.current) {
      const cardRect = cardElement.getBoundingClientRect();
      const cartRect = cartRef.current.getBoundingClientRect();
      const x = cartRect.left + cartRect.width / 2 - cardRect.left - cardRect.width / 2;
      const y = cartRect.top + cartRect.height / 2 - cardRect.top - cardRect.height / 2;

      setAnimatingItem({
        ...newCartItem,
        x,
        y,
        top: cardRect.top + window.scrollY,
        left: cardRect.left + window.scrollX,
      });

      setTimeout(() => {
        setCartItems((prev) => {
          const updatedCart = [...prev, newCartItem];
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });
        setAnimatingItem(null);
      }, 600);
    } else {
      setCartItems((prev) => {
        const updatedCart = [...prev, newCartItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  return (
    <>
      {isMobile ? (
        // Mobile/Tablet View
        <div className="relative w-full max-w-md mx-auto mt-12 perspective-[600px]">
          {/* Main Carousel */}
          {showEntranceAnimation ? (
            <>
              <motion.div
                initial="hiddenCenter"
                animate="visibleCenter"
                variants={entranceVariants(true)}
                className="relative z-10 w-[120px] h-[180px] bg-white rounded-lg mx-auto"
              >
                <CardImage src={three} alt="Center Card" />
              </motion.div>
              <motion.div
                initial="hiddenLeft1"
                animate="visibleLeft1"
                variants={entranceVariants(true)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[600px]"
                style={{ zIndex: 9 }}
              >
                <div
                  className="w-[120px] h-[180px] bg-white overflow-hidden shadow-md rounded-lg"
                  style={{
                    clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(15deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={two} alt="Left 1" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenRight1"
                animate="visibleRight1"
                variants={entranceVariants(true)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[600px]"
                style={{ zIndex: 9 }}
              >
                <div
                  className="w-[120px] h-[180px] bg-white overflow-hidden shadow-md rounded-lg"
                  style={{
                    clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(-15deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={four} alt="Right 1" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenLeft2"
                animate="visibleLeft2"
                variants={entranceVariants(true)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[600px]"
                style={{ zIndex: 8 }}
              >
                <div
                  className="w-[100px] h-[150px] bg-white overflow-hidden shadow-sm rounded-md"
                  style={{
                    clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(15deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={one} alt="Left 2" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenRight2"
                animate="visibleRight2"
                variants={entranceVariants(true)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[600px]"
                style={{ zIndex: 8 }}
              >
                <div
                  className="w-[100px] h-[150px] bg-white overflow-hidden shadow-sm rounded-md"
                  style={{
                    clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(-15deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={five} alt="Right 2" />
                </div>
              </motion.div>
            </>
          ) : (
            <div className="relative w-full h-[200px] sm:h-[240px] flex justify-center items-center select-none z-10">
              {cards.map((card, i) => {
                const pos = getRelativePos(i);
                const props = getCardAnimationProps(pos, true);
                return (
                  <motion.div
                    key={card.alt + i}
                    initial={false}
                    animate={{
                      x: props.x,
                      y: props.y,
                      scale: props.scale,
                      opacity: props.opacity,
                      rotateY: props.rotateY || 0,
                      zIndex: props.zIndex,
                      width: props.width,
                      height: props.height,
                      borderRadius: props.borderRadius,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute rounded-lg overflow-hidden bg-white shadow-md"
                    style={{
                      clipPath: props.clipPath || 'none',
                      boxShadow: '6px 6px 20px rgba(0,0,0,0.1)',
                      transformStyle: 'preserve-3d',
                      cursor: props.cursor,
                    }}
                    onClick={() => {
                      if (pos !== 0) setCenterIndex(i);
                    }}
                    role="button"
                    tabIndex={pos !== 0 ? 0 : -1}
                    aria-pressed={pos === 0}
                  >
                    <CardImage src={card.src} alt={card.alt} />
                  </motion.div>
                );
              })}
              <button
                onClick={prevCard}
                aria-label="Previous"
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 sm:p-4 z-20 shadow-md border border-white transition duration-300"
                style={{
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.3), inset -1px -1px 4px rgba(255,255,255,0.2)',
                  transform: 'rotateY(10deg)',
                }}
              >
                <span className="text-lg sm:text-xl font-bold">←</span>
              </button>
              <button
                onClick={nextCard}
                aria-label="Next"
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 sm:p-4 z-20 shadow-md border border-white transition duration-300"
                style={{
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.3), inset -1px -1px 4px rgba(255,255,255,0.2)',
                  transform: 'rotateY(-10deg)',
                }}
              >
                <span className="text-lg sm:text-xl font-bold">→</span>
              </button>
            </div>
          )}
          {/* Card Grid */}
          <motion.div
            className="ml-60 mt-4 w-full max-w-md mx-auto perspective-[600px] overflow-x-auto"
            initial={{ y: isMobile ? 50 : 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex gap-4 p-4 justify-center"
              initial={{ x: 0 }}
              animate={{
                x: isMobile ? -centerIndex * 80 : -centerIndex * 120,
                transition: { type: 'spring', stiffness: 300, damping: 40 },
              }}
            >
              {cards.map((card, idx) => {
                const currentQuantity = quantities[card.alt];
                return (
                  <motion.div
                    key={`grid-${idx}`}
                    className={`w-[60px] sm:w-[70px] h-[90px] sm:h-[105px] rounded-lg bg-white overflow-hidden relative shadow-md cursor-pointer flex-shrink-0 ${idx === centerIndex ? 'ring-2 ring-black ring-offset-2' : ''}`}
                    onClick={() => {
                      setCenterIndex(idx);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${card.name}`}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      draggable={false}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-black text-[10px] sm:text-xs text-center py-0.5">
                      {card.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {animatingItem && (
              <motion.div
                key={animatingItem.alt}
                className="fixed w-[60px] sm:w-[70px] h-[90px] sm:h-[105px] rounded-lg overflow-hidden shadow-md z-50"
                style={{
                  top: animatingItem.top,
                  left: animatingItem.left,
                  transformOrigin: 'center center',
                }}
                variants={cartAnimationVariants(true)}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={{ x: animatingItem.x, y: animatingItem.y }}
              >
                <img
                  src={animatingItem.src}
                  alt={animatingItem.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Desktop View
        <>
          {showEntranceAnimation ? (
            <>
              <motion.div
                initial="hiddenCenter"
                animate="visibleCenter"
                variants={entranceVariants(false)}
                className="relative z-10 w-[180px] h-[260px] bg-white rounded-2xl mx-auto"
              >
                <CardImage src={three} alt="Center Card" />
              </motion.div>
              <motion.div
                initial="hiddenLeft1"
                animate="visibleLeft1"
                variants={entranceVariants(false)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[800px]"
                style={{ zIndex: 9 }}
              >
                <div
                  className="w-[180px] h-[260px] bg-white overflow-hidden shadow-lg rounded-[35px]"
                  style={{
                    clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(20deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={two} alt="Left 1" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenRight1"
                animate="visibleRight1"
                variants={entranceVariants(false)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[800px]"
                style={{ zIndex: 9 }}
              >
                <div
                  className="w-[180px] h-[260px] bg-white overflow-hidden shadow-lg rounded-[35px]"
                  style={{
                    clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(-20deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={four} alt="Right 1" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenLeft2"
                animate="visibleLeft2"
                variants={entranceVariants(false)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[800px]"
                style={{ zIndex: 8 }}
              >
                <div
                  className="w-[150px] h-[225px] bg-white overflow-hidden shadow-md rounded-[30px]"
                  style={{
                    clipPath: 'polygon(0% -50%, 100% 5%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(20deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={one} alt="Left 2" />
                </div>
              </motion.div>
              <motion.div
                initial="hiddenRight2"
                animate="visibleRight2"
                variants={entranceVariants(false)}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 perspective-[800px]"
                style={{ zIndex: 8 }}
              >
                <div
                  className="w-[150px] h-[225px] bg-white overflow-hidden shadow-md rounded-[30px]"
                  style={{
                    clipPath: 'polygon(0% 5%, 100% -50%, 100% 100%, 0% 100%)',
                    transform: 'rotateY(-20deg)',
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardImage src={five} alt="Right 2" />
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <div className="relative w-full h-[240px] flex justify-center items-center select-none z-10 mt-24">
                {cards.map((card, i) => {
                  const pos = getRelativePos(i);
                  const props = getCardAnimationProps(pos, false);
                  return (
                    <motion.div
                      key={card.alt + i}
                      initial={false}
                      animate={{
                        x: props.x,
                        y: props.y,
                        scale: props.scale,
                        opacity: props.opacity,
                        rotateY: props.rotateY || 0,
                        zIndex: props.zIndex,
                        width: props.width,
                        height: props.height,
                        borderRadius: props.borderRadius,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute rounded-2xl overflow-hidden bg-white shadow-lg"
                      style={{
                        clipPath: props.clipPath || 'none',
                        boxShadow: '10px 10px 30px rgba(0,0,0,0.1)',
                        transformStyle: 'preserve-3d',
                        cursor: props.cursor,
                      }}
                      onClick={() => {
                        if (pos !== 0) setCenterIndex(i);
                      }}
                      role="button"
                      tabIndex={pos !== 0 ? 0 : -1}
                      aria-pressed={pos === 0}
                    >
                      <CardImage src={card.src} alt={card.alt} />
                    </motion.div>
                  );
                })}
                <button
                  onClick={prevCard}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-4 z-20 shadow-2xl border border-white transition duration-300 ease-in-out hover:scale-105"
                  style={{
                    boxShadow: '4px 4px 10px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.2)',
                    transform: 'rotateY(15deg)',
                  }}
                >
                  <span className="text-xl font-bold">←</span>
                </button>
                <button
                  onClick={nextCard}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-4 z-20 shadow-2xl border border-white transition duration-300 ease-in-out hover:scale-105"
                  style={{
                    boxShadow: '4px 4px 10px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.2)',
                    transform: 'rotateY(-15deg)',
                  }}
                >
                  <span className="text-xl font-bold">→</span>
                </button>
              </div>
              <motion.div
                className="ml-60 mt-0 w-full max-w-[1500px] pb-4 flex justify-center mx-auto perspective-[800px]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="flex gap-6 mt-3 justify-center"
                  initial={{ x: 0 }}
                  animate={{
                    x: -centerIndex * 120,
                    transition: { type: 'spring', stiffness: 300, damping: 40 },
                  }}
                >
                  {cards.map((card, idx) => {
                    const currentQuantity = quantities[card.alt];
                    return (
                      <motion.div
                        key={`grid-${idx}`}
                        className={`w-[80px] h-[120px] rounded-lg bg-white overflow-hidden relative shadow-md cursor-pointer flex-shrink-0 ${idx === centerIndex ? 'ring-2 ring-black ring-offset-2' : ''}`}
                        onClick={() => {
                          setCenterIndex(idx);
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${card.name}`}
                      >
                        <img
                          src={card.src}
                          alt={card.alt}
                          draggable={false}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-10 text-black text-xs text-center py-0 select-text">
                          {card.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {animatingItem && (
                  <motion.div
                    key={animatingItem.alt}
                    className="fixed w-[80px] h-[120px] rounded-lg overflow-hidden shadow-md z-50"
                    style={{
                      top: animatingItem.top,
                      left: animatingItem.left,
                      transformOrigin: 'center center',
                    }}
                    variants={cartAnimationVariants(false)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={{ x: animatingItem.x, y: animatingItem.y }}
                  >
                    <img
                      src={animatingItem.src}
                      alt={animatingItem.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Carousel;