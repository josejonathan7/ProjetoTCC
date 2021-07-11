const DataBaseGames = require('../models/GamesModels');
const DataBaseUsers = require('../models/UsersModels');
const DataBaseObservation = require('../models/ObservationModels');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getPage(req, res) {
        const dataUser = await DataBaseUsers.get()
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
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {
            
            if(dataUser[i] != null){
                contactUsers[i] = dataUser[i]
            }
            
        }

        return res.render("jogos", { contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation , dataGamesLimit, numberOfPages, current })
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
    async updateGame(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["games-name"],
            link: req.body["games-link"],
            image: req.body["games-image"]
        }

        await DataBaseGames.update(bodyData, id)

        return res.render("UpdateRegisters")
    },
    async deleteGame(req, res){
        const id = req.params.id

        await DataBaseGames.delete(id)

        return res.render("UpdateRegisters")
    },
    async consultGame(req, res){
        const data = req.body["games-name"]
        

        const dataResult = await DataBaseGames.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowGame", {dataResult: dataResult})
    }
}
