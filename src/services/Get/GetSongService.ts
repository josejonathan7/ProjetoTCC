import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class GetSongService{

    async execute(){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = await songRepositorie.find()

        return classToPlain(song)
    }
}

export { GetSongService }