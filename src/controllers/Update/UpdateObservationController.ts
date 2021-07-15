import { Request, Response } from "express";
import { UpdateObservationService } from "../../services/Update/UpdateObservationService";

class UpdateObservationController {

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, information } = request.body

        const updateObservationService = new UpdateObservationService()

        await updateObservationService.execute({ id, name, information })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
}

export { UpdateObservationController }
