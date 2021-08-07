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
        });

        await songRepositorie.save(song);
        
        const status = song ? "Música criada com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export { CreateSongService }