import { Request, Response } from "express";
import { AnimeController } from './AnimesController';
import { GameController } from './GamesController';
import { ObservationController } from "./ObservationController";
import { SiteController } from "./SiteController";
import { SongController } from './SongsController';
import { UserController } from "./UserController";


class IndexController {

    async handleGet(request: Request, response: Response) {
        const animeController = new AnimeController()
        const gameController = new GameController()
        const songController = new SongController()
        const siteController = new SiteController()
        const observationController = new ObservationController()
        const userController = new UserController()

        const randomAnime = await animeController.handleGetAll()
        const randomGame = await gameController.handleGetAll()
        const randomsong = await songController.handleGetForIndex()
        const sites = await siteController.handleGet()
        const users = await userController.handleGet()
        const observation = await observationController.handleGet()


        //dados de observação da página
        let noteSuggestion;
        let pageObjective;

        for (let i = 0; i < observation.length; i++) {

            if (observation[i].name.trim() === "sugestão") {
                noteSuggestion = observation[i]
            }

            if (observation[i].name.trim() === "objetivo-pagina") {
                pageObjective = observation[i]
            }

            if (!pageObjective) {
                pageObjective = {
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
        let countContact = 0;

        for (let i = 0; i < 3; i++) {

            if (users[i] != null) {

                contactUsers[countContact] = users[i]
                countContact++;

            }

        }

        //filtragem dos sites entre animes e jogos

        let animesSite = [];
        let gamesSite = [];
        let countAnime = 0;
        let countGame = 0;

        for (let i = 0; i < sites.length; i++) {

            if (sites[i].category === "anime") {

                animesSite[countAnime] = sites[i]
                countAnime++;

            } else if (sites[i].category === "game") {

                gamesSite[countGame] = sites[i]
                countGame++;

            }
        };
   
        return response.render("index", { animesArray: randomAnime, gamesArray: randomGame, contactUsers, dataSongs: randomsong, dataPageObjective: pageObjective, dataSuggestion: noteSuggestion, animesSite, gamesSite })

    }
}

export { IndexController }