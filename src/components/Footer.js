import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const [packages, setPackages] = useState({
    chardham: [],
    destinations: [],
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://tourandtravelsbacked-production.up.railway.app/api/packages/header"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <footer
      id="footerback"
      style={{
        background: "#f0d292",
        width: "100%",
        height: "400px",
        paddingTop: "40px",
        borderTop: "#f8493e 8px solid",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRhMaZ8KHrUrp6fsWl1330KxZEOBvzH6CuzK5XUnirY-p5B2KhhcgYJ7Lu7ADtK5b-Q1FdUgbHoMjQMaLg7yXDzZip8g_CH5SqZ_0ucflo')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "auto",
        color: "white",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-red-500 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
              <Link to="/about" className="text-red-500 hover:text-red-400">
                  About us
                </Link>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  Our Service
                </a>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  Why Choose us
                </a>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  Term & Condition
                </a>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-red-500 pb-2">
              Destination Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {packages.destinations.map((pkg) => (
                <li key={pkg._id}>
                  <Link
                    to={`/package/${pkg._id}`}
                    className="text-red-500 hover:text-red-400"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-red-500 pb-2">
              Chardham Tour Packages
            </h3>
            <ul className="space-y-2">
              {packages.chardham.map((pkg) => (
                <li key={pkg._id}>
                  <Link
                    to={`/package/${pkg._id}`}
                    className="text-red-500 hover:text-red-400"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-red-500 pb-2">
              Contact Information
            </h3>
            <p className="mb-2">
              Shakti Travels , S4 Srishti Complex ChandraCharya Chowk RanipurMore,
              Haridwar, Uttarkhand, India
            </p>
            <p className="mb-2">Phone</p>
            <a 
              href="tel:+919837053925" 
              className="text-red-500 hover:text-red-400 mb-2 block transition-colors"
            >
              +91-9837053925
            </a>
            <p className="mb-2">Email</p>
            <a 
              href="mailto:rajesh.garg824@gmail.com"
              className="text-red-500 hover:text-red-400 mb-2 block transition-colors"
            >
              rajesh.garg824@gmail.com
            </a>
            <p className="mb-2">Follow us</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/radhesh.gupta.98" 
                className="text-white hover:text-red-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.instagram.com/_shakti_travels/" 
                className="text-white hover:text-red-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-red-500">
          <p>Copyright©2024 shaktitravelsindia.com - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;