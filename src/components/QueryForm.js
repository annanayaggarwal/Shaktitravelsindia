import React, { useState } from 'react';
import axios from 'axios';

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    InsuranceDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit phone number';
    }

    // Tour details validation
    if (formData.InsuranceDetails.trim().length < 10) {
      newErrors.InsuranceDetails = 'Please provide more details about your tour';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('https://insurance-backend-production-5d25.up.railway.app/api/queries', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', contact: '', InsuranceDetails: '' });
      setTimeout(() => setSubmitStatus(null), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error submitting query:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-t-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Send Your Query!
      </h3>

      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Query submitted successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          Failed to submit query. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full p-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full p-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className={`w-full p-3 rounded-lg border ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors`}
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="InsuranceDetails"
              value={formData.InsuranceDetails}
              onChange={handleChange}
              placeholder="Insurance Details"
              className={`w-full p-3 rounded-lg border ${
                errors.InsuranceDetails ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors`}
            />
            {errors.InsuranceDetails && (
              <p className="mt-1 text-sm text-red-500">{errors.InsuranceDetails}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              bg-blue-600 hover:bg-red-600 text-white px-8 py-3 rounded-lg
              font-semibold transform transition-all duration-200
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Enquire Now'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default QueryForm;