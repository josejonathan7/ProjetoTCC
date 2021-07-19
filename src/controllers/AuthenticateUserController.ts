import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

    async handleAuthenticate(request: Request, response: Response){
        const name = request.body["user-name"]
        const password = request.body["user-password"]

        const authenticateUserService = new AuthenticateUserService()

        try{
            
            const token = await authenticateUserService.execute({
                name,
                password
            })

            return response.render("Register", { token })

        }catch{

            return response.send("Email/password Invalid!")
        }
    }
}

export { AuthenticateUserController }