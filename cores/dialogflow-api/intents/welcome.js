"use strict";
const app = require('../_dialogflow-core').app;

const {
    Suggestions
} = require('../_dialogflow-core').aog;



app.intent('Default Welcome Intent', (conv) => {
    conv.ask(welcome_messages[getRandomInt(2)]);
    conv.ask(new Suggestions("aaa"));
});



const welcome_messages = [
    "Hi, operator! What do you want to do today?",
    "Good day, operator. What would you like to know today?"
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }