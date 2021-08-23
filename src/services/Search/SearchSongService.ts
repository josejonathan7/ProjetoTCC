import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class SearchSongService {

    async execute(searchName: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = await songRepositorie.find({
            name: searchName
        });

        const status = song.length ?  classToPlain(song): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ searchName } não encontrado!`);
        }

        return status;
    }

    async executeId(id: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = await songRepositorie.find({
            id
        });

        const status = song.length ? classToPlain(song) : undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ id } não encontrado!`);
        }

        return status
    }
}


export { SearchSongService }