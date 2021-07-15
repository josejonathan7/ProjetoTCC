import { Request, Response } from "express";
import { UpdateSongService } from "../../services/Update/UpdateSongService";

class UpdateSongController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link } = request.body

        const updateSongService = new UpdateSongService()

        await updateSongService.execute({id, link, name})
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateSongController }