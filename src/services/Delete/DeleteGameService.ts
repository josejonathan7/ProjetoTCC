import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class DeleteGameService{
    
    async execute(id: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.delete({
            id
        });

        const status = game ? "Jogo deletado com sucesso" : undefined;
        
        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export { DeleteGameService}