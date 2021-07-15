import { Request, Response } from "express";
import { SearchSongService } from "../../services/Search/SearchSongService";

class SearchSongController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchSongService = new SearchSongService()

        const song = await searchSongService.execute(name)

        const status = song ? response.json(song) : response.send("Música não encontrada!")

        return status
    }
}

export { SearchSongController }