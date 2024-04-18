const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const S = require("./models/admincheck.js");
const Request = require("./models/requestschema.js")
const { Console } = require('console');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/HostelMS");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'Admin' });

const Admin = mongoose.model('Admin', adminSchema);

router.get('/', (req, res) => {
    console.log("Redirecting To Admin Log In Page");
    res.sendFile(path.join(__dirname, "/public/files/admin.html"));
}).post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Username:', username);
        console.log('Password:', password);

        const admin = await Admin.findOne({ username, password });
        
        if (admin) {
            console.log("Yes");
            res.send(`Yes`);
        } else {
            console.log("No");
            res.send(`No`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/admin-page', async (req, res) => {
    console.log("Redirecting To Admin Page");
    res.sendFile(path.join(__dirname, "/public/files/admin-page.html"))
}).post('/admin-page', async(req,res)=>{
    const message = req.body.message;
    if (message=="dashboard") {
        console.log(message);
        let admin = await S.find({})
        res.send(JSON.stringify(admin))
    }
    else if (message=="request") {
        console.log(message);
        let request = await Request.find({})
        res.send(JSON.stringify(request))
        
    }});

app.use(router);


module.exports = router;
