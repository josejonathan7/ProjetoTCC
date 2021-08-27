import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from 'bcrypt';

interface IUserRequest {
    name: string;
    password: string;
    email_contact_link?: string;
    avatar?: string;
    description?: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({ name, admin, password, email_contact_link, avatar, description}: IUserRequest){
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
            admin,
            email_contact_link,
            avatar,
            description
        });

        await userRepositorie.save(user);
        
        const status = user ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }
    }

    
    async executeCommonUser({ name, password, email_contact_link }: IUserRequest){
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
            email_contact_link
        });

        await userRepositorie.save(user);
        
        const status = user ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }
    }
}

export { CreateUserService }