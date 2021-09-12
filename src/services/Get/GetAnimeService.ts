import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class GetAnimeService {

    constructor() {}

    async execute(){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.find();

        const status = anime ? classToPlain(anime) : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Nenhum Anime encontrado");
        }

        return status;
    }
}

export { GetAnimeService }