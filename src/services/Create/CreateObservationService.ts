import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from '../../repositories/ObservationRepositories'

interface IObservationRequest {
    id: string;
    name: string;
    information: string;
}

class CreateObservationService {

    async execute({id, information, name}: IObservationRequest){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = observationRepositorie.create({
            id,
            name,
            information
        })

        await observationRepositorie.save(observation)
    }
}

export { CreateObservationService }