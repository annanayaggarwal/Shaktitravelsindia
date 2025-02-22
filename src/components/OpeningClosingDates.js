import React from 'react';

const OpeningClosingDates = () => {
  const templeData = [
    { name: "Yamunotri Dham", opening: "30 April 2025", closing: "03 November 2025" },
    { name: "Gangotri Dham", opening: "30 April 2025", closing: "02 November 2025" },
    { name: "Kedarnath Dham", opening: "2 May 2025", closing: "03 November 2025" },
    { name: "Badrinath Dham", opening: "2 May 2025", closing: "17 November 2025" },
    { name: "Hemkund Sahib", opening: "25 May 2025", closing: "10 October 2025" },
  ];

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center mb-4 bg-red-500 text-white py-2">
        Chardham Yatra Package opening and Closing Dates 2025
      </h2>
      <p className="text-center mb-6">
        'Chardham Yatra 2025' will start on 10 May. Gangotri along with Yamunotri Temple Doors always open on the occasion of Akshaya Tritiya. Upcoming Akshay Tritiya is on 10 May 2025. Kedarnath's door date will be decided on Maha Shivratri (8 March). Char Dham yatra is a very important Hindu religious journey of four holy temples in Uttarakhand. Lakhs of devotees visit there from all corners of India as well world.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Chardham Temples</th>
              <th className="py-2 px-4 border">Opening Date</th>
              <th className="py-2 px-4 border">Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {templeData.map((temple, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{temple.name}</td>
                <td className="py-2 px-4 border">{temple.opening}</td>
                <td className="py-2 px-4 border">{temple.closing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OpeningClosingDates;