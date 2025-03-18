import logoImage from "../logoimage.jpg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; // Using lucide-react for icons

const Header = () => {
  const [packages, setPackages] = useState({ Insurance: [], Renewal: [] });
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://insurance-backend-production-5d25.up.railway.app/api/packages/header"
        );
        setPackages({
          Insurance: response.data.Insurance || [],
          Renewal: response.data.Renewal || [],
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Failed to fetch packages");
        setPackages({ Insurance: [], Renewal: [] });
      }
    };

    fetchPackages();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  // For mobile view only
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-white py-2 px-4 border-b-2 border-gray-200">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="h-16 w-16 md:h-20 md:w-20">
          <img
            src={logoImage}
            alt="Insurance River Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              if (!imageError) {
                setImageError(true);
                e.target.src = "/api/placeholder/50/50";
              }
            }}
          />
        </div>

        {/* Desktop Navigation with Hover Dropdowns */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-6">
            <li className="relative group">
              {/* Adding py-2 to extend the hover area */}
              <Link
                to="#"
                className="text-gray-700 hover:text-blue-600 font-bold flex items-center py-2 group"
              >
                Insurance Products
                <svg 
                  className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>
              {/* Removed mt-2 to position dropdown immediately below button */}
              <div className="absolute left-0 top-full bg-white border border-gray-200 rounded-md shadow-lg z-20 w-64 hidden group-hover:block">
                {/* Added invisible buffer to help bridge the gap */}
                <div className="h-1 bg-transparent -mt-1"></div>
                {packages.Insurance?.map((pkg) => (
                  <Link
                    key={pkg._id}
                    to={`/package/${pkg._id}`}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                  >
                    <span className="mr-3">
                      {/* Icon based on package type */}
                      {pkg.title.toLowerCase().includes('term') && (
                        <span className="text-blue-500">☂️</span>
                      )}
                      {pkg.title.toLowerCase().includes('health') && (
                        <span className="text-red-500">❤️</span>
                      )}
                      {pkg.title.toLowerCase().includes('motor') && (
                        <span className="text-blue-500">🚗</span>
                      )}
                      {pkg.title.toLowerCase().includes('wheeler') && (
                        <span className="text-purple-500">🛵</span>
                      )}
                      {pkg.title.toLowerCase().includes('investment') && (
                        <span className="text-yellow-500">💰</span>
                      )}
                      {pkg.title.toLowerCase().includes('home') && (
                        <span className="text-teal-500">🏠</span>
                      )}
                      {pkg.title.toLowerCase().includes('family') && (
                        <span className="text-teal-500">👨‍👩‍👧‍👦</span>
                      )}
                      {pkg.title.toLowerCase().includes('travel') && (
                        <span className="text-teal-500">✈️</span>
                      )}
                      {pkg.title.toLowerCase().includes('child') && (
                        <span className="text-teal-500">👨‍👧</span>
                      )}
                    </span>
                    {pkg.title}
                  </Link>
                ))}
              </div>
            </li>
            <li className="relative group">
              {/* Adding py-2 to extend the hover area */}
              <Link
                to="#"
                className="text-gray-700 hover:text-blue-600 font-bold flex items-center py-2 group"
              >
                Renew Your Policy
                <svg 
                  className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>
              {/* Removed mt-2 to position dropdown immediately below button */}
              <div className="absolute left-0 top-full bg-white border border-gray-200 rounded-md shadow-lg z-20 w-64 hidden group-hover:block">
                {/* Added invisible buffer to help bridge the gap */}
                <div className="h-1 bg-transparent -mt-1"></div>
                {packages.Renewal?.map((pkg) => (
                  <Link
                    key={pkg._id}
                    to={`/package/${pkg._id}`}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                  >
                    <span className="mr-3">
                      {/* Icon based on package type */}
                      {pkg.title.toLowerCase().includes('term') && (
                        <span className="text-blue-500">☂️</span>
                      )}
                      {pkg.title.toLowerCase().includes('health') && (
                        <span className="text-red-500">❤️</span>
                      )}
                      {pkg.title.toLowerCase().includes('motor') && (
                        <span className="text-blue-500">🚗</span>
                      )}
                      {pkg.title.toLowerCase().includes('wheeler') && (
                        <span className="text-purple-500">🛵</span>
                      )}
                      {pkg.title.toLowerCase().includes('investment') && (
                        <span className="text-yellow-500">💰</span>
                      )}
                      {pkg.title.toLowerCase().includes('home') && (
                        <span className="text-teal-500">🏠</span>
                      )}
                    </span>
                    {pkg.title}
                  </Link>
                ))}
              </div>
            </li>
            {/* <li>
              <Link
                to="/enquire-now"
                className="text-gray-700 hover:text-blue-600 font-bold py-2"
              >
                Claim
              </Link>
            </li> */}
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-bold py-2"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/enquire-now"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-bold"
              >
                Enquire Now
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Info - Desktop */}
        <div className="hidden lg:block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
          <p>Email: helpdesk@insurancerivers.in</p>
          <p>Call: +91-9205116444,+91-9220812584,+91-9220812384</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Keeps click-based dropdown for mobile */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <nav className="bg-white">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => toggleDropdown("Insurance")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold flex justify-between items-center"
                >
                  Insurance Products
                  <span className="transform transition-transform duration-200">
                    {activeDropdown === "Insurance" ? "−" : "+"}
                  </span>
                </button>
                {activeDropdown === "Insurance" && (
                  <ul className="bg-gray-50 py-2">
                    {packages.Insurance?.map((pkg) => (
                      <li key={pkg._id} className="flex items-center">
                        <span className="px-2">
                          {/* Icon based on package type */}
                          {pkg.title.toLowerCase().includes('term') && (
                            <span className="text-blue-500">☂️</span>
                          )}
                          {pkg.title.toLowerCase().includes('health') && (
                            <span className="text-red-500">❤️</span>
                          )}
                          {pkg.title.toLowerCase().includes('motor') && (
                            <span className="text-blue-500">🚗</span>
                          )}
                          {pkg.title.toLowerCase().includes('wheeler') && (
                            <span className="text-purple-500">🛵</span>
                          )}
                          {pkg.title.toLowerCase().includes('investment') && (
                            <span className="text-yellow-500">💰</span>
                          )}
                          {pkg.title.toLowerCase().includes('home') && (
                            <span className="text-teal-500">🏠</span>
                          )}
                          {pkg.title.toLowerCase().includes('family') && (
                            <span className="text-teal-500">👨‍👩‍👧‍👦</span>
                          )}
                          {pkg.title.toLowerCase().includes('travel') && (
                            <span className="text-teal-500">✈️</span>
                          )}
                          {pkg.title.toLowerCase().includes('child') && (
                            <span className="text-teal-500">👨‍👧</span>
                          )}
                        </span>
                        <Link
                          to={`/package/${pkg._id}`}
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {pkg.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleDropdown("Renewal")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold flex justify-between items-center"
                >
                  Renew Your Policy
                  <span className="transform transition-transform duration-200">
                    {activeDropdown === "Renewal" ? "−" : "+"}
                  </span>
                </button>
                {activeDropdown === "Renewal" && (
                  <ul className="bg-gray-50 py-2">
                    {packages.Renewal?.map((pkg) => (
                      <li key={pkg._id} className="flex items-center">
                        <span className="px-2">
                          {/* Icon based on package type */}
                          {pkg.title.toLowerCase().includes('term') && (
                            <span className="text-blue-500">☂️</span>
                          )}
                          {pkg.title.toLowerCase().includes('health') && (
                            <span className="text-red-500">❤️</span>
                          )}
                          {pkg.title.toLowerCase().includes('motor') && (
                            <span className="text-blue-500">🚗</span>
                          )}
                          {pkg.title.toLowerCase().includes('wheeler') && (
                            <span className="text-purple-500">🛵</span>
                          )}
                          {pkg.title.toLowerCase().includes('investment') && (
                            <span className="text-yellow-500">💰</span>
                          )}
                          {pkg.title.toLowerCase().includes('home') && (
                            <span className="text-teal-500">🏠</span>
                          )}
                          {pkg.title.toLowerCase().includes('family') && (
                            <span className="text-teal-500">👨‍👩‍👧‍👦</span>
                          )}
                          {pkg.title.toLowerCase().includes('travel') && (
                            <span className="text-teal-500">✈️</span>
                          )}
                          {pkg.title.toLowerCase().includes('child') && (
                            <span className="text-teal-500">👨‍👧</span>
                          )}
                        </span>
                        <Link
                          to={`/package/${pkg._id}`}
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {pkg.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/claim"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Claim
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/enquire-now"
                  className="block px-4 py-2 bg-blue-600 text-white text-center rounded-full hover:bg-blue-700 font-bold mx-4 mt-4"
                >
                  Enquire Now
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info - Mobile */}
          <div className="bg-blue-600 text-white text-sm px-4 py-2 mt-4 rounded-lg mx-4">
            <p>Email: insuranceriver.sales@gmail.com</p>
            <p>Call: +91-8373990449</p>
          </div>
        </div>
      )}
    </header>
  );
};


export default Header;