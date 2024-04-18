const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const mongoose = require("mongoose");
const Student = require("./models/admincheck")


mongoose.connect("mongodb://localhost:27017/HostelMS");


// Set up multer to handle file uploads
const uploadi = multer({ dest: 'uploads/' });

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
router.use(express.json()); // Parse JSON bodies

router.get('/student-signin', (req, res) => {
    console.log("Redirecting To Student Log In Page");
    res.sendFile(path.join(__dirname, "/public/files/student-login.html"));
});

router.get('/', (req, res) => {
    console.log("Redirecting To Student Sign In Page");
    res.sendFile(path.join(__dirname, "/public/files/student-signin.html"));
}).post('/', upload.single('photo'), (req, res) => {
    try {
        const formData = req.body;
        const { username, password, dob, address, cities, country, room, floor, ac } = formData;
        const photoData = req.file.buffer; // Access the buffer containing the photo data
        const photoContentType = req.file.mimetype; 
        console.log(username, password, dob, photoData);
        res.send('Received form data successfully!');
        const newdatai= new Student({username: `${username}`,
            password: `${password}`,
            dob: `${dob}`,
            address: `${address}`,
            city: `${cities}`,
            country: `${country}`,
            room: `${room}`,
            floor: `${floor}`,
            ac: `${ac}`,
            photo: {
                data: `${photoData}`,
                contentType: `${photoContentType}`
            }})
            newdatai.save()
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;