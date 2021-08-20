import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest {
    id: string;
    name: string;
    password?: string;
    avatar: string;
    description: string;
    email_contact_link: string;
    admin: boolean;
}

class UpdateUserService {

    async execute({ id, name, avatar, description, email_contact_link, admin }: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const user = await userRepositorie.update(id, {
            name: name,
            avatar: avatar,
            description: description,
            email_contact_link: email_contact_link,
            admin
        });

        const status = user ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateUserService }