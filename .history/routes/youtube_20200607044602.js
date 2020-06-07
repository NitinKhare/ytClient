var {google} = require('googleapis');
var router =require("express").Router();

router.get('/auth', function (req, res){
    res.send("This will be auth");
})





module.exports  = router;