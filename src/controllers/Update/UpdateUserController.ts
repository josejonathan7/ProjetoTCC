import { Request, Response } from "express";
import { UpdateUserService } from "../../services/Update/UpdateUserService";

class UpdateUserController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, password, avatar, description, email_contact_link } = request.body

        const updateUserService = new UpdateUserService()

        await updateUserService.execute({ id, name, password, avatar, description, email_contact_link })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateUserController }