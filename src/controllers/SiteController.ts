import { Request, Response } from "express";
import { CreateSiteService } from "../services/Create/CreateSiteService";
import { DeleteSiteService } from "../services/Delete/DeleteSiteService";
import { GetSiteService } from "../services/Get/GetSiteService";
import { SearchSiteService } from "../services/Search/SearchSiteService";
import { UpdateSiteService } from "../services/Update/UpdateSiteService";

class SiteController {

    async handleCreate(request: Request, response: Response){
        const name = request.body["site-name"]
        const link = request.body["site-link"]
        const category = request.body["site-category"]

        const creatSiteService = new CreateSiteService()

        await creatSiteService.execute({ name, link, category})

        return response.render("Register")
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const name = request.body["site-name"]
        const link = request.body["site-link"]
        const category = request.body["site-category"]

        const updateSiteService = new UpdateSiteService()

        await updateSiteService.execute({ id, name, link, category })
        
        return response.render("UpdateRegisters")
    }

    async handleSearch(request: Request, response: Response){
        const name = request.body["site-name"]

        const searchSiteService = new SearchSiteService()

        const site = await searchSiteService.execute(name)

        const status = site ? response.render("updateDelete/UpdateDeleteShowSite", { dataResult: site }) : response.status(401).send("Name Search Not Found!")

        return status
    }

    async handleGet(){
        const getSiteService = new GetSiteService()

        const site = await getSiteService.execute()

        const status = site ? site : ""

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSiteService = new DeleteSiteService()

        await deleteSiteService.execute(id)
        
        return response.render("UpdateRegisters")
    }
}

export { SiteController }