'use strict';

const axios = require('axios');
const R6API = require('r6api.js');
const r6api = new R6API('citohe1493@seo-mailer.com', 'ihl-pass');

class MyRainbowSixAPI{
    async searchForPlayers(platform, username){
        var raw_result = await axios.get(`https://r6tab.com/api/search.php?platform=${platform}&search=${username}`).then(response => response.data);

        var result = {
            players: raw_result.results,
            num_of_players:  raw_result.totalresults
        }
        
        return result;
    }

    async getServerStatus(){
        return await r6api.getStatus();
    }

    async getPlayerStats(platform, id){
        return await r6api.getStats(platform, id);
    }

    async getPlayerLevelXPProbability(platform, id){
        return await r6api.getLevel(platform, id);
    }
}

module.exports = {
    api: new MyRainbowSixAPI()
}