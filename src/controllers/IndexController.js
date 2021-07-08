const DataBaseContact = require('../models/ContactModels');
const DataBaseObservation = require('../models/ObservationModels');
const DataBaseAnimes = require('../models/AnimesModels');
const DataBaseGames = require('../models/GamesModels');
const DataBaseSongs = require('../models/SongsModels');
const DataBaseSites = require('../models/SitesModels');

module.exports = {
    async getData(req,res) {
        
        const animes = await DataBaseAnimes.get()
        let animesCarousel = [];
        
        const games = await DataBaseGames.get()
        let gamesCarousel = [];

        const songs = await DataBaseSongs.get()
        let songsList = [];



        function selectRandomContent(){
             
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
        }

        selectRandomContent()


        const dataContact = await DataBaseContact.get()
        const dataObservation = await DataBaseObservation.get()
        const dataSites = await DataBaseSites.get()
        


        return res.render("index", { animesArray: animesCarousel, gamesArray: gamesCarousel, dataContact, dataObservation, dataSites, dataSongs: songsList })
    }
}