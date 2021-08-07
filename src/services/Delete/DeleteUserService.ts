import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class DeleteUserService{

    async execute(id: string){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.delete({
            id
        });

        const status = user ? "Usuário deletado com sucesso" : undefined;
        
        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export{ DeleteUserService}

