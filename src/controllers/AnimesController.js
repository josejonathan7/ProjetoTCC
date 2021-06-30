const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');

module.exports = {
    async getPage1(req,res){
        const dataAnimes = await DataBaseAnimes.get()
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        return res.render("animes", { dataAnimes, dataContact, dataObservation })
    },
    async getPage2(req,res){
        const dataAnimes = await DataBaseAnimes.get()
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        return res.render("animes2", { dataAnimes, dataContact, dataObservation })
    },
    async registerAnime(req, res){
        
        const dataBody = {      
            name: req.body["anime-name"],
            link: req.body["anime-link"],
            image: req.body["anime-image"]
        }

        console.log(dataBody)

        await DataBaseAnimes.create(dataBody)

        return res.render("Register")
    },
    async updatedAnime(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["anime-name"],
            link: req.body["anime-link"],
            image: req.body["anime-image"]
        }

        await DataBaseAnimes.update(bodyData, id)

        return res.redirect("/Register/" + id)
    },
    async deleteAnime(req, res){
        const id = req.params.id;

        await DataBaseAnimes.delete(id)

        return res.render("Register")
    }
}
