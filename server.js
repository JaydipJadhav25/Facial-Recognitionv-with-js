// const express = require('express')
// const app = express()
// app.use(express.static('public')) //serve our files in public statically
// app.listen(5000 ,() =>{
//     console.log("SERVER IS STARTING ON PORT :: 50000 🚀")
// })

import express from 'express';
const app = express();

app.use(express.static('public')); // Serve files in 'public' statically
app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.get("/demo" , (req , res)=>{
    return res.send("<h1>hello world from jaydip</h1>")
})
app.listen(3000, () => {
    console.log("SERVER IS STARTING ON PORT : 3000 🚀");
});