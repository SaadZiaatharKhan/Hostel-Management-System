const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
  username: String,
  password: String,
  dob: String,
  address: String,
  city: String,
  country: String,
  room: String,
  floor: String,
  ac:String,
  photo: {
      data: Buffer, // Store photo data as binary data
      contentType: String // Store photo content type as string
  }
}, { collection: 'Students' });

const Student = mongoose.model('Students', StudentsSchema);

module.exports = Student;