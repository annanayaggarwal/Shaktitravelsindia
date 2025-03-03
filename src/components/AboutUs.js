import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Insurance Rivers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in providing comprehensive insurance solutions, ensuring financial security and peace of mind for you and your loved ones.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-4">
            At Insurance Rivers, we are committed to providing reliable and comprehensive insurance solutions. Our mission is to ensure financial security, peace of mind, and protection for individuals and families against life's uncertainties
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-500 mb-4">Expert Guidance</h3>
            <p className="text-gray-700">
              Our experienced team provides deep insights into religious and cultural aspects of 
              each destination, enhancing your spiritual journey.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-500 mb-4">Customizable Plans</h3>
            <p className="text-gray-700">
            Tailor your coverage to your specific needs and budget, ensuring comprehensive protection without paying for unnecessary extras.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-500 mb-4">Affordable Premiums
            </h3>
            <p className="text-gray-700">
            Enjoy competitive rates with no hidden charges or fees, offering transparency and value for your money.
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-blue-500 text-white rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Your Trusted Insurance Partner</h2>
            <p className="text-lg">
            With years of expertise in providing comprehensive insurance solutions, Insurance Rivers has safeguarded countless individuals and families against life’s uncertainties. Our deep understanding of financial protection, combined with a commitment to service excellence, makes us the preferred choice for health, life, motor, and travel insurance. We strive to offer tailored coverage that ensures security, peace of mind, and a worry-free future for you and your loved ones.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-700 mb-8">
            Contact us today to plan your spiritual adventure
          </p>
          <div className="space-x-4">
            <a 
              href="tel:+91-8373990449" 
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Call Us
            </a>
            <a 
              href="mailto: helpdesk@insurancerivers.in"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;