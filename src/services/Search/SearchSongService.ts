import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class SearchSongService {

    async execute(searchName: string){
        const songRepositorie = getCustomRepository(SongsRepositories)

        const song = await songRepositorie.find({
            name: searchName
        })

        const status = song.length ?  classToPlain(song): "";

        return status
    }
}


export { SearchSongService }