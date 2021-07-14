import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class GetUserService{

    async execute(){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find()

        return classToPlain(user)
    }
}

export { GetUserService }