import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class GetObservationService{

    async execute(){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = await observationRepositorie.find();

        const status = observation ? classToPlain(observation) : undefined;

        if(typeof status === "undefined"){
            throw new Error("Nenhuma observaçaõ encontrada");
        }

        return status;
    }
}

export { GetObservationService }