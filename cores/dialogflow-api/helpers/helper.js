const {
    Carousel,
    Image
} = require('../_dialogflow-core').aog;


class Helper {
    generateCarousel(title, items) {

        return new Carousel({
            title: '',
            items: '',
        });
    }

    searchPlayersGenerateCarousel(setTitle, players) {

        var returnPlayers = {};

        players.forEach(player => {
            returnPlayers[player.p_name] = {
                title: player.p_name,
                description: '',
                image: new Image({
                    url: this.getPlayerImage(player.p_id),
                    alt: player.p_name,
                }),
            }
        });

        return new Carousel({
            title: setTitle,
            items: returnPlayers,
        });
    }

    getPlayerImage(playerId) {
        var url = `https://ubisoft-avatars.akamaized.net/${playerId}/default_146_146.png`
        return url;
    }

}

module.exports = new Helper;