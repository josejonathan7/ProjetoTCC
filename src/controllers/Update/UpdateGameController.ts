import { Request, Response } from "express";
import { UpdateGameService } from "../../services/Update/UpdateGameService";

class UpdateGameController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, image } = request.body

        const updateGameService = new UpdateGameService()

        await updateGameService.execute({id, name, link, image})
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateGameController }