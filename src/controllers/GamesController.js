const DataBaseGames = require('../models/GamesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getPage(req, res) {
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        //sistema de paginação do conteúdo

        //quantidade de registros
        const totalRows = await DataBaseGames.countRow()

        //quantidade de registro por página
        let recordsPerPage = 18

        //quantidade de paginas 
        let numberOfPages = Math.ceil(totalRows / recordsPerPage)

        //página atual
        const urlParams = req.query.page
        const current = urlParams ? urlParams : 1

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;

        const dataGamesLimit = await DataBaseGames.getLimit(start, recordsPerPage);


        //dados de observação da página
        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {
            
            if(dataObservation[i].name.trim() === "sugestão"){
                noteSuggestion = dataObservation[i]
            }

            if(dataObservation[i].name.trim() === "preferencia-jogo"){
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
        let contacts = [];

        for (let i = 0; i < 3; i++) {
            
            if(dataContact[i] != null){
                contacts[i] = dataContact[i]
            }
            
        }

        return res.render("jogos", { contacts: contacts, dataSuggestion: noteSuggestion, dataObservation: pageObservation , dataGamesLimit, numberOfPages, current })
    },
    async registerGame(req, res){
        
        await DataBaseGames.create({
            id: uuid(),
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

        return res.render("UpdatedRegisters")
    },
    async deleteGame(req, res){
        const id = req.params.id

        await DataBaseGames.delete(id)

        return res.render("UpdatedRegisters")
    },
    async consultGame(req, res){
        const data = req.body["games-name"]
        

        const dataResult = await DataBaseGames.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowGame", {dataResult: dataResult})
    }
}
