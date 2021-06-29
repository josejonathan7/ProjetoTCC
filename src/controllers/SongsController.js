const DataBaseSongs = require('../models/SongsModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');

module.exports = {
    getData(req, res){
        const dataSongs = DataBaseSongs.get()
        const dataContact = DataBaseContact.get()
        const dataObservation = DataBaseObservation.get()

        return res.render("musicas", { dataSongs, dataContact, dataObservation })
    }
}
