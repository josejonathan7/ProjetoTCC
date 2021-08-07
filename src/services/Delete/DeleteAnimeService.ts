import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

class DeleteAnimeService{

    async execute(id: string){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        const anime = await animeRepositorie.delete({
            id
        });

        const status = anime ? "Anime deletado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export { DeleteAnimeService }