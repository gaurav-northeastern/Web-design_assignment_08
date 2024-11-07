const express = require('express');
const mongoose = require('mongoose');
const Userroutes = require('./routes/routesUser');

const PORT = 3000;


const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

mongoose.connect("mongodb+srv://turbo:gaurav123@ass8.75gvp.mongodb.net/?retryWrites=true&w=majority&appName=ass8")
    .then(() => {
        console.log("MongoDB is connected");
    })

app.use('/user', Userroutes);