import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from 'bcrypt'

interface IUserRequest {
    name: string;
    password: string;
    avatar: string;
    email_contact_link: string;
    description: string;
}

class CreateUserService {

    async execute({ name, email_contact_link, password, avatar, description}: IUserRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);

        const userAlreadyExists = await userRepositorie.findOne({
            name
        })

        if(userAlreadyExists){
            throw new Error("User Already Exists")
        }

        const passwordHash = await hash(password, 8);

        const user = userRepositorie.create({
            name,
            password: passwordHash,
            avatar,
            email_contact_link,
            description
        })

        await userRepositorie.save(user)
        
        const status = user ? user : "Falha na operação"

        return status
    }
}

export { CreateUserService }