import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock, Download, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryForm from '../components/QueryForm';

// Add this CSS as a style block or import it from your CSS file
const styles = `
.description-content {
  line-height: 1.6;
  color: #4a5568;
}
.description-content h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}
.description-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2d3748;
}
.description-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}
.description-content ul,
.description-content ol {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.description-content ul {
  list-style-type: disc;
}
.description-content ol {
  list-style-type: decimal;
}
.description-content li {
  margin-bottom: 0.25rem;
}
.description-content .ql-indent-1 {
  padding-left: 2rem;
}
.description-content .ql-indent-2 {
  padding-left: 4rem;
}
.description-content p {
  margin-bottom: 0.75rem;
}
.description-content strong {
  font-weight: 600;
}
.description-content em {
  font-style: italic;
}
`;

const PackageDetailPage = () => {
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://insurance-backend-production-5d25.up.railway.app/api/packages/${id}`);
        setPackageData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching package data:', error);
        setError('Failed to fetch package details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  const handleViewItinerary = () => {
    // Directly open the Cloudinary URL in a new tab
    if (packageData?.itinerary) {
      window.open(packageData.itinerary, '_blank');
    }
  };

  const handleDownloadItinerary = async () => {
    try {
      // Fetch the PDF from Cloudinary
      const response = await axios.get(packageData.itinerary, {
        responseType: 'blob'
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${packageData.title}-itinerary.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading itinerary:', error);
      alert('Failed to download the itinerary. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <style>{styles}</style>
      <Header />
      <main className="flex-grow bg-gray-50">
        {packageData && (
          <>
            <div className="relative h-[400px]">
              <img 
                src={packageData.image} 
                alt={packageData.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">{packageData.title}</h1>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
              <Link to="/packages" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to All Packages
              </Link>
              
              <QueryForm />
              
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-3xl font-bold mb-4">{packageData.title}</h2>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {packageData.duration && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{packageData.duration}</span>
                    </div>
                  )}
                  {packageData.type && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Type: {packageData.type}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-lg mb-6">{packageData.shortdescription}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4">Package Details</h3>
                <div 
                  className="description-content"
                  dangerouslySetInnerHTML={{ __html: packageData.description }}
                />
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Full Insurance Package Details</h3>
                {packageData.itinerary ? (
                  <div className="flex gap-4">
                    {/* <button
                      onClick={handleViewItinerary}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <FileText size={20} />
                      View Itinerary
                    </button> */}
                    <button
                      onClick={handleDownloadItinerary}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Download size={20} />
                      Download Itinerary
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">No itinerary available for this package.</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetailPage;