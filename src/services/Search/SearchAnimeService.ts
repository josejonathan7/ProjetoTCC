import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class SearchAnimeService {

    async execute(searchName: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.find({
            name: searchName
        });

        const status = anime.length ?  classToPlain(anime): undefined;

        if(typeof status === "undefined"){
            throw new Error ("Nenhum dado encontrado");
        }

        return status;
    }
}

export { SearchAnimeService }