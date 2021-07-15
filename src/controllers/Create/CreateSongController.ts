import { CreateSongService } from "../../services/Create/CreateSongService";
import { Request, Response } from "express";

class CreateSongController {

    async handleCreate(request: Request, response: Response){
        const { name, link } = request.body

        const creatSongService = new CreateSongService()

        const song = await creatSongService.execute({ name, link})

        return response.json(song)
    }
}

export { CreateSongController }