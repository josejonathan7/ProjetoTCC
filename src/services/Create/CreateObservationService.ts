import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from '../../repositories/ObservationRepositories'

interface IObservationRequest {
    name: string;
    information: string;
}

class CreateObservationService {

    async execute({ name, information }: IObservationRequest){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = observationRepositorie.create({
            name,
            information
        });

        await observationRepositorie.save(observation);

        const status = observation ? "Observação criada com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }

        return status;
    }
}

export { CreateObservationService }