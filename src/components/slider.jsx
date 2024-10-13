import React, { useState, useEffect } from 'react';
import Divergent from '../assets/divergent.png';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: Divergent, alt: 'Popular Movie 1' },
    { src: 'https://via.placeholder.com/600x400', alt: 'Popular Movie 2' },
    { src: 'https://via.placeholder.com/600x400', alt: 'Popular Movie 3' },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]); // Only depend on currentSlide

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative flex justify-center items-center mb-6">
      {/* Slider Container */}
      <div className="overflow-hidden w-full h-96 flex justify-center">
        <div id="slider" className="flex transition-transform ease-out duration-500">
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 flex justify-center">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-1/2 h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
      >
        <span className="leading-none relative -top-2">‹</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
      >
        <span className="leading-none relative -top-2">›</span>
      </button>
    </div>
  );
};

export default Slider;
