var {google} = require('googleapis');
var router =require("express").Router();

var settingOauthClient = function (req, res, next) {
    try {
        const clientID=  process.env.GOOGLE_CLIENTID;   
        const clientSecret= process.env.GOOGLE_CLIENTSECRET;
        var REDIRECT_URL = `http://localhost:3000/youtube/auth/callback`;
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
    res.redirect(url)
}


var youtubeClient =  function(req, res, next) {
    const url = req.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt:'consent',
        scope: ['https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtubepartner-channel-audit']
    });
    console.log(url);
    res.status(200).json({redirecTo:url})
}

var youtubeAuthCallback = async function (req, res, next) {
    try {
        var code = req.query.code;
        console.log(code)
        if (code) {
            const {tokens} = await req.oAuth2Client.getToken(code);
            console.log(tokens);
            let ytClient = require('./module/youtubeClient');
            let youtubeClient = new ytClient({refreshToken:refresh_token})
            let channelData = await youtubeClient.ChannelDataRequest();
            res.send(c)
        } else {
            throw new Error("no Token");
        }
    }catch (error) {
        res.json({error: true, description: error.message})
    }
}

router.get('/auth/callback', settingOauthClient,youtubeAuthCallback);

router.get('/auth', settingOauthClient,youtubeAuthURL);
module.exports  = router;