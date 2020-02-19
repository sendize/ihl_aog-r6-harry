"use strict";
const {
    dialogflow,
    Suggestions
} = require('actions-on-google');

var aog_variables = {
    Suggestions,
    dialogflow
}

const app = dialogflow({
    clientId: '1056163294496-8cducrn97mtok2vrqoku9eqrs24emnve.apps.googleusercontent.com',
});



module.exports = {
    app: app,
    aog: aog_variables
}