const express = require('express');
require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("HomePage")
})