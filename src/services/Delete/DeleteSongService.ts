import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class DeleteSongService {

    async execute(id: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        await songRepositorie.delete({
            id
        })
    }
}

export { DeleteSongService }