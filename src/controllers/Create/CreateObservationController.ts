import { Request , Response } from 'express'
import { CreateObservationService } from '../../services/Create/CreateObservationService'

class CreateObservationController {

    async handleCreate(request: Request, response: Response){
        const { name, information } = request.body

        const createObservationService = new CreateObservationService()

        const observation = await createObservationService.execute({ name, information })

        return response.json(observation)
    }
}

export { CreateObservationController }