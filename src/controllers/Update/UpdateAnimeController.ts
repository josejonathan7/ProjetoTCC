import { Request, Response } from "express";
import { UpdateAnimeService } from "../../services/Update/UpdateAnimeService";

class UpdateAnimeController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, image } = request.body

        const updateAnimeService = new UpdateAnimeService()

        await updateAnimeService.execute({ id, name, link, image })

        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateAnimeController }