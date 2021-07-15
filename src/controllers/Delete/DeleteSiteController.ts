import { Request, Response } from "express";
import { DeleteSiteService } from "../../services/Delete/DeleteSiteService";

class DeleteSiteController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSiteService = new DeleteSiteService()

        await deleteSiteService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteSiteController }