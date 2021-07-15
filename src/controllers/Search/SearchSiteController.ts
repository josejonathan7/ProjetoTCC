import { Request, Response } from "express";
import { SearchSiteService } from "../../services/Search/SearchSiteService";

class SearchSiteController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchSiteService = new SearchSiteService()

        const site = await searchSiteService.execute(name)

        const status = site ? response.json(site) : response.send("Site não encontrado!")

        return status
    }
}

export { SearchSiteController }