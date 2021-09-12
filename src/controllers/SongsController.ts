import { CreateSongService } from "../services/Create/CreateSongService";
import { Request, Response } from "express";
import { UpdateSongService } from "../services/Update/UpdateSongService";
import { GetSongService } from "../services/Get/GetSongService";
import { SearchSongService } from "../services/Search/SearchSongService";
import { DeleteSongService } from "../services/Delete/DeleteSongService";
import { UserController } from "./UserController";

class SongController {

    constructor() {}

    async handleCreate(request: Request, response: Response){
        let name: string = request.body["song-name"];
        let link: string = request.body["song-link"];

        name = name.trim();
        link = link.trim();

        const creatSongService = new CreateSongService();

        try {
            
            await creatSongService.execute({ name, link});

            return response.status(201).json("ok");

        }catch(err: any){
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
            
            return response.status(200).json("ok");

        }catch(err: any){
            return response.status(400).send(err.message);
        }
    }

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService();
        const userController = new UserController();

        try {

            const user = await userController.handleGetAdmin();
            const unfilteredSong = await getSongService.execute();
        
            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            const contactUsers = typeof user === 'object' ? user[randomUser] : user;

              /*por algum motivo quando eu rodo o servidor no back-end o método de consulta retorna os dados em ordem alfabética, mas quando faço o deploy pro heroku não, e como quero utilizar os metodos do typeorm pra diminuir a chance de sqlinjection estou utilizando esse método pra garantir o filtro por nome dos conteúdos
            */       
              const filteringSong = unfilteredSong.flat();
              const song = filteringSong.sort((a: any, b: any) => {
                  let x = a.name.toLowerCase();
                  let y = b.name.toLowerCase();
  
                  if (x < y) {return -1;}
                  if (x > y) {return 1;}
                  return 0;
              });

            return response.status(200).json({ song, contactUsers });

        } catch(err: any){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        let name: string = request.body["song-name"];

        name = name.trim();
      
        const searchSongService = new SearchSongService();

        try{

            const song = await searchSongService.execute(name);

            return response.status(200).json({ song });

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }
    
    async handleSearchId(request: Request, response: Response){
        const id = request.params.id;
        const searchSongService = new SearchSongService();

        try{

            const song = await searchSongService.executeId(id);

            return response.status(200).json({ song });

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSongService = new DeleteSongService();

        try{

            await deleteSongService.execute(id);
            
            return response.status(200).json("ok");

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }
}

export { SongController }