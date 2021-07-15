import { Request, Response } from "express";
import { SearchAnimeService } from "../../services/Search/SearchAnimeService";

class SearchAnimeController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchAnimeService = new SearchAnimeService()

        const anime = await searchAnimeService.execute(name)

        const status = anime ? response.json(anime) : response.send("Anime não encontrada!")

        return status
    }
}

export { SearchAnimeController }