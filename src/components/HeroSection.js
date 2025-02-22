import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const HeroSection = () => {
  const images = [
    "https://yatrachardham.in/wp-content/uploads/2020/06/Yatra-Char-Dham-Banner.jpg",
    "https://yatradham.org/skin/frontend/default/hotel/images/chardham_banner.png",
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          autoplaySpeed: 3000,
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={image}
              alt={`Chardham Yatra ${index + 1}`}
              className="w-full md:h-auto"
              style={{ maxHeight: '100%', width: '100%' }}
              loading="eager"
            />
          </div>
        ))}
      </Slider>
      
      <style jsx global>{`
        .slick-slider, .slick-list, .slick-track {
          height: auto !important;
        }
        .slick-slide > div {
          line-height: 0;
        }
        .slick-dots {
          bottom: 20px;
          z-index: 30;
        }
        .slick-dots li button:before {
          color: white;
          opacity: 0.5;
          font-size: 8px;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;