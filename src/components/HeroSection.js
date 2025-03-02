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

const AlsoBuyCard = ({ title, category }) => (
  <div 
    className="bg-white rounded-lg p-3 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:rotate-1 cursor-pointer" 
    style={{ 
      perspective: '1000px', 
      transform: 'rotateX(1deg)',
      transformStyle: 'preserve-3d' 
    }}
  >
    <div className="text-xs text-blue-600 mb-1">{category}</div>
    <div className="text-sm text-gray-700">{title}</div>
  </div>
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
      {/* <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
        {buttonText}
      </button> */}
    </div>
    {/* Add decorative circles like in the PBAdvantage design */}
    <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-blue-800 opacity-30"></div>
    <div className="absolute -right-10 -bottom-20 w-32 h-32 rounded-full bg-blue-800 opacity-40"></div>
  </div>
);

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
  
  // These items are not fetched from API as requested
  const alsoBuyProducts = [
    { category: 'Life Insurance', title: 'LIC Plans' },
    { category: 'Term Life', title: 'Return of Premium' },
    { category: 'Life Insurance', title: 'Life Insurance for Housewives' },
    { category: 'Health Insurance', title: 'Day 1 Coverage' },
    { category: 'Health Insurance', title: '1 Cr Health Insurance' },
    { category: 'Accident Insurance', title: 'Personal Accident' },
    { category: 'Motor Insurance', title: 'Commercial Vehicles' },
    { category: 'Business Insurance', title: 'Marine Insurance' },
    { category: 'Business Insurance', title: 'Professional Indemnity for Doctors' },
    { category: 'Business Insurance', title: 'Directors & Officers Liability' },
    { category: 'Business Insurance', title: 'Workmen Compensation' },
    { category: 'Others', title: 'Pet Insurance' }
  ];

  const promos = [
    {
      title: 'Term Life Insurance',
      amount: '1 Crore',
      rate: '485',
    },
    {
      title: 'Investment Plan',
      amount: '1 Crore',
      rate: '10,000',
    }
  ];

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
        
        <div className="relative">
          {promos.map((promo, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              <PromoBanner {...promo} />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {promos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
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

      <div className="mb-8">
        <h2 className="text-blue-600 font-medium mb-4 relative">
          ALSO BUY
          <div className="absolute -bottom-1 left-0 w-8 h-1 bg-blue-500"></div>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {alsoBuyProducts.map((product, index) => (
            <AlsoBuyCard
              key={index}
              category={product.category}
              title={product.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;