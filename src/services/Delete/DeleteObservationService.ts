import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class DeleteObservationService {

    constructor() {}

    async execute(id: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }

        const observation = await observationRepositorie.delete({
            id
        });

        const status = observation ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha ao deletar registro");
        }
    }
}

export { DeleteObservationService }