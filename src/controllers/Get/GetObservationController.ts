import { Request, Response } from "express";
import { GetObservationService } from "../../services/Get/GetObservationService";

class GetObservationController {

    async handleGet(request: Request, response: Response){
        const getObservationService = new GetObservationService()

        const observation = await getObservationService.execute()

        const status = observation ? response.json(observation) : response.send("Nenhuma observação encontrada!")

        return status
    }
}

export { GetObservationController }