import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class GetAnimeService {

    async execute(){
        const animeRepositorie = getCustomRepository(AnimesRepositories)

        const anime = await animeRepositorie.find()

        const status = anime ? classToPlain(anime) : "" 

        return status
    }
}

export { GetAnimeService }