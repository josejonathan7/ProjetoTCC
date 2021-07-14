import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";
import { classToPlain } from 'class-transformer'

class GetAnimeService{

    async execute(){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.find()

        return classToPlain(anime)
    }
}

export { GetAnimeService }