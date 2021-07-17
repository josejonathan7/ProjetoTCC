import { CreateSongService } from "../services/Create/CreateSongService";
import { Request, Response } from "express";
import { UpdateSongService } from "../services/Update/UpdateSongService";
import { GetSongService } from "../services/Get/GetSongService";
import { SearchSongService } from "../services/Search/SearchSongService";
import { DeleteSongService } from "../services/Delete/DeleteSongService";
import { UserController } from "./UserController";
import { ObservationController } from "./ObservationController";

class SongController {

    async handleCreate(request: Request, response: Response){
        const name = request.body["song-name"]
        const link = request.body["song-link"]

        const creatSongService = new CreateSongService()

        await creatSongService.execute({ name, link})

        return response.render("Register")
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const name = request.body["song-name"]
        const link = request.body["song-link"]

        const updateSongService = new UpdateSongService()

        await updateSongService.execute({id, link, name})
        
        return response.render("UpdateRegisters")
    }

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService()
        const userController = new UserController()
        const observationController = new ObservationController()

        const observation = await observationController.handleGet()
        const user = await userController.handleGet()
        const song = await getSongService.execute()

           //dados de contato no rodapé
           let contactUsers = [];

           for (let i = 0; i < 3; i++) {
               
               if(user[i] != null){
                   contactUsers[i] = user[i]
               }
               
           }

        //dados de observação da página
        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < observation.length; i++) {
            
            if(observation[i].name.trim() === "sugestão"){
                noteSuggestion = observation[i]
            }

            if(observation[i].name.trim() === "preferencia-musica"){
                pageObservation = observation[i]
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

           
        const status = song ? response.render("musicas", { dataSongs: song, observation, contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation }) : response.status(401).send("Page Not Found!")
        
        return status
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body["song-name"]

        const searchSongService = new SearchSongService()

        const song = await searchSongService.execute(name)

        const status = song ? response.render("updateDelete/UpdateDeleteShowSong", { dataResult: song }) : response.status(401).send("Name Search not Found!")

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSongService = new DeleteSongService()

        await deleteSongService.execute(id)
        
        return response.render("UpdateRegisters")
    }

    //assim como o handleGet esse método pega todas as músicas, mas com a diferença de que ele seleciona uma certa quantia aleatoria para ser exibida na página index, como o handleGet possui outras funcionalidades com ele achei melhor construir um método a parte para fazer essa seleção
    async handleGetForIndex(){
        const getSongService = new GetSongService()

        const song = await getSongService.execute()
        let songsList = [];
        
        for(let i=0; i<10; i++){

            let songsfilter = Math.floor(Math.random() * (song.length - 0))
            songsList[i] = song[songsfilter];
        }

        return songsList
    }
}

export { SongController }