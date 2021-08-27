import { CreateGameService } from "../services/Create/CreateGameService";
import { Request, Response } from "express";
import { UpdateGameService } from "../services/Update/UpdateGameService";
import { SearchGameService } from "../services/Search/SearchGameService";
import { DeleteGameService } from "../services/Delete/DeleteGameService";
import { UserController } from "./UserController";
import { GetGameService } from "../services/Get/GetGameService";


class GameController {

    async handlePagination(request: Request, response: Response) {
        const getGameService = new GetGameService();
        const userController = new UserController();

        try{
        
            const user = await userController.handleGetAdmin();
            const games = await getGameService.execute()

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser];
            }else {
                contactUsers = user;
            }
            
            return response.status(200).json({ contactUsers, games });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleCreate(request: Request, response: Response){
        let name: string = request.body["game-name"];
        let link: string = request.body["game-link"];
        let image: string = request.body["game-image"];

        name = name.trim();
        link = link.trim();
        image = image.trim();

        const creatGameService = new CreateGameService();

        try {

            await creatGameService.execute({ name, link, image });

           return response.status(200).json("ok");
            
        } catch (err) {
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        let name: string =   request.body["game-name"];
        let link: string = request.body["game-link"];
        let image: string = request.body["game-image"];

        name = name.trim();
        link = link.trim();
        image = image.trim();

        const updateGameService = new UpdateGameService();

        try{

            await updateGameService.execute({ id, name, link, image });
            
            return response.status(200).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        let name: string = request.body["game-name"];

        name = name.trim();

        const searchGameService = new SearchGameService();

        try{

            const game = await searchGameService.execute(name);

            return response.status(200).json({ game });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
   
    async handleSearchId(request: Request, response: Response){
        const id: string = request.params.id;
        
        const searchGameService = new SearchGameService();

        try{

            const game = await searchGameService.executeId(id);

            return response.status(200).json({ game });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handleDelete(request: Request, response: Response){
        const id: string = request.params.id;

        const deleteGameService = new DeleteGameService();

        try{
            
            await deleteGameService.execute(id);

            return response.status(200).json("ok");
        
        }catch(err){
            return response.status(404).send(err.message);
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