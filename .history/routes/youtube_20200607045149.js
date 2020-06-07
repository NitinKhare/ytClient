var {google} = require('googleapis');
var router =require("express").Router();

router.get('/auth', function (req, res){
    res.send("This will be auth");
})




router.get('/auth', settingOauthClient, youtubeClient);
router.get('/auth/callback', settingOauthClient,youtubeAuthCallback);
module.exports  = router;