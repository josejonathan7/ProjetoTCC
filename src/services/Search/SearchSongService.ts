import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class SearchSongService {

    constructor() {}

    async execute(searchName: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        if(searchName === ""){
            throw new Error ("Informe o nome da música que desejar pesquisar!");
        }

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

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar pesquisar!");
        }

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