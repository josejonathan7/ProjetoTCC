const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const { v4 } = require('uuid')
const uuid = v4

module.exports = {
    async getPage(req,res){
        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()

        //código para trabalhar com a páginação da página

        //quantidade de registros
        const totalRows = await DataBaseAnimes.countRow()
        
        //quantidade de registro por página
        let recordsPerPage = 18

        //quantidade de paginas 
        let numberOfPages = Math.ceil(totalRows / recordsPerPage)

        //página atual
        const urlParams = req.query.page
        const current = urlParams ? urlParams : 1  

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;

        const dataAnimesLimit = await DataBaseAnimes.getLimit(start, recordsPerPage);


        //dados de observação da página

        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {
            
            if(dataObservation[i].name.trim() === "sugestão"){
                noteSuggestion = dataObservation[i]
            }
            
            if(dataObservation[i].name.trim() === "preferencia-anime"){
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

    
        return res.render("animes", { contacts: contacts, dataAnimesLimit, numberOfPages, current, dataSuggestion: noteSuggestion, dataObservation: pageObservation })
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
        const data = req.body["anime-name"]
        

    
        const dataResult = await DataBaseAnimes.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowAnime", {dataResult: dataResult})
    }
}
