'use strict';

const axios = require('axios');

class MyRainbowSixAPI{

    async searchForPlayers(platform, username){
        var raw_result = await axios.get(`https://r6tab.com/api/search.php?platform=${platform}&search=${username}`).then(response => response.data);

        var result = {
            players: raw_result.results,
            num_of_players:  raw_result.totalresults
        }
        return result;
    }
}

module.exports = {
    api: new MyRainbowSixAPI()
}