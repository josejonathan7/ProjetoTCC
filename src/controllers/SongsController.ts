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
        const name: string = request.body["song-name"];
        const link: string = request.body["song-link"];

        const creatSongService = new CreateSongService();

        try {
            const creatSong = await creatSongService.execute({ name, link});

            return response.send(creatSong);
        }catch(err){
            return response.json({error: err.message});
        }
       
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        const name: string = request.body["song-name"];
        const link: string = request.body["song-link"];

        const updateSongService = new UpdateSongService();

        try{
            const updatedSong = await updateSongService.execute({id, link, name});
            
            return response.send(updatedSong);
        }catch(err){
            return response.json({ error: err.message });
        }
    }

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService();
        const userController = new UserController();
        const observationController = new ObservationController();

        try {
            const observation = await observationController.handleGet();
            const user = await userController.handleGet();
            const song = await getSongService.execute();
        
            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser]
            }else {
                contactUsers = user;
            }

        
            //dados de observação da página
            let noteSuggestion;
            let pageObservation;

            if(typeof observation === "object"){
                
                for (let i = 0; i < observation.length; i++) {
                    
                    if(observation[i].name.trim() === "sugestão"){
                        noteSuggestion = observation[i];
                    }

                    if(observation[i].name.trim() === "preferencia-musica"){
                        pageObservation = observation[i];
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
            }else {
                noteSuggestion = observation;
                pageObservation = observation;
            }


            //const status = song ? response.render("musicas", { dataSongs: song, observation, contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation }) : response.status(401).send("Page Requisition Failed!");
            
            return response.json({ song, contactUsers, noteSuggestion, pageObservation });

        } catch(err){
            return response.json({ error: err.message });
        }
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["song-name"];

        const searchSongService = new SearchSongService();

        try{
            const song = await searchSongService.execute(name);

            //const status = song ? response.render("updateDelete/UpdateDeleteShowSong", { dataResult: song }) : response.status(401).send("Name Search not Found!");

            return response.json(song);
        }catch(err){
            return response.status(401).json({ error: err.message });
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSongService = new DeleteSongService();

        try{
            const deleteSong = await deleteSongService.execute(id);
            
            //return response.render("UpdateRegisters")

            return response.json(deleteSong);
        }catch(err){
            return response.status(400).json({ error: err.message });
        }
    }
}

export { SongController }