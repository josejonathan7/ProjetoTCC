import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class SearchGameService {

    async execute(searchName: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.find({
            name: searchName
        })

        const status = game.length ?  classToPlain(game): "Falha na operação";

        return status
    }
}

export { SearchGameService }