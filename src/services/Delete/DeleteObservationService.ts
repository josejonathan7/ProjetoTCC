import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class DeleteObservationService {

    async execute(id: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        await observationRepositorie.delete({
            id
        })
    }
}

export { DeleteObservationService }