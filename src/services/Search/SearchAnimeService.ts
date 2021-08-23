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
            throw new Error (`${ searchName } não encontrado!`);
        }

        delete status[0].name;
        delete status[0].link;
        delete status[0].image;

        return status;
    }

    async executeId(id: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.find({
            id: id
        });

        const status = anime.length ?  classToPlain(anime): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ id } não encontrado!`);
        }

        return status;
    }
}

export { SearchAnimeService }