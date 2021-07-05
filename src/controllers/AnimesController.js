const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getPage(req,res){
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        //quantidade de registros
        const totalRows = await DataBaseAnimes.countRow()
        
        //quantidade de registro por página
        let recordsPerPage = 27

        //quantidade de paginas 
        let numberOfPages = Math.ceil(totalRows / recordsPerPage)

        //página atual
        const urlParams = req.query.page
        const current = urlParams ? urlParams : 1  

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;



        
        const dataAnimesLimit = await DataBaseAnimes.getLimit(start, recordsPerPage);


        return res.render("animes", { dataContact, dataObservation, dataAnimesLimit, numberOfPages, current })
    },
    async registerAnime(req, res){
        
        const dataBody = {      
            id: uuid(),
            name: req.body["anime-name"],
            link: req.body["anime-link"],
            image: req.body["anime-image"]
        }

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

        return res.render("UpdatedRegisters")
    },
    async deleteAnime(req, res){
        
        const id = req.params.id

        await DataBaseAnimes.delete(id)

        return res.render("UpdatedRegisters")
    },
    async consultAnime(req, res){
        const data = {
           name: req.body["anime-name"]
        }

    
        const dataResult = await DataBaseAnimes.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowAnime", {dataResult: dataResult})
    }
}
