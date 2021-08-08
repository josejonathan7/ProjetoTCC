import { CreateGameService } from "../services/Create/CreateGameService";
import { Request, Response } from "express";
import { UpdateGameService } from "../services/Update/UpdateGameService";
import { SearchGameService } from "../services/Search/SearchGameService";
import { DeleteGameService } from "../services/Delete/DeleteGameService";
import { UserController } from "./UserController";
import { ObservationController } from "./ObservationController";
import { PaginationGameService } from "../services/Get/QueryForPagination/PaginationGameService";
import { GetGameService } from "../services/Get/GetGameService";


class GameController {

    async handlePagination(request: Request, response: Response) {
        const paginationGameService = new PaginationGameService();
        const userController = new UserController();
        const observationController = new ObservationController();

        const observation = await observationController.handleGet();
        const user = await userController.handleGet();

        //código para trabalhar com a páginação da página

        //quantidade de registro por página
        let recordsPerPage = 2;

        //página atual
        const urlParams = request.query.page;
        const current = Number (urlParams ? urlParams : 1);

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;

        //query que retorna os dados do banco de dados com o total de linhas
        const gamePagination = await paginationGameService.execute(start, recordsPerPage);

        //quantidade de registros
        const totalRows = gamePagination[1];

        
        //quantidade de paginas 
        let numberOfPages = Math.ceil(Number(totalRows) / recordsPerPage);

        //dados de observação da página

        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < observation.length; i++) {

            if (observation[i].name.trim() === "sugestão") {
                noteSuggestion = observation[i];
            }

            if (observation[i].name.trim() === "preferencia-anime") {
                pageObservation = observation[i];
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
        const randomUsers = Math.floor(Math.random() * (user.length - 0));
        const contactUsers = user[randomUsers];
        

        const status = gamePagination ?  gamePagination[0] : response.status(401).send("Load Pagination Failed!")
        
        //return response.render("jogos", { contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation , dataGamesLimit: status, numberOfPages, current })

        return response.json({contactUsers, noteSuggestion, pageObservation, status, numberOfPages, current});
    }

    async handleCreate(request: Request, response: Response){
        const name = request.body["game-name"];
        const link = request.body["game-link"];
        const image = request.body["game-image"];

        const creatGameService = new CreateGameService();

        try {
            const creatGame = await creatGameService.execute({ name, link, image });

            return response.send(creatGame);
            
        } catch (err) {
            return response.json({error: err.message});
        }

        //return response.render("Register")
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const name =   request.body["game-name"]
        const link = request.body["game-link"]
        const image = request.body["game-image"]

        const updateGameService = new UpdateGameService()

        await updateGameService.execute({ id, name, link, image })
        
        return response.render("UpdateRegisters")
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body["game-name"]

        const searchGameService = new SearchGameService()

        const game = await searchGameService.execute(name)

        const status = game ? response.render("updateDelete/UpdateDeleteShowGame", { dataResult: game }) : response.status(401).send("Name Search Not Found!")

        return status
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteGameService = new DeleteGameService()

        await deleteGameService.execute(id)

        return response.render("UpdateRegisters")
    }

    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    async handleGetAll(){
        const getGameService = new GetGameService()
        
        const games = await getGameService.execute()
        let gamesCarousel = [];

        if(games){
            
            for(let i=0; i<5; i++){

                let gamesfilter = Math.floor(Math.random() * (games.length - 0))
                gamesCarousel[i] = games[gamesfilter];

            }
        }
        
        return gamesCarousel
    }
}

export { GameController }