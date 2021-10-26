const mongoose = require('mongoose');
const DB = process.env.DATABASE || "mongodb+srv://Sujan:sujan123@cluster0.s35mb.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DataBase Connected Successfully');
    }).catch((err) => console.log(err));