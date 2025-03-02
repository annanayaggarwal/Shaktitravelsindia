import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPackageForm = ({ onPackageAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortdescription: '',
    description: '',
    duration: '',
    price: '',
    image: '',
    type: 'Insurance'
  });

  const [itineraryFile, setItineraryFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear previous error when user starts typing
    setError('');
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setItineraryFile(file);
          setError('');
        } else {
          setError('PDF file size must be less than 5MB');
          e.target.value = '';
        }
      } else {
        setError('Only PDF files are allowed');
        e.target.value = '';
      }
    }
  };

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
    setPreviewUrl(imageUrl);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      shortdescription: '',
      description: '',
      duration: '',
      price: '',
      image: '',
      type: 'Insurance'
    });
    setItineraryFile(null);
    setPreviewUrl('');
    setError('');
    // Reset file input
    const fileInput = document.getElementById('itinerary');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    // Form validation
    if (!itineraryFile) {
      setError('Please select an itinerary PDF file');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    
    // Append all text fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append the PDF file
    formDataToSend.append('itinerary', itineraryFile);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.post(
        'http://localhost:5000/api/packages',
        formDataToSend,
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      setSuccessMessage('Package added successfully!');
      onPackageAdded(response.data);
      clearForm();
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Error adding package. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setItineraryFile(null);
    const fileInput = document.getElementById('itinerary');
    if (fileInput) fileInput.value = '';
  };

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Package</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Package Title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter package title"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration*
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 3 days, 2 nights"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Package Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Renewal">Renewal</option>
            <option value="Insurance">Insurance</option>
          </select>
        </div>
        <div>
          <label htmlFor="shortdescription" className="block text-sm font-medium text-gray-700">
            Short Description*
          </label>
          <textarea
            name="shortdescription"
            id="shortdescription"
            value={formData.shortdescription}
            onChange={handleChange}
            required
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Brief overview of the package"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description*
          </label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            className="bg-white"
            style={{ minHeight: "200px", marginBottom: "50px" }}
          />
          <p className="text-xs text-gray-500 mt-2">
            Use the formatting toolbar to add bullet points, indentation, and other formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹)*
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL*
            </label>
            <input
              type="url"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleImageUrlChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full max-w-md h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                setError('Invalid image URL. Please provide a valid image URL.');
              }}
            />
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Itinerary PDF*
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="itinerary" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    id="itinerary"
                    name="itinerary"
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 5MB</p>
            </div>
          </div>
          {itineraryFile && (
            <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-500">
                Selected: {itineraryFile.name}
              </span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Adding Package...
              </>
            ) : (
              'Add Package'
            )}
          </button>

          <button
            type="button"
            onClick={clearForm}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackageForm;