const app = require('./_dialogflow-core').app;
require('./intents/about');
require('./intents/welcome');
require('./intents/searchforplayer');
require('./intents/serverstatus');

module.exports = {
   app
}