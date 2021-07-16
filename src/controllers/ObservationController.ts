import { Request , Response } from 'express'
import { CreateObservationService } from '../services/Create/CreateObservationService'
import { DeleteObservationService } from '../services/Delete/DeleteObservationService'
import { GetObservationService } from '../services/Get/GetObservationService'
import { SearchObservationService } from '../services/Search/SearchObservationService'
import { UpdateObservationService } from '../services/Update/UpdateObservationService'

class ObservationController {

    async handleCreate(request: Request, response: Response){
        const { name, information } = request.body

        const createObservationService = new CreateObservationService()

        const observation = await createObservationService.execute({ name, information })

        return response.json(observation)
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, information } = request.body

        const updateObservationService = new UpdateObservationService()

        await updateObservationService.execute({ id, name, information })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchObservationService = new SearchObservationService()

        const observation = await searchObservationService.execute(name)

        const status = observation ? response.json(observation) : response.send("Observação não encontrada!")

        return status
    }
    
    async handleGet(request: Request, response: Response){
        const getObservationService = new GetObservationService()

        const observation = await getObservationService.execute()

        const status = observation ? response.json(observation) : response.send("Nenhuma observação encontrada!")

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteObservationService = new DeleteObservationService()

        await deleteObservationService.execute(id)

        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { ObservationController }