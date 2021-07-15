import { CreateGameService } from "../../services/Create/CreateGameService";
import { Request, Response } from "express";

class CreateGameController {

    async handleCreate(request: Request, response: Response){
        const { name, link, image } = request.body

        const creatGameService = new CreateGameService()

        const game = await creatGameService.execute({ name, link, image })

        return response.json(game)
    }
}

export { CreateGameController }
