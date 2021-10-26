// const { urlencoded } = require("express");
const userRouter = require('./routes/users')
const express = require("express");
const app = express();
const PORT = 3002;
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});


// Default Middelware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router
app.use('/users',userRouter);

// Server Running On Port 3002
app.listen(PORT, () =>{
    console.log("Server Running ")
})








// app.get('/', (req,res) => {
//     //     res.send('hello home page')
//     // });
    

//CUSTOM MIDDELWARE FOR CHECKING QUERIES
// app.use((req,res,next) => {
//     console.log('in miidleare');
//     if(req.query.age < 16){
//         return res.status(403).json({error: 'age should be greater than 16'})
//     }else{
//         next();
//     }
// });