import { Request, Response } from "express";
import { DeleteAnimeService } from "../../services/Delete/DeleteAnimeService";

class DeleteAnimeController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteAnimeService = new DeleteAnimeService()

        await deleteAnimeService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteAnimeController }
