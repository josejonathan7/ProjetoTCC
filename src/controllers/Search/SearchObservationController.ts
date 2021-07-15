import { Request, Response } from "express";
import { SearchObservationService } from "../../services/Search/SearchObservationService";

class SearchObservationController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchObservationService = new SearchObservationService()

        const observation = await searchObservationService.execute(name)

        const status = observation ? response.json(observation) : response.send("Observação não encontrada!")

        return status
    }
}

export { SearchObservationController }