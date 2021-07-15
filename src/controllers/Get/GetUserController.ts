import { Request, Response } from "express";
import { GetUserService } from "../../services/Get/GetUserService";

class GetUserController {

    async handleGet(request: Request, response: Response){
        const getUserService = new GetUserService()

        const user = await getUserService.execute()

        const status = user ? response.json(user) : response.send("Usuario não encontrado!")

        return status
    }
}

export { GetUserController }