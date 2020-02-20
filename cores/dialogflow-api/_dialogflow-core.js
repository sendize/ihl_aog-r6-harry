"use strict";
const {
    dialogflow,
    Suggestions,
    BasicCard,
    Image
} = require('actions-on-google');

var aog_variables = {
    Suggestions,
    dialogflow,
    BasicCard,
    Image
}

const app = dialogflow({
    clientId: '1056163294496-8cducrn97mtok2vrqoku9eqrs24emnve.apps.googleusercontent.com',
});



module.exports = {
    app: app,
    aog: aog_variables
}