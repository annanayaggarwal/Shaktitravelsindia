import React from "react";
import pics1 from "../utils/19197288.jpg";
import pics2 from "../utils/icons8-mobile-messaging-100.png";
import pics3 from "../utils/3658470.jpg";
import pics4 from "../utils/3895276.jpg";
import pics5 from "../utils/rag-doll-transported-wheelbarrow-dollar-symbol-red.jpg";

const PBAdvantage = () => {
  const advantages = [
    {
      title: "Best Prices",
      description: "Guaranteed",
      imageSrc: pics5
    },
    {
      title: "Unbiased Advice",
      description: "Keeping customers first",
      imageSrc: pics4
    },
    {
      title: "100% Reliable",
      description: "Regulated by IRDAI",
      imageSrc: pics2
    },
    {
      title: "Claims Support",
      description: "Made stress-free",
      imageSrc: pics1
    },
    {
      title: "Happy to Help",
      description: "Every day of the week",
      imageSrc: pics3
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-[#253858] mb-6 relative">
          Insurance Rivers Advantage
          <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></div>
        </h1>
        <p className="text-[#253858] text-base leading-relaxed mb-4 max-w-3xl">
          When you buy insurance from us, you get more than just financial safety. You also 
          get: our promise of simplifying complex insurance terms and conditions, quick 
          stress-free claims, instant quotes from top insurers and being present for you in 
          the toughest of times.
        </p>
        <button className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
          Know more
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {advantages.map((advantage, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md border p-6 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <img 
                src={advantage.imageSrc} 
                alt={advantage.title}
                className="w-28 h-28 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-[#253858]">{advantage.title}</h3>
              <p className="text-sm text-gray-600">{advantage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PBAdvantage;
