import React from 'react';

const TempleCard = ({ title, image, description }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-2xl">
    <div className="text-center text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 p-3 md:p-4 text-white">
      {title} Temple
    </div>
    
    <div className="flex flex-col md:flex-row bg-gray-50">
      <div className="w-full md:w-1/3 p-4">
        <div className="relative pb-[100%] md:pb-[125%]">
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      
      <div className="w-full md:w-2/3 p-4 md:p-6">
        <p 
          className="text-gray-800 prose prose-sm md:prose-base lg:prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ 
            __html: description 
          }}
          style={{ 
            textAlign: 'justify',
            lineHeight: '1.8',
            fontWeight: '500'
          }} 
        />
      </div>
    </div>
  </div>
);

const TempleCards = () => {
  const temples = [
    {
      title: "Badrinath",
      image: "https://uttarakhandtourism.gov.in/sites/default/files/2022-03/Badrinath.jpeg",
      description: "This sacred temple dedicated to Lord Vishnu is the only temple that comes under the Chardham sites of India. <span class='text-red-500'>Rameshwaram</span>, Dwarka, <span class='text-red-500'>Jagannath Puri</span>, and Badrinath are the 4 Dhams of India. You should also visit Swargarohini, Mana Gaon, Vasu Dhara Waterfall, Bhima Pool, Satopanth, Tap Kund, Panch Shila, Narad Kund, and Brahma Kamal."
    },
    {
      title: "Kedarnath",
      image: "https://uttarakhandtourism.gov.in/sites/default/files/2022-04/Kedarnath.jpeg",
      description: "Kedarnath temple is one of the most popular and important temples of Hindus which is situated in Uttarakhand. This is one of the twelve jyotirlingas of Shiva. The Temple is surrounded by Beautiful Himalayan mountains covered with snow make is beautiful and mesmerizing for the devotees. Kedarnath is one of the temple at Panch Kedar Yatra in the Himalayas of Uttarakhand."
    },
    {
      title: "Gangotri",
      image: "https://uttarakhandtourism.gov.in/sites/default/files/2022-03/Gangotri.jpeg",
      description: "Gangotri temple is dedicated to the goddess Ganga River the most sacred River in India. The Source of the Ganges is named <span class='text-red-500'>Gaumukh</span> which is only 20 Km away from the Gangotri. This place is very sacred for Hindus. <span class='text-red-500'>Gangotri temple</span> door/kapat also opens on Akshaya Tritiya same as Yamunotri temple and closes on Diwali"
    },
    {
      title: "Yamunotri",
      image: "https://uttarakhandtourism.gov.in/sites/default/files/2020-06/Yamunotri%20feature.jpg",
      description: "The Yamunotri temple is the first temple to visit if you are going on the Chardham Tour. The temple is devoted to a River Goddess named <span class='text-red-500'>Yamuna</span>. Yamuna is the second most sacred river in India and is worshipped by Hindus. The temple can be reached by trekking 6 Km one way. Yamunotri is a daughter of Sun and sister of Yamraj & Sanidev. It is said that people who visit take holy bath at Yamuna river, get sin free."
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-800">
          Char Dham Yatra Temples
        </h2>
        
        <p className="text-center mb-8 text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto">
          There are four temples in the holy shrine in Uttarakhand and they are located in Uttarkashi, Rudraprayag, and Chamoli districts. Millions of devotees visit temples each year.
        </p>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {temples.map((temple, index) => (
            <TempleCard key={index} {...temple} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TempleCards;