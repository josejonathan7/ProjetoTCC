import { CreateSongService } from "../services/Create/CreateSongService";
import { Request, Response } from "express";
import { UpdateSongService } from "../services/Update/UpdateSongService";
import { GetSongService } from "../services/Get/GetSongService";
import { SearchSongService } from "../services/Search/SearchSongService";
import { DeleteSongService } from "../services/Delete/DeleteSongService";
import { UserController } from "./UserController";

class SongController {

    async handleCreate(request: Request, response: Response){
        let name: string = request.body["song-name"];
        let link: string = request.body["song-link"];

        name = name.trim();
        link = link.trim();

        const creatSongService = new CreateSongService();

        try {
            
            await creatSongService.execute({ name, link});

            return response.status(201).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        let name: string = request.body["song-name"];
        let link: string = request.body["song-link"];

        name = name.trim();
        link = link.trim();

        const updateSongService = new UpdateSongService();

        try{
            
            await updateSongService.execute({id, link, name});
            
            return response.json("ok");

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

            return response.json({ song, contactUsers });

        } catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        let name: string = request.body["song-name"];

        name = name.trim();
      
        const searchSongService = new SearchSongService();

        try{

            const song = await searchSongService.execute(name);

            return response.json({ song });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handleSearchId(request: Request, response: Response){
        const id = request.params.id;
        const searchSongService = new SearchSongService();

        try{

            const song = await searchSongService.executeId(id);

            return response.json({ song });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSongService = new DeleteSongService();

        try{

            await deleteSongService.execute(id);
            
            return response.json("ok");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { SongController }