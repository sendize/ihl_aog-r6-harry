"use strict";
const app = require('../_dialogflow-core').app;

const {
    BasicCard,
    Image,
    Suggestions,
    Table
} = require('../_dialogflow-core').aog;

// const R6API = require('r6api.js');
// const r6api = new R6API('citohe1493@seo-mailer.com', 'ihl-pass');
const myr6api = require('../../rainbowsix-api/index').r6api;

app.intent('ServerStatus', async (conv) => {
    var serverStats = await myr6api.getServerStatus();
    console.log(serverStats);

    var serverPC = serverStats['PC'];
    var serverPS4 = serverStats['PS4'];
    var serverXBOX = serverStats['XBOX'];

    conv.ask("Here are the status of each Rainbow Six Siege servers.");

    conv.ask(new Table({
        title: "Rainbow Six Servers",
        dividers: true,
        columns: ['Platform', 'Status', 'In Maintenance?'],
        rows: [
            ['PC', `${serverPC.Status}`, serverPC.Maintenance ? 'Yes' : 'No'],
            ['PS4', `${serverPS4.Status}`, `${serverPS4.Maintenance}`],
            ['XBOX', `${serverXBOX.Status}`, `${serverXBOX.Maintenance}`],
        ],
    }));

    conv.ask("What would you like to do next?");
});