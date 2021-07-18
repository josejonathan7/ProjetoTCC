import { Request , Response } from 'express'
import { CreateObservationService } from '../services/Create/CreateObservationService'
import { DeleteObservationService } from '../services/Delete/DeleteObservationService'
import { GetObservationService } from '../services/Get/GetObservationService'
import { SearchObservationService } from '../services/Search/SearchObservationService'
import { UpdateObservationService } from '../services/Update/UpdateObservationService'

class ObservationController {

    async handleCreate(request: Request, response: Response){
        const name = request.body["observation-name"]
        const information = request.body.information

        const createObservationService = new CreateObservationService()

        await createObservationService.execute({ name, information })

        return response.render("Register")
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const name = request.body["observation-name"]
        const information = request.body.information

        const updateObservationService = new UpdateObservationService()

        await updateObservationService.execute({ id, name, information })
        
        return response.render("UpdateRegisters")
    }

    async handleSearch(request: Request, response: Response){
        const name = request.body["observation-name"]

        const searchObservationService = new SearchObservationService()

        const observation = await searchObservationService.execute(name)

        const status = observation ? response.render("updateDelete/UpdateDeleteShowObservation", { dataResult: observation}) : response.status(401).send("Name Search Not Found!")

        return status
    }
    
    async handleGet(){
        const getObservationService = new GetObservationService()

        const observation = await getObservationService.execute()

        const status = observation ? observation : ""

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteObservationService = new DeleteObservationService()

        await deleteObservationService.execute(id)

        return response.render("UpdateRegisters")
    }
}

export { ObservationController }