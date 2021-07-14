import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";
import { classToPlain } from 'class-transformer'

class GetGameService{

    async execute(){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.find()

        return classToPlain(game)
    }
}

export { GetGameService }