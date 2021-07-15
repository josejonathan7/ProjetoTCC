import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class SearchObservationSService {

    async execute(searchName: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = await observationRepositorie.find({
            name: searchName
        })

        return classToPlain(observation)
    }
}

export { SearchObservationSService }