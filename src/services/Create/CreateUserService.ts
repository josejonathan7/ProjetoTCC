import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from 'bcrypt'

interface IUserRequest {
    id: string;
    name: string;
    password: string;
    avatar: string;
    email_contact_link: string;
    description: string;
}

class CreateUserService {

    async execute({ id, name, email_contact_link, password, avatar, description}: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const userAlreadyExists = userRepositorie.findOne({
            id
        })

        if(userAlreadyExists){
            throw new Error("User Already Exists")
        }

        const passwordHash = await hash(password, 8);

        const user = userRepositorie.create({
            id,
            name,
            password,
            avatar,
            email_contact_link,
            description
        })

        await userRepositorie.save(user)

    }
}

export { CreateUserService }