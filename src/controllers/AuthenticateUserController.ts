import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { SearchUserService } from '../services/Search/SearchUserService'
const express = require('express');
const cookieSession = require('cookie-session');
const app = express();

app.use(cookieSession({
    name: 'tokenSession',
    keys: ['key1']
}));
class AuthenticateUserController {

    async handleAuthenticate(request: Request, response: Response){
        const name = request.body["user-name"]
        const password = request.body["user-password"]

        const searchUserService = new SearchUserService()
        const authenticateUserService = new AuthenticateUserService()

        try{
            
            const token = await authenticateUserService.execute({
                name,
                password
            })

            request.session.tokenSession = token;
        
            const userData = await searchUserService.execute(name)

            return response.render("Register", { token, userData })

        }catch{

            return response.send("Email/password Invalid!")
        }
    }
}

export { AuthenticateUserController }