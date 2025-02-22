const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortdescription:{type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number },
  image: { type: String, required: true },
  itinerary: { 
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['chardham', 'destination'],
    required: true,
    default: 'chardham'
  }
});

module.exports = mongoose.model('Package', PackageSchema);