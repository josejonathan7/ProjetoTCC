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

    constructor() {}

    async execute({ id, name, avatar, description, email_contact_link, admin }: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }
        
        if(name === ""){
            throw new Error ("Preencha todos os campos");
        }

        if(admin !== true && admin !== false){
            throw new Error ("O campo administrador esta preenchido de forma inválida!");
        }
        
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