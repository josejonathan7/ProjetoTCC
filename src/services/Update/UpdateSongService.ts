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

        const song = await songRepositorie.update(id, {
            name: name,
            link: link
        });

        const status = song ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateSongService }