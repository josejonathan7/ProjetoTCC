import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class DeleteSongService {

    async execute(id: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        const song = await songRepositorie.delete({
            id
        });

        const status = song ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha ao deletar registro");
        }
    }
}

export { DeleteSongService }