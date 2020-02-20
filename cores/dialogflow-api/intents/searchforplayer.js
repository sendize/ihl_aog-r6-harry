"use strict";
const app = require('../_dialogflow-core').app;

const {
    BasicCard,
    Image
} = require('../_dialogflow-core').aog;

// const RainbowSixApi = require('rainbowsix-api-node');
// const r6 = new RainbowSixApi();
const R6API = require('r6api.js');
const r6api = new R6API('citohe1493@seo-mailer.com', 'ihl-pass');


const IMAGE_URL = "https://ubisoft-avatars.akamaized.net/p_user/default_146_146.png";

app.intent('SearchForPlayer', async (conv) => {
    conv.ask("Yeeet");




    const playerProfile = await r6api.getId('uplay', 'natsumeechi').then(result => result[0]);
    console.log(playerProfile);

    conv.ask(new BasicCard({
        title: playerProfile.username,
        text: `Testing`,
        subtitle: `PLATFORM: ${playerProfile.platform}`,
        // buttons: new Button({
        //   title: 'This is a button',
        //   url: 'https://assistant.google.com/',
        // }),
        image: new Image({
          url: getPlayerImage(playerProfile.id),
          alt: `${playerProfile.username}'s avatar`,
        })
      }));
});

function getPlayerImage(playerId){
    var url = `https://ubisoft-avatars.akamaized.net/${playerId}/default_146_146.png`
    return url;
}