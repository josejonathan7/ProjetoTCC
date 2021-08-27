import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from '../../repositories/ObservationRepositories'

interface IObservationRequest {
    name: string;
    information: string;
}

class CreateObservationService {

    async execute({ name, information }: IObservationRequest){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        
        if(name === "" || information === ""){
            throw new Error ("Preencha todos os campos");
        }

        const observation = observationRepositorie.create({
            name,
            information
        });

        await observationRepositorie.save(observation);

        const status = observation ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }
    }
}

export { CreateObservationService }