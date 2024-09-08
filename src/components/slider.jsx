import React, { useState, useEffect, useCallback } from 'react';

const Slider = ({ slides }) => {
  if (!slides) {
    slides = [];
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative flex justify-center items-center mb-6">
      <div className="overflow-hidden w-full h-96 flex justify-center">
        <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 flex justify-center">
              <img src={slide.src} alt={slide.alt} className="w-1/2 h-96 object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600">
        ‹
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600">
        ›
      </button>
    </div>
  );
};

export default Slider;