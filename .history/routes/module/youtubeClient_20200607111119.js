const {google} = require('googleapis');
let YoutubeService = require('../../db/models/YoutubeService')
require('dotenv').config({path: '../../.env'})
var dbFunctions = require('./dbfunctions');

module.exports = class youtubeClient {
    constructor({refreshToken, userId, serviceId}) {
        this.refreshToken = refreshToken;
        this.oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENTID, process.env.GOOGLE_CLIENTSECRET, `${process.env.BASE_URL}/services/youtube/connect/callback`);
        this.params = {};
        this.apiName = "";
        this.userId = userId;
        this.serviceId = serviceId
    }

    setCredentialsOnClient() {
        this.oAuth2Client.setCredentials({refresh_token: this.refreshToken});
    }


    setParams(type) {
        switch (type) {
            case 'channels':
                this.apiName = 'channels'
                this.params = {
                    part: 'contentDetails,snippet,contentOwnerDetails,statistics',
                    mine: true,
                };
                break;
            case 'videos':
                this.apiName = 'search'
                this.params = {
                    part: "snippet",
                    forMine: true,
                    maxResult: 25, //will check for this
                    type: "video"
                };
                break;
            default:
                break;
        }
    }

    async getDataWithClient(type, channelId = "") {
        try {
            type = type.toLowerCase();
            this.setCredentialsOnClient();
            this.setParams(type);
            let totalFetchedResult = 0;
            let youtubeData = google.youtube('v3');
            if (type == 'videos') this.params.id = "UCEDVGkzXk2sYSZy5l7toafw";
            let data = [];
            while (true) {
                const youtubeContentData = await youtubeData[this.apiName].list({
                    ...this.params,
                    auth: this.oAuth2Client
                })
                data.push(youtubeContentData.data)
                if (type == 'channels' || data.length == youtubeContentData.data.pageInfo.totalResults) return data;
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async ChannelDataRequest() {
        try {
            let data = await this.getDataWithClient(`channels`);
            let videosFromChannel = await this.getDataWithClient('videos');
            let newYoutubeData = new YoutubeService({
                AccountName: data[0].items[0].id,
                lastUpdateAt: Number(new Date().getTime()),
                VideoCount: 0,
                User: this.userId,
                Service: this.serviceId,
                channel: {
                    ...data[0].items[0]
                },
                videos: [...videosFromChannel]
            })
            console.log("before save")
            let addedService = await newYoutubeData.save();
            return addedYoutubeService;
        } catch (error) {
            console.log("Error in save", error)
        }
    }

}


