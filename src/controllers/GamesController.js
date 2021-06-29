const DataBaseGames = require('../models/GamesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');

module.exports = {
    getData(req, res){
        const dataContact = DataBaseContact.get()
        const dataObservation = DataBaseObservation.get()
        const dataGames = DataBaseGames.get()

        return res.render("jogos", { dataContact, dataGames, dataObservation })
    }
}
