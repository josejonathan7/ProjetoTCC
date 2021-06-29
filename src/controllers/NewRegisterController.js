const AnimesData = require('../models/AnimesModels')
const GamesData = require('../models/GamesModels')
const SongsData = require('../models/SongsModels')
const ContactData = require('../models/ContactModels')

module.exports = {
    accesForm(req, res){
        return res.render("NewRegister")
    },
    newRegisterAnime(req, res){
        
        AnimesData.create({
            id: 1,
            name: req.body["anime-name"],
            link: req.body["anime-link"],
            image: req.body["anime-image"]
        })

        return res.render("newRegister")
    },
    newRegisterGames(req, res){
        GamesData.create({
            id: 1,
            name: req.body["games-name"],
            link: req.body["games-link"],
            image: req.body["games-image"]
        })

        return res.render("newRegister")
    },
    newRegisterSongs(req, res){
        SongsData.create({
            id: 1,
            name: req.body["song-name"],
            link: req.body["song-link"]
        })

        return res.render("newRegister")
    },
    newRegisterContact(req, res){
        ContactData.create({
            id: 1,
            name: req.body["contact-name"],
            link: req.body["contact-link"],
            description: req.body["contact-image"]
        })

        return res.render("newRegister")
    },
    deleteRegister(req, res){

    }
}