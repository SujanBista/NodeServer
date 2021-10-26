const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// DATABASE CONNECTION
require('../db/conn');
const User = require('../model/userSchema')

// GET REQUESTS FOR FETCHING USER LIST
router.get('/', async (req, res) => {

    try {
        const userlist = await User.find(); 

        if(userlist.length >= 1){
            return res.status(200).json({data: userlist})
        }else{
            return res.status(200).json({data: "no userlist found"})
        }     
        
    } catch (ex) {
        return res.status(500).json({ data: ex.message() })
    }
});

// Post requests for REGISTRATION OF USER
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: " fill the form" })
    }

    try {     
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(422).json({ error: "User already Exist" })

        const savedUser = new User({ name, email, phone, work, password, cpassword });
        await savedUser.save();

        if (savedUser) return res.status(200).json({ data: "savedUser" })

    } catch (ex) {
        return res.status(500).json({ data: ex.message() })
    }
});

// Post requests for LOGIN OF USER
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        // console.log(user.password)

        if (!user) return res.status(404).json({ data: "User Does not Exist. Please Sign Up" })

        const passwordcheck = await bcrypt.compare(password, user.password); 
        passwordcheck ? res.status(200).json({ data: "Welcome" }) : res.status(400).json({ data: "Credentials Dosent Match!!" });

    } catch (ex) {
        return res.status(500).json({ data: 'error' })
    }
})

module.exports = router;
