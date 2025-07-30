import React, { useState } from 'react';
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

  const getCardAnimationProps = (pos) => {
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
  };

  const entranceVariants = {
    hiddenCenter: { y: 200, opacity: 0 },
    visibleCenter: { y: 0, opacity: 1, transition: { duration: 1 } },
    hiddenLeft1: { x: 0, y: -90, opacity: 0 },
    visibleLeft1: { x: -180, y: -110, opacity: 1, transition: { delay: 1, duration: 0.8 } },
    hiddenRight1: { x: 0, y: -90, opacity: 0 },
    visibleRight1: { x: 180, y: -110, opacity: 1, transition: { delay: 1, duration: 0.8 } },
    hiddenLeft2: { x: -200, y: -110, opacity: 0 },
    visibleLeft2: { x: -350, y: -110, opacity: 1, transition: { delay: 2, duration: 0.6 } },
    hiddenRight2: { x: 200, y: -110, opacity: 0 },
    visibleRight2: { x: 350, y: -110, opacity: 1, transition: { delay: 2, duration: 0.6 } },
  };

  const cartAnimationVariants = {
    initial: { scale: 1, opacity: 1, x: 0, y: 0 },
    animate: (custom) => ({
      x: custom.x,
      y: custom.y,
      scale: 0.3,
      opacity: 0.7,
      transition: { duration: 0.6, ease: 'easeInOut' },
    }),
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const addToCart = (card, cardElement) => {
    if (!cardElement || !cartRef.current) return;

    const cardRect = cardElement.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();
    const x = cartRect.left + cartRect.width / 2 - cardRect.left - cardRect.width / 2;
    const y = cartRect.top + cartRect.height / 2 - cardRect.top - cardRect.height / 2;

    const priceValue = parseFloat(card.price.replace('₹', '').replace(',', ''));
    const quantity = quantities[card.alt] || 1;
    const newCartItem = { ...card, price: priceValue, quantity };

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
  };

  return (
    <>
      {showEntranceAnimation ? (
        <>
          <motion.div
            initial="hiddenCenter"
            animate="visibleCenter"
            variants={entranceVariants}
            className="relative z-10 w-[180px] h-[260px] bg-white rounded-2xl mx-auto"
          >
            <CardImage src={three} alt="Center Card" />
          </motion.div>
          <motion.div
            initial="hiddenLeft1"
            animate="visibleLeft1"
            variants={entranceVariants}
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
            variants={entranceVariants}
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
            variants={entranceVariants}
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
            variants={entranceVariants}
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
              const props = getCardAnimationProps(pos);
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
                    boxShadow: props.boxShadow,
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
            className="mt-0 ml-60 overflow-hidden w-full max-w-[1500px] pb-4 flex justify-center mx-auto perspective-[800px]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex gap-6 mt-3"
              initial={{ x: 100 }}
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
                    className={`group w-[80px] h-[120px] rounded-lg bg-white overflow-hidden relative shadow-md cursor-pointer flex-shrink-0 ${idx === centerIndex ? 'ring-2 ring-black ring-offset-2' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowLoginPopup(true);
                      } else {
                        setCenterIndex(idx);
                      }
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
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end items-center pb-2">
                      <span className="text-white text-xs font-bold">{card.price}</span>
                      <div className="mt-1">
                        <label htmlFor={`quantity-${card.alt}`} className="mr-1 text-xs text-white">
                          Qty:
                        </label>
                        <input
                          id={`quantity-${card.alt}`}
                          type="number"
                          min="1"
                          max="12"
                          value={currentQuantity}
                          onChange={(e) =>
                            setQuantities((prev) => ({
                              ...prev,
                              [card.alt]: parseInt(e.target.value) || 1,
                            }))
                          }
                          className="w-10 p-0.5 border rounded text-white text-xs"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) {
                            setShowLoginPopup(true);
                          } else {
                            addToCart(card, e.currentTarget.closest('.group'));
                          }
                        }}
                        className="bg-white text-black text-xs px-2 py-0.5 rounded-full hover:bg-gray-200 transition duration-200 mt-1"
                        aria-label={`Add ${card.name} to cart`}
                      >
                        Add to Cart
                      </button>
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
                variants={cartAnimationVariants}
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
  );
};

export default Carousel;