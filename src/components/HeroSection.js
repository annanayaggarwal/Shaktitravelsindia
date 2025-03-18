import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QueryForm from '../components/QueryForm';

const InsuranceCard = ({ title, icon, discount, subtitle, id }) => (
  <Link 
    to={`/package/${id}`}
    className="block"
  >
    <div 
      className="relative bg-white rounded-lg p-4 text-center shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer" 
      style={{ 
        perspective: '1000px', 
        transform: 'rotateX(2deg)', 
        transformStyle: 'preserve-3d'
      }}
    >
      {discount && (
        <div className="absolute top-0 left-0 bg-green-100 text-green-800 text-xs px-6 py-1 rounded-tl-lg rounded-br-lg">
          {discount}
        </div>
      )}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 text-5xl">{icon}</div>
        <div>
          <p className="text-gray-700 text-sm">{title}</p>
          {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
        </div>
      </div>
    </div>
  </Link>
);

const PromoBanner = ({ title, amount, rate, buttonText }) => (
  <div 
    className="bg-blue-900 text-white rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl" 
    style={{ 
      perspective: '1000px', 
      transform: 'rotateX(1deg) rotateY(0.5deg)',
      transformStyle: 'preserve-3d'
    }}
  >
    <div className="relative z-10">
      <div className="inline-block bg-teal-400 text-blue-900 px-3 py-1 rounded-full text-sm mb-3">
        {title}
      </div>
      <h3 className="text-2xl mb-2">₹{amount} {title}</h3>
      <p className="text-sm mb-4">starting @ ₹{rate}/month</p>
    </div>
    <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-blue-800 opacity-30"></div>
    <div className="absolute -right-10 -bottom-20 w-32 h-32 rounded-full bg-blue-800 opacity-40"></div>
  </div>
);

// New Promo Slider Component to replace ALSO BUY section
const PromoSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Slider items data
  const sliderItems = [
    {
      id: 1,
      title: "Asset Management",
      subtitle: "Add your car/bike to get",
      highlightText: "exclusive offers, renewal updates & plans",
      buttonText: "Add vehicle",
      color: "bg-cyan-500",
      // image: "/api/placeholder/160/100"
    },
    {
      id: 2,
      title: "Investment Plans",
      subtitle: "Invest ₹10K and Get",
      highlightText: "₹1 Crore return*",
      buttonText: "Invest now",
      color: "bg-green-400",
      // image: "/api/placeholder/120/100"
    },
    {
      id: 3,
      title: "Health Insurance",
      subtitle: "Book Free Health Insurance",
      highlightText: "Consultation at home",
      buttonText: "Book home visit",
      color: "bg-blue-500",
      // image: "/api/placeholder/150/100"
    }
  ];

  // Handle slide click
  const handleSlideClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative w-full my-8">
      <h2 className="text-blue-600 font-medium mb-4 relative">
        PROMOTIONS
        <div className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500"></div>
      </h2>
      
      {/* Slider container - Now displaying all slides at once */}
      <div className="rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          {sliderItems.map((item, index) => (
            <div 
              key={item.id}
              className={`${item.color} text-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${activeSlide === index ? ' transform scale-105' : 'opacity-90 hover:opacity-100'}`}
              onClick={() => handleSlideClick(index)}
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex-1">
                  <p className="text-sm mb-1">{item.title}</p>
                  <div className="space-y-1">
                    <p className="text-lg font-medium">{item.subtitle}</p>
                    <h3 className="text-xl font-bold">{item.highlightText}</h3>
                  </div>
                  <button className="mt-4 bg-white text-gray-800 px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors duration-300">
                    {item.buttonText}
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator - optional, can be removed since all slides are visible */}
      <div className="flex justify-center space-x-2 mt-4">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const getIconForInsurance = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('term') || lowerTitle.includes('life')) return '☂️';
  if (lowerTitle.includes('health')) return '❤️';
  if (lowerTitle.includes('investment')) return '💰';
  if (lowerTitle.includes('car') || lowerTitle.includes('motor')) return '🚗';
  if (lowerTitle.includes('wheeler') || lowerTitle.includes('bike')) return '🛵';
  if (lowerTitle.includes('family')) return '👨‍👩‍👧‍👦';
  if (lowerTitle.includes('women')) return '👩';
  if (lowerTitle.includes('home')) return '🏠';
  if (lowerTitle.includes('travel')) return '✈️';
  if (lowerTitle.includes('child')) return '👨‍👧';
  // Default icon
  return '📝';
};

const getDiscountForInsurance = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('term') || lowerTitle.includes('life')) return 'Upto 15% Discount';
  if (lowerTitle.includes('health')) return 'FREE Home Visit';
  if (lowerTitle.includes('investment')) return 'In-Built Life Cover';
  if (lowerTitle.includes('car')) return 'Upto 91% Discount';
  if (lowerTitle.includes('wheeler') || lowerTitle.includes('bike')) return 'Upto 85% Discount';
  if (lowerTitle.includes('family')) return 'Upto 25% Discount';
  if (lowerTitle.includes('women')) return 'Upto 20% Cheaper';
  // Default discount
  return 'Special Offer';
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const images = [
    {
      imageUrl: "https://cms-img.coverfox.com/why-is-it-critical-to-have-a-motor-vehicle-insurance-policy.webp",
      alt: "Motor insurance importance",
      // link: "https://www.example.com/motor-insurance"
    },
    {
      imageUrl: "https://cms-img.coverfox.com/car-suspension.webp",
      alt: "Health insurance benefits",
      // link: "https://www.example.com/health-insurance"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchInsuranceProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://insurance-backend-production-5d25.up.railway.app/api/packages/header");
        
        // Map the API data to the format required for InsuranceCard
        const formattedProducts = response.data.Insurance?.map(pkg => ({
          title: pkg.title,
          icon: getIconForInsurance(pkg.title),
          discount: getDiscountForInsurance(pkg.title),
          subtitle: pkg.title.toLowerCase().includes('women') ? '(Women)' : null,
          id: pkg._id // Keep the ID for linking purposes
        })) || [];
        
        setInsuranceProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance products:", error);
        setError("Failed to fetch insurance products");
        setLoading(false);
        
        // Fallback to hardcoded data if API fails
        setInsuranceProducts([
          { title: 'Term Life Insurance', discount: 'Upto 15% Discount', icon: '☂️', id: 'term-life' },
          { title: 'Health Insurance', discount: 'FREE Home Visit', icon: '❤️', id: 'health' },
          { title: 'Investment Plans', discount: 'In-Built Life Cover', icon: '💰', id: 'investment' },
          { title: 'Car Insurance', discount: 'Upto 91% Discount', icon: '🚗', id: 'car' },
          { title: '2 Wheeler Insurance', discount: 'Upto 85% Discount', icon: '🛵', id: 'two-wheeler' },
          { title: 'Family Health Insurance', discount: 'Upto 25% Discount', icon: '👨‍👩‍👧‍👦', id: 'family-health' },
          { title: 'Term Insurance', subtitle: '(Women)', discount: 'Upto 20% Cheaper', icon: '👩', id: 'term-women' },
        ]);
      }
    };

    fetchInsuranceProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold mb-6">
            Let's find you<br />
            the <span className="text-blue-900 relative">
              Best Insurance
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-500"></div>
            </span>
          </h1>
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2 transition-transform hover:translate-x-1 cursor-pointer">
              <div className="text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-purple-600 text-sm">51 insurers offering<br />lowest prices</p>
            </div>
            <div className="flex items-center gap-2 transition-transform hover:translate-x-1 cursor-pointer">
              <div className="text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-orange-500 text-sm">Quick, easy &<br />hassle free</p>
            </div>
          </div>
        </div>
        
        <div className="relative flex justify-center items-center">
          <div className="w-700 h-200 relative">
            {images.map((image, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <a>
                  <img 
                    src={image.imageUrl} 
                    alt={image.alt} 
                    className="w-full h-auto rounded-lg shadow-md"
                    style={{ maxWidth: "500px", maxHeight: "400px" }}
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Products Grid with API data - Now with clickable cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {loading ? (
          // Loading state
          Array(7).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse h-32"></div>
          ))
        ) : error ? (
          // Error state
          <div className="col-span-full text-center py-4 text-red-500">
            {error}. Using fallback data instead.
          </div>
        ) : (
          // Render insurance cards - now clickable with redirect
          insuranceProducts.map((product, index) => (
            <InsuranceCard
              key={index}
              title={product.title}
              icon={product.icon}
              discount={product.discount}
              subtitle={product.subtitle}
              id={product.id}
            />
          ))
        )}
      </div>

      <div className="mt-8 mb-8">
        <QueryForm />
      </div>

      {/* Keep the original PromoSlider */}
      <PromoSlider />
      
      
    </div>
  );
};
export default HeroSection;