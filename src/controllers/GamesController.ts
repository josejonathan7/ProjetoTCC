import { CreateGameService } from "../services/Create/CreateGameService";
import { Request, Response } from "express";
import { UpdateGameService } from "../services/Update/UpdateGameService";
import { SearchGameService } from "../services/Search/SearchGameService";
import { DeleteGameService } from "../services/Delete/DeleteGameService";
import { UserController } from "./UserController";
import { PaginationGameService } from "../services/Get/QueryForPagination/PaginationGameService";
import { GetGameService } from "../services/Get/GetGameService";


class GameController {

    async handlePagination(request: Request, response: Response) {
        const paginationGameService = new PaginationGameService();
        const userController = new UserController();

        try{
        
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

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser];
            }else {
                contactUsers = user;
            }
            

            const status = gamePagination[0];
            
            return response.json({ contactUsers, dataGamesLimit: status, numberOfPages, current });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleCreate(request: Request, response: Response){
        const name: string = request.body["game-name"];
        const link: string = request.body["game-link"];
        const image: string = request.body["game-image"];

        const creatGameService = new CreateGameService();

        try {

            await creatGameService.execute({ name, link, image });

           return response.send("ok");
            
        } catch (err) {
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        const name: string =   request.body["game-name"];
        const link: string = request.body["game-link"];
        const image: string = request.body["game-image"];

        const updateGameService = new UpdateGameService();

        try{

            await updateGameService.execute({ id, name, link, image });
            
            return response.send("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["game-name"];

        const searchGameService = new SearchGameService();

        try{

            const game = await searchGameService.execute(name);

            return response.json({ dataResult: game });

        }catch(err){
            return response.status(404).json({ error: err.message });
        }
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteGameService = new DeleteGameService();

        try{
            
            await deleteGameService.execute(id);

            return response.send("ok");
        
        }catch(err){
            return response.status(404).json({ error: err.message });
        }
    }

    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    async handleGetAll(){
        const getGameService = new GetGameService();
        
        try{

            const games = await getGameService.execute();
            let gamesCarousel = [];

            if(games){
                
                for(let i=0; i<5; i++){

                    let gamesfilter = Math.floor(Math.random() * (games.length - 0));
                    gamesCarousel[i] = games[gamesfilter];

                }
            }
            
            return gamesCarousel;

        }catch(err){
            throw new Error("Falha");
        }
    }
}

export { GameController }