import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

interface IObservationRequest {
    id: string;
    name: string;
    information: string;
}

class UpdateObservationService {

    async execute({ id, name, information }: IObservationRequest){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        await observationRepositorie.update(id, {
            name: name,
            information: information
        })
    }
}

export { UpdateObservationService }