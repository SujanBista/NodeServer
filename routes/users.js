const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema')
// Get Requests
router.get('/', (req, res) => {
    queryparam = req.query.data;

    res.json({
        data: queryparam
    })
});

// Get Requests
router.get('/contact/:id', (req, res) => {
    res.status(200).json({
        // THIS ONE IS FOR CATCHING PARAM
        id: req.params.id,
        // THIS ONE IS FOR CATCHING QUERY
        queryparam: req.query.phone,

        users: [
            {
                name: 'sujan',
                state: 'nsw'
            },
            {
                name: 'ram',
                state: 'qld'
            }
        ]
    })
});

// Post requests
router.post('/', (req, res) => {
    const { age, name, uname } = req.body;

    //Small Name Validation 
    if (uname === '') {
        res.status(400).json({ error: 'username required' });
        return
    }

    res.json(req.body);
});

// Post requests
router.post('/register', async (req, res) => {

    try{
    const { name, email, phone, work, password, cpassword } = req.body;
    console.log(req.body);

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: " fill the form" })
    }
    const userExist = await User.findOne({email})
    if(userExist) return res.status(422).json({error: "User already Exist"})
    const savedUser = new User({name, email, phone, work, password, cpassword}).save();
    if(savedUser) return res.status(200).json({data: savedUser})
}catch(ex){
    return res.status(500).json({data: ex.message()})
}
});

router.post('/login', async (req,res) => {
   
    try{
        const{email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({data: "user no existo"})
        const passwordcheck = user.password === password;
        passwordcheck ? res.status(200).json({data: "wwelcome"}) : res.status(400).json({data: "invalid attempt"});

    }catch(ex){
        return res.status(500).json({data: ex.message()})
    }
})
module.exports = router;
