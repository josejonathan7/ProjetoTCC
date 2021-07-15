import { Request, Response } from "express";
import { GetSiteService } from "../../services/Get/GetSiteService";

class GetSiteController {

    async handleGet(request: Request, response: Response){
        const getSiteService = new GetSiteService()

        const site = await getSiteService.execute()

        const status = site ? response.json(site) : response.send("Site não encontrado!")

        return status
    }
}

export { GetSiteController }