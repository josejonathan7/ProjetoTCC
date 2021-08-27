import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { SearchUserService } from '../services/Search/SearchUserService';

class AuthenticateUserController {

    async handleAuthenticate(request: Request, response: Response){
        const name: string = request.body.user;
        const password: string = request.body.password;

        const searchUserService = new SearchUserService();
        const authenticateUserService = new AuthenticateUserService();

        try{
            
            const token = await authenticateUserService.execute({
                name,
                password
            });

            const userData = await searchUserService.execute(name);


            return response.status(200).json({ token, user: userData });

        }catch(err){

            return response.status(401).send(err.message);
        }
    }
}

export { AuthenticateUserController }