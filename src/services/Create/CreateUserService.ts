import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from 'bcrypt';

interface IUserRequest {
    name: string;
    password: string;
    email_contact_link: string;
}

class CreateUserService {

    async execute({ name, email_contact_link, password}: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const userAlreadyExists = await userRepositorie.findOne({
            name
        });

        if(userAlreadyExists){
            throw new Error("User Already Exists");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepositorie.create({
            name,
            password: passwordHash,
            email_contact_link,
        });

        await userRepositorie.save(user);
        
        const status = user ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }
    }
}

export { CreateUserService }