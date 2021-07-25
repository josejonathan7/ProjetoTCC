import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class SearchUserService {

    async execute(searchName: string){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find({
            name: searchName
        })

        const status = user.length ?  classToPlain(user): "";

        return status
    }

    
    async searchId(id: string){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find({
            id: id
        })

        const status = user.length ?  classToPlain(user): "";

        return status
    }
}

export { SearchUserService }