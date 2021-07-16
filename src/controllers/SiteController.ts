import { Request, Response } from "express";
import { CreateSiteService } from "../services/Create/CreateSiteService";
import { DeleteSiteService } from "../services/Delete/DeleteSiteService";
import { GetSiteService } from "../services/Get/GetSiteService";
import { SearchSiteService } from "../services/Search/SearchSiteService";
import { UpdateSiteService } from "../services/Update/UpdateSiteService";

class SiteController {

    async handleCreate(request: Request, response: Response){
        const { name, link, category } = request.body

        const creatSiteService = new CreateSiteService()

        const site = await creatSiteService.execute({ name, link, category})

        return response.json(site)
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, link, category } = request.body

        const updateSiteService = new UpdateSiteService()

        await updateSiteService.execute({ id, name, link, category })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }

    async handleSearch(request: Request, response: Response){
        const { name } = request.body

        const searchSiteService = new SearchSiteService()

        const site = await searchSiteService.execute(name)

        const status = site ? response.json(site) : response.send("Site não encontrado!")

        return status
    }

    async handleGet(request: Request, response: Response){
        const getSiteService = new GetSiteService()

        const site = await getSiteService.execute()

        const status = site ? response.json(site) : response.send("Site não encontrado!")

        return status
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteSiteService = new DeleteSiteService()

        await deleteSiteService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { SiteController }