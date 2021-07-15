import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest {
    id: string;
    name: string;
    password?: string;
    avatar: string;
    description: string;
    email_contact_link: string;
}

class UpdateUserService {

    async execute({ id, name, password, avatar, description, email_contact_link }: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        await userRepositorie.update(id, {
            name: name,
            password: password,
            avatar: avatar,
            description: description,
            email_contact_link: email_contact_link
        })
    }
}

export { UpdateUserService }