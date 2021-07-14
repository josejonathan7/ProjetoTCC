import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class DeleteAnimeService{

    async execute(id: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        await animeRepositorie.delete({
            id
        })
    }
}

export { DeleteAnimeService }