import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class SearchObservationService {

    async execute(searchName: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = await observationRepositorie.find({
            name: searchName
        })

        const status = observation.length ?  classToPlain(observation): "";

        return status
    }
}

export { SearchObservationService }