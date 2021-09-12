import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

class DeleteSongService {

    constructor() {}

    async execute(id: string){
        const songRepositorie = getCustomRepository(SongsRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }

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