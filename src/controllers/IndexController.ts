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
            let noteSuggestion;
            let pageObjective;

            if(typeof observation === "object"){
                for (let i = 0; i < observation.length; i++) {

                    if (observation[i].name.trim() === "sugestão") {
                        noteSuggestion = observation[i];
                    }

                    if (observation[i].name.trim() === "objetivo-pagina") {
                        pageObjective = observation[i];
                    }

                    if (!pageObjective) {
                        pageObjective = {
                            name: "",
                            information: ""
                        };
                    }

                    if (!noteSuggestion) {
                        noteSuggestion = {
                            name: "",
                            information: ""
                        };
                    }
                }
            }else{
                noteSuggestion = observation;
                pageObjective = observation;
            }

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (users.length - 0));
            let contactUsers: string | [] | {};

            if(typeof users === "object"){
                contactUsers = users[randomUser]
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

            //const status = randomAnime && randomGame && sites && users ? response.render("index", { animesArray: randomAnime, gamesArray: randomGame, contactUsers, dataPageObjective: pageObjective, dataSuggestion: noteSuggestion, animesSite, gamesSite }) : response.status(401).send("Requisition Failed!")
    
            return response.json({randomAnime, randomGame, contactUsers, pageObjective, noteSuggestion, animesSite, gamesSite});

        }catch(err){
            return response.json({ error: err.message });
        }
    }
}

export { IndexController }