import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class SearchGameService {

    async execute(searchName: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.find({
            name: searchName
        });

        const status = game.length ?  classToPlain(game): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ searchName } não encontrado!`);
        }

        return status;
    }

    async executeId(id: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.find({
            id
        });

        const status = game.length ? classToPlain(game) : undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ id } não encontrado!`);
        }

        return status
    }
}

export { SearchGameService }