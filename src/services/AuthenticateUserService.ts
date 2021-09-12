import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    name: string;
    password: string;
}

class AuthenticateUserService{

    constructor() {}

    async execute({ name, password }: IAuthenticateRequest){
        const userRepositorie = getCustomRepository(UsersRepositories);
       
        if(name === ""){
            throw new Error ("Preencha o campo Nome!");
        }

        if(password === ""){
            throw new Error ("Preencha o campo senha!");
        }

        const user = await userRepositorie.findOne({name});

        if(!user){
            throw new Error("Email/Senha incorreto");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorreto");
        }

        const token = sign({
            name: user.name,
            email_contact_link: user.email_contact_link,
            admin: user.admin
        }, "AniJogos" , 
        {
            subject: user.id, 
            expiresIn: "1h"
        });

        return token;
    }
}

export { AuthenticateUserService }