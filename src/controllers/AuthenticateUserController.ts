import { NextFunction, Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { SearchUserService } from '../services/Search/SearchUserService';

class AuthenticateUserController {

    async handleAuthenticate(request: Request, response: Response, next: NextFunction){
        const name: string = request.body["user-login"];
        const password: string = request.body["user-password"];

        const searchUserService = new SearchUserService();
        const authenticateUserService = new AuthenticateUserService();

        try{
            
            const token = await authenticateUserService.execute({
                name,
                password
            });

            const userData = await searchUserService.execute(name);

            next(); 

        }catch{

            return response.status(401).send("Email/password Invalid!");
        }
    }
}

export { AuthenticateUserController }