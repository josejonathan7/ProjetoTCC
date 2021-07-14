import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

interface ISongsRequest{
    id: string;
    name: string;
    link: string;
}

class CreateSongService {

    async execute({ id, link, name}: ISongsRequest){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = songRepositorie.create({
            id,
            name,
            link
        })

        await songRepositorie.save(song)
    }
}

export { CreateSongService }