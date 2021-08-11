import { Request, Response } from "express";
import { AnimeController } from './AnimesController';
import { GameController } from './GamesController';
import { ObservationController } from "./ObservationController";
import { SiteController } from "./SiteController";
import { UserController } from "./UserController";


class IndexController {

    async handleGet(request: Request, response: Response) {
        const animeController = new AnimeController();
        const gameController = new GameController();
        const siteController = new SiteController();
        const observationController = new ObservationController();
        const userController = new UserController();

        try{
            const randomAnime = await animeController.handleGetAll();
            const randomGame = await gameController.handleGetAll();
            const sites = await siteController.handleGet();
            const users = await userController.handleGet();
            const observation = await observationController.handleGet();


            //dados de observação da página
            let pageObjective;

            if(typeof observation === "object"){
    
                if (observation) {

                    pageObjective = observation[observation.length -1];    
           
                }/*else {
                    pageObjective = {
                        name: "",
                        information: ""
                    };
                }*/
                
            }else{
                pageObjective = observation;
            }

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (users.length - 0));
            let contactUsers= [];

            if(typeof users === "object"){
                contactUsers.push(users[randomUser]);
            }else {
                contactUsers = users;
            }

        
            //filtragem dos sites entre animes e jogos

            let animesSite = [];
            let gamesSite = [];
            let countAnime = 0;
            let countGame = 0;

            if(typeof sites === "object"){
                for (let i = 0; i < sites.length; i++) {

                    if (sites[i].category === "anime") {

                        animesSite[countAnime] = sites[i];
                        countAnime++;

                    } else if (sites[i].category === "game") {

                        gamesSite[countGame] = sites[i];
                        countGame++;

                    }
                };
            }else {
                animesSite = ["falha na tipagem"];
                gamesSite = ["falha na tipagem"];
            }

            const status = randomAnime && randomGame && sites && users ? response.json({ randomAnime,
                randomGame,
                contactUsers,
                pageObjective,
                animesSite, 
                gamesSite }) : response.status(401).send("Requisition Failed!");
    
            return status;

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { IndexController }