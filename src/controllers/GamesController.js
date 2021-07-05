const DataBaseGames = require('../models/GamesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getPage(req, res) {
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

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

        return res.render("jogos", { dataContact, dataObservation, dataGamesLimit, numberOfPages, current })
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
        const data = {
           name: req.body["games-name"]
        }

        const dataResult = await DataBaseGames.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowGame", {dataResult: dataResult})
    }
}
