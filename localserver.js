const express = require("express");
const path = require("path");
const admin = require('./adminside');
const student = require('./studentside');
const bodyParser = require('body-parser');
const Request = require("./models/requestschema")
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/HostelMS");

app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON bodies

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
      res.type('application/javascript');
  }
  next();
});

app.get('*.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(req.path);
});

// Specify the path to your static files directory
const staticFilesPath = path.join(__dirname, "public");

// Serve static files from the specified directory
app.use(express.static(staticFilesPath));
app.use('/admin-login', admin);
app.use('/student-login', student);

app.get("/", (req, res) => {
  console.log("Redirecting To Home Page");
  res.sendFile(path.join(__dirname, "/public/files/home.html"));
});

app.get("/home", (req, res) => {
  console.log("Redirecting To Home Page");
  res.sendFile(path.join(__dirname, "/public/files/home.html"));
});

app.get("/about", (req, res) => {
  console.log("Redirecting To Home Page");
  res.sendFile(path.join(__dirname, "/public/files/about.html"));
});

app.get("/contact", (req, res) => {
  console.log("Redirecting To Contact Us Page");
  res.sendFile(path.join(__dirname, "/public/files/contact.html"));
}).post("/contact", async (req, res) => {
  try {
    // Assuming middleware already parses formData
    const formData = req.body;
    const { name, phnumber, email, requesti } = formData;
    console.log('Name:', name);
    console.log('Phone:', phnumber);
    console.log('Email:', email);
    console.log('Request:', requesti);

    const newdata = new Request({name:`${name}`,email:`${email}`,phone:`${phnumber}`,complaint:`${requesti}`,})
    newdata.save()
    
    res.send("Request received successfully")
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/login", (req, res) => {
  console.log("Redirecting To Login Page");
  res.sendFile(path.join(__dirname, "/public/files/login.html"));
});

app.get("/view", (req,res)=>{
  console.log("Redirecting To 3D Preview");
  res.sendFile(path.join(__dirname, "/public/files/3d-room.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
