import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, X } from 'lucide-react';

const EditpackagesForm = ({ package: initialPackage, onUpdatePackage, onCancel }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      shortdescription: '',
      duration: '',
      price: '',
      image: '',
      type: '',
      itinerary: ''
    });

    useEffect(() => {
        if (initialPackage) {
          setFormData(initialPackage);
        }
    }, [initialPackage]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdatePackage(formData);
    };

    // ReactQuill modules and formats configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet', 'indent',
        'link'
    ];

    if (!initialPackage) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
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
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    name="type"
                    id="type"
                    value={formData.type || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Select Type</option>
                    <option value="Family">Insurance</option>
                    <option value="Honeymoon">Renewal</option>
                </select>
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {formData.image && (
                    <div className="mt-2">
                        <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="h-20 w-auto object-cover rounded" 
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'}
                        />
                    </div>
                )}
            </div>
            {/* <div>
                <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700">Itinerary PDF URL</label>
                <input
                    type="url"
                    name="itinerary"
                    id="itinerary"
                    value={formData.itinerary || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div> */}
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cancel
                </button>
                <button type="submit" className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update Package
                </button>
            </div>
        </form>
    );
};

export default EditpackagesForm;