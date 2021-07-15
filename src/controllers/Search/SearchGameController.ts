import { Request, Response } from "express";
import { SearchGameService } from "../../services/Search/SearchGameService";

class SearchGameController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchGameService = new SearchGameService()

        const game = await searchGameService.execute(name)

        const status = game ? response.json(game) : response.send("Jogo não encontrado!")

        return status
    }
}

export { SearchGameController }