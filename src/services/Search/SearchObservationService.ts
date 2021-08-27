import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { ObservationRepositories } from "../../repositories/ObservationRepositories";

class SearchObservationService {

    async execute(searchName: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        if(searchName === ""){
            throw new Error ("Informe o nome da observação que desejar pesquisar!");
        }

        const observation = await observationRepositorie.find({
            name: searchName
        });

        const status = observation.length ?  classToPlain(observation): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ searchName } não encontrado!`);
        }

        return status;
    }

    async executeId(id: string){
        const observationRepositorie = getCustomRepository(ObservationRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar pesquisar!");
        }

        const observation = await observationRepositorie.find({
            id
        });

        const status = observation.length ? classToPlain(observation) : undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ id } não encontrado!`);
        }

        return status
    }
}

export { SearchObservationService }