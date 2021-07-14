import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class DeleteGameService{
    
    async execute(id: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        await gameRepositorie.delete({
            id
        })
    }
}

export { DeleteGameService}