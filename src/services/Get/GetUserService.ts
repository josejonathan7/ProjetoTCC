import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class GetUserService{

    async execute(){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find();

        const status = user ? classToPlain(user) : undefined;

        if(typeof status === "undefined"){
            throw new Error("Nenhum usuário encontrado");
        }

        return status;
    }

    
    async executeAdmin(){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.find({
            admin: true
        });

        const status = user ? classToPlain(user) : undefined;

        if(typeof status === "undefined"){
            throw new Error("Nenhum usuário encontrado");
        }

        return status;
    }
}

export { GetUserService }