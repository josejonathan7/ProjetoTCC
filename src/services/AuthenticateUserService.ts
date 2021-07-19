import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            name: user.name,
            avatar: user.avatar,
            email_contact_link: user.email_contact_link,
            description: user.description
        }, "32fe1db801db87ee9742046508726b89" , 
        {
            subject: user.id, 
            expiresIn: "10s"
        })

        return token
    }
}

export { AuthenticateUserService }