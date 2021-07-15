import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

interface ISongsRequest{
    name: string;
    link: string;
}

class CreateSongService {

    async execute({ name, link }: ISongsRequest){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = songRepositorie.create({
            name,
            link
        })

        await songRepositorie.save(song)
    }
}

export { CreateSongService }