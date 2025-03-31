import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPackageForm from './AddPackageForm';
import EditPackageForm from './EditPackageForm';
import LoginForm from './LoginForm';

const PackageCard = ({ pkg, onEdit, onDelete }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover"/>
    <div className="p-4">
      <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
      <p className="text-gray-700 text-base mb-2">{pkg.description.substring(0, 100)}...</p>
      <p className="text-gray-600 text-sm">Duration: {pkg.duration}</p>
      <p className="text-gray-600 text-sm mb-4">Price: ${pkg.price}</p>
      <div className="flex justify-between">
        <button 
          onClick={() => onEdit(pkg)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(pkg._id)} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [queries, setQueries] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPackages, setShowPackages] = useState(false);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchPackages();
      fetchQueries();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://insurance-backend-t18e.onrender.com/api/packages', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
    setIsLoading(false);
  };

  const fetchQueries = async () => {
    try {
      const response = await axios.get('https://insurance-backend-t18e.onrender.com/api/queries', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchPackages();
    fetchQueries();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setPackages([]);
    setQueries([]);
  };

  const handleAddPackage = async (newPackage) => {
    try {
      const response = await axios.post('https://insurance-backend-t18e.onrender.com/api/packages/header', newPackage, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPackages([...packages, response.data]);
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  const handleUpdatePackage = async (updatedPackage) => {
    try {
      const response = await axios.put(`https://insurance-backend-t18e.onrender.com/api/packages/${updatedPackage._id}`, updatedPackage, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPackages(packages.map(pkg => pkg._id === updatedPackage._id ? response.data : pkg));
      setEditingPackage(null);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`https://insurance-backend-t18e.onrender.com/api/packages/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPackages(packages.filter(pkg => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="mb-4">
        <button 
          onClick={() => setShowPackages(!showPackages)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {showPackages ? 'Hide Packages' : 'Show Packages'}
        </button>
        <button 
          onClick={() => setShowQueries(!showQueries)} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showQueries ? 'Hide Queries' : 'Show Queries'}
        </button>
      </div>

      {showPackages && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Package</h2>
          <AddPackageForm onAddPackage={handleAddPackage} />

          {editingPackage && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Edit Package</h2>
              <EditPackageForm 
                package={editingPackage} 
                onUpdatePackage={handleUpdatePackage} 
                onCancel={() => setEditingPackage(null)} 
              />
            </div>
          )}

          <h2 className="text-xl font-semibold mb-2 mt-4">Existing Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <PackageCard 
                key={pkg._id} 
                pkg={pkg} 
                onEdit={setEditingPackage} 
                onDelete={handleDeletePackage} 
              />
            ))}
          </div>
        </div>
      )}

      {showQueries && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Customer Queries</h2>
          <ul>
            {queries.map((query) => (
              <li key={query._id} className="mb-4 p-4 border rounded">
                <p><strong>Name:</strong> {query.name}</p>
                <p><strong>Email:</strong> {query.email}</p>
                <p><strong>Contact:</strong> {query.contact}</p>
                <p><strong>Insurance Details:</strong> {query.InsuranceDetails}</p>
                <p><strong>Submitted on:</strong> {new Date(query.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;