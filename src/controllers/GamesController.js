const DataBaseGames = require('../models/GamesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');

module.exports = {
    async getPage1(req, res){
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()
        const dataGames = await DataBaseGames.get()

        return res.render("jogos", { dataContact, dataGames, dataObservation })
    },
    async getPage2(req, res){
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()
        const dataGames = await DataBaseGames.get()

        return res.render("jogos2", { dataContact, dataGames, dataObservation })
    },
    async registerGame(req, res){
        
        await DataBaseGames.create({
            name: req.body["games-name"],
            link: req.body["games-link"],
            image: req.body["games-image"]
        })

        return res.render("Register")
    },
    async updatedGame(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["games-name"],
            link: req.body["games-link"],
            image: req.body["games-image"]
        }

        await DataBaseGames.update(bodyData, id)

        return res.redirect("/Register/" + id)
    },
    async deleteGame(req, res){
        const name = req.body["games-name"]

        await DataBaseGames.delete(name)

        return res.render("DeleteRegisters")
    }
}
