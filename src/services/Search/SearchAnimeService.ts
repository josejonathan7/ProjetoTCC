import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class SearchAnimeService {

    async execute(searchName: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.find({
            name: searchName
        })

        return classToPlain(anime)
    }
}

export { SearchAnimeService }