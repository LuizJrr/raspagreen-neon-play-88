import { useState, useEffect } from "react";

const banners = [
  "/lovable-uploads/2eb6987e-4dca-4e62-ad51-61f3e52cead8.png",
  "/lovable-uploads/57d2b6d5-3646-4351-8904-ef51aecd4470.png"
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden relative bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full aspect-[7/2] object-cover flex-shrink-0"
          />
        ))}
      </div>
      
      {/* Indicadores de slide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}