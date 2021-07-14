const DataBaseSongs = require('../models/SongsModels');
const DataBaseUsers = require('../models/UsersModels');
const DataBaseObservation = require('../models/ObservationModels');
const { Database } = require('sqlite3');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getData(req, res){
        const dataSongs = await DataBaseSongs.get()
        const dataUser = await DataBaseUsers.get()
        const dataObservation = await DataBaseObservation.get()

        
        //dados de observação da página
        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {
            
            if(dataObservation[i].name.trim() === "sugestão"){
                noteSuggestion = dataObservation[i]
            }

            if(dataObservation[i].name.trim() === "preferencia-musica"){
                pageObservation = dataObservation[i]
            }

            if(!pageObservation){
                pageObservation = {
                    name: "",
                    information: ""
                }
            }

            if(!noteSuggestion){
                noteSuggestion = {
                    name: "",
                    information: ""
                }
            }
        }

        
        //dados de contato no rodapé
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {
            
            if(dataUser[i] != null){
                contactUsers[i] = dataUser[i]
            }
            
        }

        return res.render("musicas", { dataSongs, contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation })
    },   
    async registerSong(req, res){
        
        await DataBaseSongs.create({
            id: uuid(),
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

        return res.render("UpdateRegisters")
    },
    async deleteSong(req, res){
        const id = req.params.id;

        await DataBaseSongs.delete(id)

        return res.render("UpdateRegisters")
    },
    async consultSong(req, res){
        const data = {
           name: req.body["song-name"]
        }

    
        const dataResult = await DataBaseSongs.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowSong", {dataResult: dataResult})
    }
}
