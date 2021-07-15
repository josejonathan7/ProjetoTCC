import { Request, Response } from "express";
import { GetSongService } from "../../services/Get/GetSongService";

class GetSongController {

    async handleGet(request: Request, response: Response){
        const getSongService = new GetSongService()

        const song = await getSongService.execute()

        const status = song ? response.json(song) : response.send("Nenhum anime encontrado!")

        return status
    }
}

export { GetSongController }