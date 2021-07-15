import { Request, Response } from "express";
import { UpdateSiteService } from "../../services/Update/UpdateSiteService";

class UpdateSiteController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, category } = request.body

        const updateSiteService = new UpdateSiteService()

        await updateSiteService.execute({ id, name, link, category })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateSiteController }