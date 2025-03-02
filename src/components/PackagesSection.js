import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom CSS
const customStyles = `
  .custom-slider .slick-prev,
  .custom-slider .slick-next {
    width: 30px;
    height: 30px;
    z-index: 1;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .custom-slider .slick-prev {
    left: -5px;
  }

  .custom-slider .slick-next {
    right: -5px;
  }

  .custom-slider .slick-prev:before,
  .custom-slider .slick-next:before {
    color: black;
    font-size: 24px;
    line-height: 1;
  }

  .custom-slider .slick-dots li button:before {
    color: black;
    opacity: 0.25;
    font-size: 12px;
  }

  .custom-slider .slick-dots li.slick-active button:before {
    color: black;
    opacity: 0.75;
  }

  .custom-slider .slick-dots {
    bottom: -35px;
  }

  .custom-slider .slick-list {
    margin: 0 20px;
  }

  .custom-slider {
    padding-bottom: 40px;
  }

  @media (max-width: 640px) {
    .custom-slider .slick-prev {
      left: 0;
    }
    .custom-slider .slick-next {
      right: 0;
    }
  }
`;

const PackageCard = ({ _id, image, title, shortdescription, description, duration }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/package/${_id}`);
  };

  return (
    <div
      className="bg-white rounded-[20px] overflow-hidden shadow-lg m-2 border border-[#f86960] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200';
        }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-sm mb-3">{duration}</p>
        <p className="text-gray-600 text-base break-words whitespace-normal overflow-hidden">
          {shortdescription}
        </p>
      </div>
    </div>
  );
};

const PackagesSection = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inject custom styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://insurance-backend-production-5d25.up.railway.app/api/packages/header', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setPackages(response.data.Renewal || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError('Failed to fetch packages. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (isLoading) return <div className="text-center p-4">Loading packages...</div>;
  if (error) return <div className="text-center text-blue-500 p-4">{error}</div>;

  return (
    <div className="p-3 bg-[#ECF5FE] m-2 rounded-[20px]">
    <section className="py-6 overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-4 bg-blue-500 text-white py-2">
        Amazing Renewal packages at the best price
      </h2>
      <p className="text-center mb-6">
        Get an amazing deal on renewal of Insurance packages @insurancerivers.in by the best insurance agency of Delhi.
        There are {packages.length} renewal Packages given below as per the latest demand and discounts available.
      </p>
      {packages.length > 0 ? (
        <div className="custom-slider px-8">
          <Slider {...settings}>
            {packages.map((pkg, index) => (
              <PackageCard key={pkg._id || index} {...pkg} />
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center">No packages available at the moment.</p>
      )}
    </section>
    </div>
  );
};

export default PackagesSection;