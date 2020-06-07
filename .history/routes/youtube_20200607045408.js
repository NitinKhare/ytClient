var {google} = require('googleapis');
var router =require("express").Router();

var settingOauthClient = function (req, res, next) {
    try {
        const clientID=  process.env.GOOGLE_CLIENTID;   
        const clientSecret= process.env.GOOGLE_CLIENTSECRET;
        var REDIRECT_URL = `http://localhost:3000/services/youtube/connect/callback`;
        var oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, REDIRECT_URL);
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt:'consent',
            scope: ['https://www.googleapis.com/auth/youtube',
                'https://www.googleapis.com/auth/youtubepartner-channel-audit']
        });
        res.redirect(url);
    }catch(error){
        console.log("An error occurred", error)
        res.status(406).json(error)
    }
}




router.get('/auth', settingOauthClient);
module.exports  = router;