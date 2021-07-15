import { CreateAnimeService } from "../../services/Create/CreateAnimeService";
import { Request, Response } from 'express';

class CreateAnimeController {
    
    async handleCreate(request: Request, response: Response){
        const { name, link, image } = request.body

        const creatAnimeService = new CreateAnimeService()

        const anime = await creatAnimeService.execute({name , link, image})

        return response.json(anime)
    }
}

export { CreateAnimeController }