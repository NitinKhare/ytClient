var {google} = require('googleapis');
var router =require("express").Router();

var settingOauthClient = function (req, res, next) {
    try {
        const clientID=  process.env.GOOGLE_CLIENTID;   
        const clientSecret= process.env.GOOGLE_CLIENTSECRET;
        var REDIRECT_URL = `http://localhost:3000/services/youtube/connect/callback`;
        var oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, REDIRECT_URL);
        req.oAuth2Client = oAuth2Client;
        next();
    }catch(error){
        console.log("An error occurred", error)
        res.status(406).json(error)
    }
}

var youtubeAuthURL =  function(req, res, next) {
    const url = req.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt:'consent',
        scope: ['https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtubepartner-channel-audit']
    });
    console.log(url);
    res.status(200).json({Auth:url})
}





router.get('/auth', settingOauthClient,youtubeAuthURL);
module.exports  = router;