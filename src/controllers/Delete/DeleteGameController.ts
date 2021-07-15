import { Request, Response } from "express";
import { DeleteGameService } from "../../services/Delete/DeleteGameService";

class DeleteGameController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteGameService = new DeleteGameService()

        await deleteGameService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteGameController }