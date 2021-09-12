import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class DeleteAnimeService{

    constructor() {}

    async execute(id: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }

        const anime = await animeRepositorie.delete({
            id
        });

        const status = anime ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha ao deletar registro");
        }
    }
}

export { DeleteAnimeService }