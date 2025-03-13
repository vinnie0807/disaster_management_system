const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema({
  disasterType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  },
  description: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Disaster', disasterSchema);
