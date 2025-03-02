import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DestinationCard = ({ _id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/package/${_id}`);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = '/api/placeholder/400/320';
        }}
      />
      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        {name}
      </div>
    </div>
  );
};

const MobileSlider = ({ Renewal }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  return (
    <div className="relative px-4">
      <Slider {...settings}>
        {Renewal.map((dest) => (
          <div key={dest._id} className="px-2">
            <DestinationCard
              _id={dest._id}
              name={dest.title}
              image={dest.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const DesktopGrid = ({ Renewal }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Renewal.map((dest) => (
      <DestinationCard
        key={dest._id}
        _id={dest._id}
        name={dest.title}
        image={dest.image}
      />
    ))}
  </div>
);

const TopDestinationsSection = () => {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://insurance-backend-production-5d25.up.railway.app/api/packages/header');
        if (response.data.Renewal) {
          setDestinations(response.data.Renewal);
        } else {
          setDestinations([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Renewal:', error);
        setError('Failed to fetch Renewal');
        setDestinations([]);
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (isLoading) return (
    <div className="py-8 bg-[#FFF6E9]">
      <div className="container mx-auto px-4">
        <div className="text-center">Loading Renewal Packages...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="py-8 bg-[#FFF6E9]">
      <div className="container mx-auto px-4">
        <div className="text-center text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <section className="py-8 bg-[#FFF6E9]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Renwal Packages
        </h2>
        <p className="text-center mb-8">
          There are many popular destinations in Uttarakhand during the Char Dham Yatra, you can visit and explore their beauty. Normally 4 Dham yatra begin from Haridwar. Haridwar,{' '}
          <span className="text-red-500">Rishikesh</span>, Dhari Devi Mandir, <span className="text-red-500">Tehri</span>, Auli, Chopta, Gurikund, Barkot, Uttarkashi, Guptkashi, Harsil, <span className="text-red-500">Ukhimath</span>, and many more destinations where you can visit with a 4-dham tour.
        </p>
        
        {/* Show slider on mobile, grid on desktop */}
        <div className="block sm:hidden">
          <MobileSlider Renewal={destinations} />
        </div>
        <div className="hidden sm:block">
          <DesktopGrid Renewal={destinations} />
        </div>
      </div>
    </section>
  );
};

export default TopDestinationsSection;