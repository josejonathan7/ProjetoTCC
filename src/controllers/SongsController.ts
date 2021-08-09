import { CreateSongService } from "../services/Create/CreateSongService";
import { Request, Response } from "express";
import { UpdateSongService } from "../services/Update/UpdateSongService";
import { GetSongService } from "../services/Get/GetSongService";
import { SearchSongService } from "../services/Search/SearchSongService";
import { DeleteSongService } from "../services/Delete/DeleteSongService";
import { UserController } from "./UserController";

class SongController {

    async handleCreate(request: Request, response: Response){
        const name: string = request.body["song-name"];
        const link: string = request.body["song-link"];

        const creatSongService = new CreateSongService();

        try {
            
            await creatSongService.execute({ name, link});

            return response.render("Register");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        const name: string = request.body["song-name"];
        const link: string = request.body["song-link"];

        const updateSongService = new UpdateSongService();

        try{
            
            await updateSongService.execute({id, link, name});
            
            return response.render("UpdateRegisters");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService();
        const userController = new UserController();

        try {

            const user = await userController.handleGet();
            const song = await getSongService.execute();
        
            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser];
            }else {
                contactUsers = user;
            }


            return response.render("musicas", { dataSongs: song, contactUsers });

        } catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["song-name"];

        const searchSongService = new SearchSongService();

        try{

            const song = await searchSongService.execute(name);

            return response.render("updateDelete/UpdateDeleteShowSong", { dataResult: song });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSongService = new DeleteSongService();

        try{

            await deleteSongService.execute(id);
            
            return response.render("UpdateRegisters");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { SongController }