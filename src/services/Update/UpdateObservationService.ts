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

        const observation = await observationRepositorie.update(id, {
            name: name,
            information: information
        });

        const status = observation ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateObservationService }