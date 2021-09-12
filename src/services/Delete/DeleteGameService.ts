import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

class DeleteGameService{

    constructor() {}
    
    async execute(id: string){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }

        const game = await gameRepositorie.delete({
            id
        });

        const status = game ? "Sucess" : undefined;
        
        if(typeof status === "undefined"){
            throw new Error("Falha ao deletar registro");
        }
    }
}

export { DeleteGameService}