import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class SearchUserService {

    async execute(searchName: string){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find({
            name: searchName
        });

        const status = user.length ?  classToPlain(user): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ searchName } não encontrado!`);
        }

        return status;
    }
}

export { SearchUserService }