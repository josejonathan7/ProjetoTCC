import { getCustomRepository } from "typeorm";
import { SongsRepositories } from "../../repositories/SongsRepositores";

interface ISongsRequest{
    name: string;
    link: string;
}

class CreateSongService {

    constructor() {}

    async execute({ name, link }: ISongsRequest){
        const songRepositorie = getCustomRepository(SongsRepositories);
  
        if(name === "" || link === ""){
            throw new Error ("Preencha todos os campos");
        }

        const song = songRepositorie.create({
            name,
            link
        });

        await songRepositorie.save(song);
        
        const status = song ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }
    }
}

export { CreateSongService }