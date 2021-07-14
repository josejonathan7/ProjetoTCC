import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

interface ISongRequest {
    id: string;
    name: string;
    link: string;
}

class UpdateSongService {

    async execute({ id, link, name}: ISongRequest){
        const songRepositorie = getCustomRepository(SongsRepositories);

        await songRepositorie.update(id, {
            name: name,
            link: link
        })
    }
}

export { UpdateSongService }