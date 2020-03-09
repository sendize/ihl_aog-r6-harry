"use strict";
const app = require('../_dialogflow-core').app;

const {
    BasicCard,
    Image,
    Suggestions,
    Table,
    Carousel,
} = require('../_dialogflow-core').aog;

const helper = require('../helpers/helper');
const myr6api = require('../../rainbowsix-api/index').r6api;

app.intent('SearchForPlayer - Player Name', async (conv) => {
    if (conv.user.verification !== 'VERIFIED') {
        conv.close("I have detected a problem that may cause me to not work properly. Try again next time!");
    }

    conv.ask("What's the username of the player you're searching for? You may want to use the keyboard on this one.");
});

app.intent('SearchForPlayer - Platform', async (conv, {
    playerName
}) => {
    conv.data.searchingFor = playerName;
    conv.ask(`And on what platform does '${playerName}' play Rainbow Six Siege on?`);
    conv.ask(new Suggestions([
        'PC (uPlay)', 'Xbox Live', 'Playstation'
    ]))
});

app.intent('SearchForPlayer - Result', async (conv, {
    R6Platforms
}) => {
    conv.data.searchingForPlatform = R6Platforms;

    const username = conv.data.searchingFor;
    const platform = conv.data.searchingForPlatform;
    var searchresult = await myr6api.searchForPlayers(platform, username);

    if (searchresult.num_of_players == 0) {
        conv.ask(`I haven't found a player with a username '${username}' on the ${platform} platform. Do you want to search for another player?`);
    } else if (searchresult.num_of_players == 1) {
        var player = searchresult.players[0];

        if (player.p_name.toLowerCase() === username.toLowerCase()) {
            conv.ask(`Here's the information for '${player.p_name}'`);
        } else {
            conv.ask(`I haven't found a player with the username '${username}'; but I have found a player with a distinct similarity with that username. ` +
                `Here's the information for '${player.p_name}'`);
        }

        conv.ask(await displayPlayerCard(conv, player, false));

    } else {
        if (searchresult.num_of_players > 10) {
            conv.ask("I have found too many players! Try refining your search.");
        } else {
            conv.ask(`I found ${searchresult.num_of_players} players in searching for '${username}'. Click on any of them to view their profiles!`)
            conv.ask(helper.searchPlayersGenerateCarousel(`Search for ${username}`, searchresult.players));
        }
    }
    console.log("Object: ", searchresult);
});

app.intent('SearchForPlayer - Result (if many)', async (conv, params, option) => {

    conv.ask(`Here's the information for '${option}'`);
    conv.ask(await displayPlayerCard(conv, option, true));

});

async function displayPlayerCard(conv, usernameOrPlayer, needSearchAgain) {
    var player = "";

    if (needSearchAgain) {
        var searchresult = await myr6api.searchForPlayers(conv.data.searchingForPlatform, usernameOrPlayer);
        player = searchresult.players[0];
    } else {
        player = usernameOrPlayer;
    }

    var playerStats = await myr6api.getPlayerStats(conv.data.searchingForPlatform, player.p_id);
    var playerLevelXPProbability = await myr6api.getPlayerLevelXPProbability(conv.data.searchingForPlatform, player.p_id);

    player.pvpgeneral = playerStats[0]['pvp']['general'];
    player.pvegeneral = playerStats[0]['pve']['general'];
    player.level = playerLevelXPProbability[0].level;
    player.xp = playerLevelXPProbability[0].xp;
    player.lootBoxProbability = playerLevelXPProbability[0].lootboxProbability.percent;
    console.log("Player info: ", player.pvpgeneral);

    var platformFormatted = "";
    switch (conv.data.searchingForPlatform) {
        case 'uplay':
            platformFormatted = "PC";
            break;
        case 'psn':
            platformFormatted = "Playstation";
            break;
        case 'xbl':
            platformFormatted = "Xbox";
            break;
    }

    return new BasicCard({
        title: player.p_name,
        // subtitle: `Plays on ${platformFormatted} | Level ${player.level} with experience point ${player.xp} and an Alpha pack probability of ${player.lootBoxProbability}`,
        text: `${player.p_name} plays on ${platformFormatted}. They are level ${player.level} with an experience of ${player.xp} and an Alpha pack probability of ${player.lootBoxProbability}.  \n  \n` +
        `**General Statistics:**  (PvP <|> PvE)  \n` +
        `Playtime: ${player.pvpgeneral.playtime}   **<|>**   ${player.pvegeneral.playtime}  \n` +
        `⚔️ Kills: ${player.pvpgeneral.kills}   **<|>**   ${player.pvegeneral.kills}  \n` +
        `☠️ Deaths: ${player.pvpgeneral.deaths}   **<|>**   ${player.pvegeneral.deaths}  \n` +
        `🦾 Assist: ${player.pvpgeneral.assists}   **<|>**   ${player.pvegeneral.assists}  \n` + 
        `🏆 Wins: ${player.pvpgeneral.wins}   **<|>**   ${player.pvegeneral.wins}  \n` +
        `👎🏻 Losses: ${player.pvpgeneral.losses}   **<|>**   ${player.pvegeneral.losses}`,
        image: new Image({
            url: helper.getPlayerImage(player.p_id),
            alt: `${player.p_name}'s avatar`,
        })
    });
}