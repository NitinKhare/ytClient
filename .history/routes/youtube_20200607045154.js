var {google} = require('googleapis');
var router =require("express").Router();

var settingOauthClient = function (req, res, next) {
    try {
        const clientID=  process.env.GOOGLE_CLIENTID;   
        const clientSecret= process.env.GOOGLE_CLIENTSECRET;
        var REDIRECT_URL = `${process.env.BASE_URL}/services/youtube/connect/callback`;
        var oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, REDIRECT_URL);
        req.oAuth2Client = oAuth2Client;
        next();
    }catch(error){
        console.log("An error occurred", error)
        res.status(406).json(error)
    }
}



router.get('/auth', settingOauthClient, youtubeClient);
router.get('/auth/callback', settingOauthClient,youtubeAuthCallback);
module.exports  = router;