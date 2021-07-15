import { Request, Response } from "express";
import { CreateSiteService } from "../../services/Create/CreateSiteService";

class CreateSiteController {

    async handleCreate(request: Request, response: Response){
        const { name, link, category } = request.body

        const creatSiteService = new CreateSiteService()

        const site = await creatSiteService.execute({ name, link, category})

        return response.json(site)
    }
}

export { CreateSiteController }