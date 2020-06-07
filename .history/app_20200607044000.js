const express = require('express');
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("HomePage");
})

app.listen(PORT, _=>console.log(`The Server started ${PORT}`));