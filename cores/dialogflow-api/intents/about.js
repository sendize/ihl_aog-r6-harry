"use strict";
const app = require('../_dialogflow-core').app;

app.intent('About', (conv) => {
    conv.ask("#LiraStillGay2020");
});