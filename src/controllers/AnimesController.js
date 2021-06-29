const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');

module.exports = {
    getData(req,res){
        const dataAnimes = DataBaseAnimes.get()
        const dataContact = DataBaseContact.get()
        const dataObservation = DataBaseObservation.get()

        return res.render("animes", { dataAnimes: dataAnimes, dataContact, dataObservation })
    }
}
