import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class DeleteUserService{

    async execute(id: string){
        const userRepositorie = getCustomRepository(UsersRepositories);

        await userRepositorie.delete({
            id
        })
    }
}

export{ DeleteUserService}

