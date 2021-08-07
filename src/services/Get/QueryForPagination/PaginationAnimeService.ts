import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { AnimesRepositories } from "../../../repositories/AnimesRepositories";

class PaginationAnimeService {

    async execute(start: number, recordsPerPage: number){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const count = await animeRepositorie.count();
        const anime = await animeRepositorie.query(`SELECT * FROM tb_animes ORDER BY name LIMIT ${recordsPerPage} OFFSET ${start} `);
        
        const array = [
            classToPlain(anime),
            count
        ]

        const status = array ? array : undefined;

        if (typeof status === "undefined") {           
            throw new Error ("Nenhum Anime encontrado");
        }
            
        return status;
    }
}

export { PaginationAnimeService }