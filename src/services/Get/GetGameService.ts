import { GamesRepositories } from "../../repositories/GamesRepositories";
import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

class GetGameService {

    async execute(){
        const gameRepositorie = getCustomRepository(GamesRepositories)

        const game = await gameRepositorie.find()

        const status = game ? classToPlain(game) : ""

        return status
    }
}

export { GetGameService }