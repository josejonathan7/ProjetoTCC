import { Request, Response } from "express";
import { CreateUserService } from "../../services/Create/CreateUserService";

class CreateUserController {

    async handleCreate(request: Request, response: Response){
        const { name, email_contact_link, password, avatar, description } = request.body

        const creatUserService = new CreateUserService()

        const user = await creatUserService.execute({ name, email_contact_link, password, avatar, description })

        return response.json(user)
    }
}

export { CreateUserController }
