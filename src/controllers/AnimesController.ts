import { CreateAnimeService } from "../services/Create/CreateAnimeService";
import { Request, Response } from 'express';
import { UpdateAnimeService } from "../services/Update/UpdateAnimeService";
import { SearchAnimeService } from "../services/Search/SearchAnimeService";
import { DeleteAnimeService } from "../services/Delete/DeleteAnimeService";
import { UserController } from "./UserController";
import { GetAnimeService } from "../services/Get/GetAnimeService";

class AnimeController {
    
    async handleCreate(request: Request, response: Response){
        let name: string = request.body["anime-name"];
        let link: string = request.body["anime-link"];
        let image = request.body["anime-image"];

        name = name.trim();
        link = link.trim();

        const creatAnimeService = new CreateAnimeService();

        try {

            if(image === "" || typeof image === "undefined"){
                image = null;
            }else{
                image = image.trim();
            }

            await creatAnimeService.execute({ name , link, image });

            return response.status(201).json("ok");
            
        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        let name: string = request.body["anime-name"];
        let link: string = request.body["anime-link"];
        let image = request.body["anime-image"];

        name = name.trim();
        link = link.trim();

        const updateAnimeService = new UpdateAnimeService();

        try{

            
            if(image === "" || typeof image === "undefined"){
                image = null;
            }else{
                image = image.trim();
            }

            await updateAnimeService.execute({ id, name, link, image });

            return response.status(200).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearchName(request: Request, response: Response){
        let name: string = request.body["anime-name"];

        name = name.trim();

        const searchAnimeService = new SearchAnimeService();

        try{

            const anime = await searchAnimeService.execute(name);

            return response.status(200).json({ anime });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleSearchId(request: Request, response: Response){
        const id: string = request.params.id;

        const searchAnimeService = new SearchAnimeService();

        try{

            const anime = await searchAnimeService.executeId(id);

            return response.status(200).json({ anime });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handlePagination(request: Request, response: Response){
        const getAnimeService = new GetAnimeService();
        const userController = new UserController();

        try{
    
            const user = await userController.handleGetAdmin();
            const animes = await getAnimeService.execute();


            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers= [];

            if(typeof user === "object"){          
                contactUsers = user[randomUser];
            }else {
                contactUsers = user;
            }


            return response.status(200).json({ contactUsers, animes });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleDelete(request: Request, response: Response){
        const id: string = request.params.id;

        const deleteAnimeService = new DeleteAnimeService();

        try{

            await deleteAnimeService.execute(id);

            return response.status(200).json("ok");
        
        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    async handleGetAll(){
        const getAnimeService = new GetAnimeService();

        try{
            const animes = await getAnimeService.execute();
            let animesCarousel = [];

            if(animes){

                for(let i=0; i<5; i++){

                    let animesfilter = Math.floor(Math.random() * (animes.length - 0));
                    animesCarousel[i] = animes[animesfilter];
                }

            }

            return animesCarousel;

        }catch(err){
            throw new Error("Falha");
        }
    }
}

export { AnimeController }
