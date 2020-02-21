"use strict";
const app = require('../_dialogflow-core').app;

const {
    BasicCard,
    Image,
    Suggestions
} = require('../_dialogflow-core').aog;

const R6API = require('r6api.js');
const r6api = new R6API('citohe1493@seo-mailer.com', 'ihl-pass');
const myr6api = require('../../rainbowsix-api/index');

app.intent('SearchForPlayer - Player Name', async (conv) => {

    if (conv.user.verification !== 'VERIFIED') {
        conv.close("I have detected a problem that may cause me to not work properly. Try again next time!");
    }

    conv.ask("What's the username of the player you're searching for? You may want to use the keyboard on this one.");
    // conv.ask("Yeeet");

    // const playerProfile = await r6api.getId('uplay', 'natsumeechi').then(result => result[0]);
    // console.log(playerProfile);

    // conv.ask(new BasicCard({
    //     title: playerProfile.username,
    //     text: `Testing`,
    //     subtitle: `PLATFORM: ${playerProfile.platform}`,\
    //     image: new Image({
    //       url: getPlayerImage(playerProfile.id),
    //       alt: `${playerProfile.username}'s avatar`,
    //     })
    //   }));
});

app.intent('SearchForPlayer - Platform', async (conv, {
    playerName
}) => {
    conv.data.searchingFor = playerName;
    // console.log("Player name: ", playerName);
    conv.ask(`And on what platform does '${playerName}' play on?`);
    conv.ask(new Suggestions([
        'PC (uPlay)', 'Xbox Live', 'Playstation'
    ]))


    //uplay, xbl, psn
    // var playerProfile = await r6api.getId('uplay', playerName).then(result => result);

    // if(playerProfile.length == 0){
    //     conv.ask(`I didn't found any player named ${}`);
    // }else if(playerProfile.length == 1){

    // }else{

    // }

});

app.intent('SearchForPlayer - Result', async (conv, {R6Platforms}) => {
    conv.data.searchingForPlatform = R6Platforms;

    const username = conv.data.searchingFor;
    const platform = conv.data.searchingForPlatform;
    // var playerProfile = await r6api.getId(platform, username);
    var searchresult = await myr6api.searchForPlayers(platform, username);

    if (searchresult.num_of_players == 0) {
        conv.ask(`I haven't found a player with a username ${username}. Do you want to search for another player?`);
    } else if (searchresult.num_of_players == 1) {
        var player = searchresult.players[0];

        conv.ask(`I found one player. Here is the information for ${player.p_name}`)

        conv.ask(new BasicCard({
            title: player.p_name,
            text: `Testing`,
            subtitle: `PLATFORM: ${player.p_platform}`,
            image: new Image({
                url: getPlayerImage(player.p_id),
                alt: `${player.p_name}'s avatar`,
            })
        }));
    } else {
        conv.ask("damn many players");
    }

    // conv.ask("Check console");
    // console.log("Object: ", playerProfile); 
});

function getPlayerImage(playerId) {
    var url = `https://ubisoft-avatars.akamaized.net/${playerId}/default_146_146.png`
    return url;
}