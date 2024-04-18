const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    complaint: String
  }, { collection: 'Requests' });
  
const Request = mongoose.model('Requests', requestsSchema);

module.exports = Request;