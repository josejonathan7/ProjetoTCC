import { getCustomRepository } from "typeorm";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class DeleteObservationService {

    async execute(id: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        const observation = await observationRepositorie.delete({
            id
        });

        const status = observation ? "Observação deletada com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export { DeleteObservationService }