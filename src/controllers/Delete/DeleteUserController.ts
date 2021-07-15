import { Request, Response } from "express";
import { DeleteUserService } from "../../services/Delete/DeleteUserService";

class DeleteUserController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteUserService = new DeleteUserService()

        await deleteUserService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteUserController }