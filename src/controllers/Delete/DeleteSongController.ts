import { Request, Response } from "express";
import { DeleteSongService } from "../../services/Delete/DeleteSongService";

class DeleteSongController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSongService = new DeleteSongService()

        await deleteSongService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteSongController }
