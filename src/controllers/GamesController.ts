import { CreateGameService } from "../services/Create/CreateGameService";
import { Request, Response } from "express";
import { UpdateGameService } from "../services/Update/UpdateGameService";
import { SearchGameService } from "../services/Search/SearchGameService";
import { DeleteGameService } from "../services/Delete/DeleteGameService";

class GameController {
    async handlePagination(request: Request, response: Response) {
        return response.send("Method not implemented.")
    }

    async handleCreate(request: Request, response: Response){
        const { name, link, image } = request.body

        const creatGameService = new CreateGameService()

        const game = await creatGameService.execute({ name, link, image })

        return response.json(game)
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, image } = request.body

        const updateGameService = new UpdateGameService()

        await updateGameService.execute({id, name, link, image})
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
    
    async handleSearch(request: Request, response: Response){
        const { name } = request.body

        const searchGameService = new SearchGameService()

        const game = await searchGameService.execute(name)

        const status = game ? response.json(game) : response.send("Jogo não encontrado!")

        return status
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteGameService = new DeleteGameService()

        await deleteGameService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { GameController }

/*
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
    }
}
*/