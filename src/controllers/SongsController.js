const DataBaseSongs = require('../models/SongsModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const { Database } = require('sqlite3');

module.exports = {
    async getData(req, res){
        const dataSongs = await DataBaseSongs.get()
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        return res.render("musicas", { dataSongs, dataContact, dataObservation })
    },   
    async registerSong(req, res){
        
        await DataBaseSongs.create({
            name: req.body["song-name"],
            link: req.body["song-link"]
        })

        return res.render("Register")
    }, 
    async updatedSong(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["song-name"],
            link: req.body["song-link"],
            image: req.body["song-image"]
        }

        await DataBaseSongs.update(bodyData, id)

        return res.render("UpdatedRegisters")
    },
    async deleteSong(req, res){
        const name = req.body["song-name"];

        await DataBaseSongs.delete(name)

        return res.render("DeleteRegisters")
    },
    async consultSong(req, res){
        const data = {
           name: req.body["song-name"]
        }

    
        const dataResult = await DataBaseSongs.getForName(data)

        return res.render("update/UpdateShowSong", {dataResult: dataResult})
    }
}
