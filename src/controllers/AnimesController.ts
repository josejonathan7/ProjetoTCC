import { CreateAnimeService } from "../services/Create/CreateAnimeService";
import { Request, Response } from 'express';
import { UpdateAnimeService } from "../services/Update/UpdateAnimeService";
import { SearchAnimeService } from "../services/Search/SearchAnimeService";
import { PaginationAnimeService } from "../services/Get/QueryForPagination/PaginationAnimeService";
import { DeleteAnimeService } from "../services/Delete/DeleteAnimeService";

class AnimeController {
    
    async handleCreate(request: Request, response: Response){
        const { name, link, image } = request.body

        const creatAnimeService = new CreateAnimeService()

        const anime = await creatAnimeService.execute({name , link, image})

        return response.json(anime)
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, image } = request.body

        const updateAnimeService = new UpdateAnimeService()

        await updateAnimeService.execute({ id, name, link, image })

        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchAnimeService = new SearchAnimeService()

        const anime = await searchAnimeService.execute(name)

        const status = anime ? response.json(anime) : response.send("Anime não encontrada!")

        return status
    }
    
    async handlePagination(request: Request, response: Response){
        const paginationAnimeService = new PaginationAnimeService()

        //código para trabalhar com a páginação da página

        //quantidade de registro por página
        let recordsPerPage = 18

        //página atual
        const urlParams = request.query.page
        const current = Number (urlParams ? urlParams : 1)

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;

        //query que retorna os dados do banco de dados com o total de linhas
        const animePagination = await paginationAnimeService.execute(start, recordsPerPage)
        
        //quantidade de registros
        const totalRows = animePagination[1];

        
        //quantidade de paginas 
        let numberOfPages = Math.ceil(totalRows / recordsPerPage)

        //dados de observação da página

        /*let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {

            if (dataObservation[i].name.trim() === "sugestão") {
                noteSuggestion = dataObservation[i]
            }

            if (dataObservation[i].name.trim() === "preferencia-anime") {
                pageObservation = dataObservation[i]
            }

            if (!pageObservation) {
                pageObservation = {
                    name: "",
                    information: ""
                }
            }

            if (!noteSuggestion) {
                noteSuggestion = {
                    name: "",
                    information: ""
                }
            }
        }

        //dados de contato no rodapé
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {

            if (dataUsers[i] != null) {
                contactUsers[i] = dataUsers[i]
            }

        }*/

        
        const status = animePagination ?  animePagination : response.send("falha na paginação")

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteAnimeService = new DeleteAnimeService()

        await deleteAnimeService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { AnimeController }



/*
module.exports = {
    async getPage(req,res){
        const dataUsers = await DataBaseUsers.get()
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
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {
            
            if(dataUsers[i] != null){
                contactUsers[i] = dataUsers[i]
            }
            
        }
    
        return res.render("animes", { contactUsers, dataAnimesLimit, numberOfPages, current: current, dataSuggestion: noteSuggestion, dataObservation: pageObservation })
    }
}
*/