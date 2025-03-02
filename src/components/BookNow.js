import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const API_BASE_URL = 'https://insurance-backend-production-5d25.up.railway.app/api';

const BookNow = () => {
  const [packages, setPackages] = useState({ Insurance: [], Renewal: [] });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    selectedPackage: '',
    travelDate: '',
    message: ''
  });

  const validateBookingData = (data) => {
    const errors = [];
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone is required');
    if (!data.numberOfPeople || data.numberOfPeople < 1) errors.push('Number of people must be at least 1');
    if (!data.selectedPackage) errors.push('Package selection is required');
    // if (!data.travelDate) errors.push('Travel date is required');
    return errors;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/packages/header`);
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
        setSubmitStatus({
          type: 'error',
          message: 'Failed to load packages. Please refresh the page.'
        });
      }
    };

    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const errors = validateBookingData(formData);
    if (errors.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: errors.join(', ')
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const bookingData = {
        ...formData,
        numberOfPeople: parseInt(formData.numberOfPeople)
      };

      await axios.post(`https://insurance-backend-production-5d25.up.railway.app/api/bookings`, bookingData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Booking request submitted successfully! We will contact you shortly.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        numberOfPeople: '',
        selectedPackage: '',
        travelDate: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit booking request. Please try again.'
      });
    } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Book Your Insurance Policy
        </h1>

        {/* Booking Form Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          {submitStatus.message && (
            <div className={`p-4 rounded-md mb-6 ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People *
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  required
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Package *
              </label>
              <select
                name="selectedPackage"
                required
                value={formData.selectedPackage}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Choose a package</option>
                <optgroup label="Insurance Packages">
                  {packages.Insurance.map(pkg => (
                    <option key={pkg._id} value={pkg._id}>{pkg.title}</option>
                  ))}
                </optgroup>
                <optgroup label="Renewal Packages">
                  {packages.Renewal.map(pkg => (
                    <option key={pkg._id} value={pkg._id}>{pkg.title}</option>
                  ))}
                </optgroup>
                <option value="others">Others</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Travel Date *
              </label>
              <input
                type="date"
                name="travelDate"
                required
                value={formData.travelDate}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Any special requirements or questions?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors font-semibold disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Submitting...
                </>
              ) : (
                'Submit Booking Request'
              )}
            </button>
          </form>
        </div>

        {/* Available Packages Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading packages...</span>
          </div>
          ) : (
            <>
              {packages.Insurance.map(pkg => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={pkg.image || "/api/placeholder/400/300"} 
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            selectedPackage: pkg._id
                          }));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Select Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {packages.Renewal.map(pkg => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={pkg.image || "/api/placeholder/400/300"} 
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            selectedPackage: pkg._id
                          }));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Select Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookNow;