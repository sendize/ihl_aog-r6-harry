"use strict";
const app = require('../_dialogflow-core').app;

const {
    Suggestions
} = require('../_dialogflow-core').aog;



app.intent('Default Welcome Intent', (conv) => {
    console.log(welcome_messages.length);
    conv.ask(welcome_messages[getRandomInt(welcome_messages.length - 1)]);
    conv.ask(new Suggestions("aaa"));
});



const welcome_messages = [
    "Hello, operator! What do you want to do today?",
    "Good day, operator. What would you like to know today?",
    "What's going on, operator? Tell me what you want to do for today"
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }