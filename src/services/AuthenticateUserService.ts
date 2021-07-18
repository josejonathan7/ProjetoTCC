import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compare } from 'bcrypt'

interface IAuthenticateRequest {
    name: string;
    password: string;
}

class AuthenticateUserService{

    async execute({ name, password }: IAuthenticateRequest){
        const userRepositorie = getCustomRepository(UsersRepositories)
        const user = await userRepositorie.findOne({name})

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

    }
}

export { AuthenticateUserService }