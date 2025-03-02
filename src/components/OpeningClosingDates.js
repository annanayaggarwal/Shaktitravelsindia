import React from 'react';

const FeatureCard = ({ icon, title, description, borderColor }) => (
  <div className={`bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-l-4 ${borderColor} hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow`}>
    <div className="flex flex-col gap-2">
      <div className="text-2xl">{icon}</div>
      <h3 className={`text-lg font-medium ${
        title === '51 insurers' ? 'text-cyan-500' :
        title === 'Great Price' ? 'text-emerald-500' :
        title === 'Claims' ? 'text-yellow-500' :
        'text-blue-600'
      }`}>{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🎊",
      title: "Over 9 million",
      description: "customers trust us & have bought their insurance on InsranceRivers",
      borderColor: "border-blue-600"
    },
    {
      icon: "🔍",
      title: "51 insurers",
      description: "partnered with us so that you can compare easily & transparently",
      borderColor: "border-cyan-500"
    },
    {
      icon: "👑",
      title: "Great Price",
      description: "for all kinds of insurance plans available online",
      borderColor: "border-emerald-500"
    },
    {
      icon: "👤",
      title: "Claims",
      description: "support built in with every policy for help, when you need it the most",
      borderColor: "border-yellow-500"
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-pink-100"></div>
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-blue-100"></div>
        <div className="absolute bottom-40 left-1/4 w-6 h-6 text-pink-100">×</div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 text-cyan-100">○</div>
        <div className="absolute -bottom-5 right-10 w-4 h-4 rounded-full bg-green-100"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        {/* Text Section */}
        <div className="lg:w-1/3">
          <h2 className="text-[40px] leading-tight font-medium">
            <span className="text-gray-800">What makes</span>
            <br />
            <span className="text-[#2b3d76]">InsranceRivers</span>
            <span className="text-gray-800"> one of </span>
            
            <span className="text-[#2b3d76]">India's favourite places </span>
            
            <span className="text-gray-800">to </span>
            <span className="text-[#2b3d76]">buy insurance</span>
            <span className="text-gray-800">?</span>
          </h2>
        </div>

        {/* Cards Section */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                borderColor={feature.borderColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;