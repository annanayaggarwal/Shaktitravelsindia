import logoImage from "../SHAKTI_TRAVELS__1_-removebg-preview.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; // Using lucide-react for icons

const Header = () => {
  const [packages, setPackages] = useState({ chardham: [], destinations: [] });
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://tourandtravelsbacked-production.up.railway.app/api/packages/header"
        );
        setPackages({
          chardham: response.data.chardham || [],
          destinations: response.data.destinations || [],
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Failed to fetch packages");
        setPackages({ chardham: [], destinations: [] });
      }
    };

    fetchPackages();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

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
            alt="Chardham Package Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              if (!imageError) {
                setImageError(true);
                e.target.src = "/api/placeholder/50/50";
              }
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-6">
            <li className="relative group">
              <Link
                to="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Chardham Packages
              </Link>
              <ul className="absolute left-0 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64">
                {packages.chardham?.map((pkg) => (
                  <li key={pkg._id}>
                    <Link
                      to={`/package/${pkg._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {pkg.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="relative group">
              <Link
                to="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Destinations
              </Link>
              <ul className="absolute left-0 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                {packages.destinations?.map((pkg) => (
                  <li key={pkg._id}>
                    <Link
                      to={`/package/${pkg._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {pkg.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/book-now"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Chardham Taxi
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                About Us
              </Link>
            </li>
            {/* <li>
              <Link
                to="#"
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Chardham Hotel
              </Link>
            </li> */}
            <li>
              <Link
                to="/book-now"
                className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-red-700 font-bold"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Info - Desktop */}
        <div className="hidden lg:block bg-green-600 text-white text-sm px-4 py-2 rounded-lg">
          <p>Email: rajesh.garg824@gmail.com</p>
          <p>Call: +91-9837053925</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <nav className="bg-white">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => toggleDropdown("chardham")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold flex justify-between items-center"
                >
                  Chardham Packages
                  <span className="transform transition-transform duration-200">
                    {activeDropdown === "chardham" ? "−" : "+"}
                  </span>
                </button>
                {activeDropdown === "chardham" && (
                  <ul className="bg-gray-50 py-2">
                    {packages.chardham?.map((pkg) => (
                      <li key={pkg._id}>
                        <Link
                          to={`/package/${pkg._id}`}
                          className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  onClick={() => toggleDropdown("destinations")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold flex justify-between items-center"
                >
                  Destinations
                  <span className="transform transition-transform duration-200">
                    {activeDropdown === "destinations" ? "−" : "+"}
                  </span>
                </button>
                {activeDropdown === "destinations" && (
                  <ul className="bg-gray-50 py-2">
                    {packages.destinations?.map((pkg) => (
                      <li key={pkg._id}>
                        <Link
                          to={`/package/${pkg._id}`}
                          className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  to="/book-now"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Chardham Taxi
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
              {/* <li>
                <Link
                  to="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-bold"
                >
                  Chardham Hotel
                </Link> */}
              {/* </li> */}
              <li>
                <Link
                  to="/book-now"
                  className="block px-4 py-2 bg-green-600 text-white text-center rounded-full hover:bg-red-700 font-bold mx-4"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info - Mobile */}
          <div className="bg-green-600 text-white text-sm px-4 py-2 mt-4 rounded-lg mx-4">
            <p>Email: rajesh.garg824@gmail.com</p>
            <p>Call: +91-9837053925</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
