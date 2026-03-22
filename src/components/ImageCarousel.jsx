import React, { useState, useEffect } from "react";
import "../styles/ImageCarousel.css";

function ImageCarousel({ images, autoPlay = true, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  // Next / Prev handlers
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;