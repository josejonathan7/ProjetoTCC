import { Request, Response } from "express";
import { CreateSiteService } from "../services/Create/CreateSiteService";
import { DeleteSiteService } from "../services/Delete/DeleteSiteService";
import { GetSiteService } from "../services/Get/GetSiteService";
import { SearchSiteService } from "../services/Search/SearchSiteService";
import { UpdateSiteService } from "../services/Update/UpdateSiteService";

class SiteController {

    async handleCreate(request: Request, response: Response){
        const name: string = request.body["site-name"];
        const link: string = request.body["site-link"];
        const category: string = request.body["site-category"];

        const creatSiteService = new CreateSiteService();

        try{
            const creatSite = await creatSiteService.execute({ name, link, category});

            //return response.render("Register")

            return response.send(creatSite);
        }catch(err){
            return response.json({error: err.message})
        }
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        const name: string = request.body["site-name"];
        const link: string = request.body["site-link"];
        const category: string = request.body["site-category"];

        const updateSiteService = new UpdateSiteService();

        try{
            const updateSite = await updateSiteService.execute({ id, name, link, category });
            
            //return response.render("UpdateRegisters");

            return response.send(updateSite);
        }catch(err){
            return response.json({ error: err.message });
        }

    }

    async handleSearch(request: Request, response: Response){
        const name: string = request.body["site-name"];

        const searchSiteService = new SearchSiteService();

        const site = await searchSiteService.execute(name);

        //const status = site ? response.render("updateDelete/UpdateDeleteShowSite", { dataResult: site }) : response.status(401).send("Name Search Not Found!");

        return site;
    }

    async handleGet(){
        const getSiteService = new GetSiteService();

        try {
            const site = await getSiteService.execute();

            return site;
        }catch (err){
            return JSON.stringify({ error: err.message });
        }
      
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSiteService = new DeleteSiteService();

        const deleteSite = await deleteSiteService.execute(id);
        
        //return response.render("UpdateRegisters");

        return response.send(deleteSite);
    }
}

export { SiteController }