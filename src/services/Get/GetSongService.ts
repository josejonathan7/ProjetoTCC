import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class GetSongService{

    async execute(){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = await songRepositorie.find();

        const status = song ? classToPlain(song) : undefined;

        if(typeof status === "undefined"){
            throw new Error("Nenhuma música encontrada");
        }

        return status;
    }
}

export { GetSongService }