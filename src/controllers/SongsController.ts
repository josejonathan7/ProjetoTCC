import { CreateSongService } from "../services/Create/CreateSongService";
import { Request, Response } from "express";
import { UpdateSongService } from "../services/Update/UpdateSongService";
import { GetSongService } from "../services/Get/GetSongService";
import { SearchSongService } from "../services/Search/SearchSongService";
import { DeleteSongService } from "../services/Delete/DeleteSongService";

class SongController {

    async handleCreate(request: Request, response: Response){
        const { name, link } = request.body

        const creatSongService = new CreateSongService()

        const song = await creatSongService.execute({ name, link})

        return response.json(song)
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link } = request.body

        const updateSongService = new UpdateSongService()

        await updateSongService.execute({id, link, name})
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService()

        const song = await getSongService.execute()

        const status = song ? response.json(song) : response.send("Nenhum anime encontrado!")

        return status
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchSongService = new SearchSongService()

        const song = await searchSongService.execute(name)

        const status = song ? response.json(song) : response.send("Música não encontrada!")

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSongService = new DeleteSongService()

        await deleteSongService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { SongController }

/*
module.exports = {
    async getData(req, res){
        const dataSongs = await DataBaseSongs.get()
        const dataUser = await DataBaseUsers.get()
        const dataObservation = await DataBaseObservation.get()

        
        //dados de observação da página
        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {
            
            if(dataObservation[i].name.trim() === "sugestão"){
                noteSuggestion = dataObservation[i]
            }

            if(dataObservation[i].name.trim() === "preferencia-musica"){
                pageObservation = dataObservation[i]
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

        
        //dados de contato no rodapé
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {
            
            if(dataUser[i] != null){
                contactUsers[i] = dataUser[i]
            }
            
        }

        return res.render("musicas", { dataSongs, contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation })
    },   

}*/
