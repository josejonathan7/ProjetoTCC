import { Request, Response } from 'express'
import { DeleteObservationService } from '../../services/Delete/DeleteObservationService'

class DeleteObservationController {

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteObservationService = new DeleteObservationService()

        await deleteObservationService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { DeleteObservationController }