import React, { useState, useEffect } from 'react';

const InsuranceSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider items data
  const sliderItems = [
    {
      id: 1,
      title: "Asset Management",
      subtitle: "Add your car/bike to get",
      highlightText: "exclusive offers, renewal updates & plans",
      buttonText: "Add vehicle",
      color: "bg-cyan-500",
      icon: "🚗",
      iconComponent: (
        <div className="flex justify-end">
          <img src="/api/placeholder/150/100" alt="Car illustration" />
        </div>
      )
    },
    {
      id: 2,
      title: "Investment Plans",
      subtitle: "Invest ₹10K and Get",
      highlightText: "₹1 Crore return*",
      buttonText: "Invest now",
      color: "bg-green-400",
      icon: "💰",
      iconComponent: (
        <div className="flex justify-end">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-3xl">
            ₹
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Health Insurance",
      subtitle: "Book",
      highlightText: "Free Health Insurance Consultation",
      extraText: "at home",
      buttonText: "Book home visit",
      color: "bg-blue-500",
      icon: "❤️",
      iconComponent: (
        <div className="flex justify-end">
          <img src="/api/placeholder/120/120" alt="Doctor illustration" />
        </div>
      )
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === sliderItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sliderItems.length]);

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-12">
      {/* Slider container */}
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderItems.map((item) => (
            <div 
              key={item.id}
              className={`w-full flex-shrink-0 ${item.color} text-white rounded-lg overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="p-8 flex-1">
                  <p className="text-sm mb-1">{item.title}</p>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{item.subtitle}</p>
                    <h3 className="text-2xl md:text-3xl font-bold">{item.highlightText}</h3>
                    {item.extraText && (
                      <p className="text-lg">{item.extraText}</p>
                    )}
                  </div>
                  <button className="mt-6 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
                    {item.buttonText}
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center relative p-6">
                  {item.iconComponent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full transition-colors duration-300 shadow-md z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full transition-colors duration-300 shadow-md z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InsuranceSlider;