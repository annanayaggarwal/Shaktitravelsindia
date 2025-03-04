import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [packages, setPackages] = useState({
    Insurance: [],
    Renewal: [],
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://insurance-backend-production-5d25.up.railway.app/api/packages/header"
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
      style={{
        background: "#ECF5FE", // Light Blue Background
        width: "100%",
        paddingTop: "40px",
        color: "#7a7371", // Dark Gray/Black Text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-800 hover:text-blue-600">
                  About us
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-800 hover:text-blue-600">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 hover:text-blue-600">
                  Our Service
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 hover:text-blue-600">
                  Why Choose us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 hover:text-blue-600">
                  Term & Condition
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-800 hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Insurance Products
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {packages.Insurance.map((pkg) => (
                <li key={pkg._id}>
                  <Link
                    to={`/package/${pkg._id}`}
                    className="text-blue-800 hover:text-blue-600"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Renew Your Policy
            </h3>
            <ul className="space-y-2">
              {packages.Renewal.map((pkg) => (
                <li key={pkg._id}>
                  <Link
                    to={`/package/${pkg._id}`}
                    className="text-blue-800 hover:text-blue-600"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Contact Information
            </h3>
            <p className="mb-2">
              Insurance Rivers, Padma Tower 2, Rajendra Nagar, Delhi (201001), India
            </p>
            <p className="mb-2">Phone</p>
            <a 
              href="tel:+919205116444" 
              className="text-blue-800 hover:text-blue-600 mb-2 block transition-colors"
            >
              +91-9205116444,
            </a>
            <a 
              href="tel:+919220812584" 
              className="text-blue-800 hover:text-blue-600 mb-2 block transition-colors"
            >
              +91-9220812584,
            </a>
            <a 
              href="tel:+919220812384" 
              className="text-blue-800 hover:text-blue-600 mb-2 block transition-colors"
            >
              +91-9220812384
            </a>
            <p className="mb-2">Email</p>
            <a 
              href=" helpdesk@insurancerivers.in"
              className="text-blue-800 hover:text-blue-600 mb-2 block transition-colors"
            >
               helpdesk@insurancerivers.in
            </a>
            <p className="mb-2">Follow us</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-blue-800 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a 
                href="#" 
                className="text-blue-800 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-800">
          <p>Copyright©2025 insuranceriver.in - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
