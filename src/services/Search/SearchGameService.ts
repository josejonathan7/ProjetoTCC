import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class SearchGameService {

    constructor() {}

    async execute(searchName: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        if(searchName === ""){
            throw new Error ("Informe o nome do jogo que desejar pesquisar!");
        }

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

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar pesquisar!");
        }

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