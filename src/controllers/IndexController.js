const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseGames = require('../models/GamesModels');
const DataBaseSongs = require('../models/SongsModels');
const DataBaseSites = require('../models/SitesModels');

module.exports = {
    getData(req,res) {
        const dataAnimes = DataBaseAnimes.get()
        const dataContact = DataBaseContact.get()
        const dataGames = DataBaseGames.get()
        const dataObservation = DataBaseObservation.get()
        const dataSites = DataBaseSites.get()
        const dataSongs = DataBaseSongs.get()

        return res.render("index", { dataAnimes, dataContact, dataGames, dataObservation, dataSites, dataSongs })
    }
}