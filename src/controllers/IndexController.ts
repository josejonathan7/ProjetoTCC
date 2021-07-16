import { Request, Response } from "express";
import { AnimeController } from './AnimesController';
import { GameController } from './GamesController';
import { SongController } from './SongsController';


class IndexController {

    async handleGet(request: Request, response: Response){  
        const animeController = new AnimeController()
        const gameController = new GameController()
        const songController = new SongController()
        
        const animes = await animeController.handlePagination
        let animesCarousel = [];
        
        const games = await gameController.handlePagination
        let gamesCarousel = [];

        const songs = await songController.handleGet
        let songsList = [];

       /* function selectRandomContent(){
             
            for(let i=0; i<5; i++){

                let animesfilter = Math.floor(Math.random() * (animes.length - 0))
                animesCarousel[i] = animes[animesfilter];

            }

            for(let i=0; i<5; i++){

                let gamesfilter = Math.floor(Math.random() * (games.length - 0))
                gamesCarousel[i] = games[gamesfilter];

            }

            for(let i=0; i<10; i++){

                let songsfilter = Math.floor(Math.random() * (songs.length - 0))
                songsList[i] = songs[songsfilter];

            }
        }*/

    }
}

export { IndexController }



/*
module.exports = {
    async getData(req,res) {
        



        

        selectRandomContent()


        const dataUser = await DataBaseUsers.get()
        const dataObservation = await DataBaseObservation.get()
        const dataSites = await DataBaseSites.get()
        

        //dados de observação da página
        let noteSuggestion;
        let pageObjective;

        for (let i = 0; i < dataObservation.length; i++) {
            
            if(dataObservation[i].name.trim() === "sugestão"){
                noteSuggestion = dataObservation[i]
            }

            if(dataObservation[i].name.trim() === "objetivo-pagina"){
                pageObjective = dataObservation[i]
            }

            if(!pageObjective){
                pageObjective = {
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
        let countContact =0;

        for (let i = 0; i < 3; i++) {
            
            if(dataUser[i] != null){
                
                contactUsers[countContact] = dataUser[i]
                countContact++;

            }
            
        }

        //filtragem dos sites entre animes e jogos

        let animesSite = [];
        let gamesSite = [];
        let countAnime = 0;
        let countGame = 0;

        for(let i=0; i < dataSites.length; i++){
            
            if(dataSites[i].category === "anime"){

                animesSite[countAnime] = dataSites[i]
                countAnime++;

            }else if(dataSites[i].category === "game"){

                gamesSite[countGame] = dataSites[i]
                countGame++;

            }  
        };

        return res.render("index", { animesArray: animesCarousel, gamesArray: gamesCarousel, contactUsers, dataSongs: songsList, dataPageObjective: pageObjective, dataSuggestion: noteSuggestion, animesSite, gamesSite })
    }
}
*/