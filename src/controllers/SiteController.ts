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
        const category: string = request.body.category;

        const creatSiteService = new CreateSiteService();

        try{

            await creatSiteService.execute({ name, link, category});

            return response.status(201).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleUpdate(request: Request, response: Response){
        const id = request.params.id;
        const name: string = request.body["site-name"];
        const link: string = request.body["site-link"];
        const category: string = request.body["site-category"];

        const updateSiteService = new UpdateSiteService();

        try{

            await updateSiteService.execute({ id, name, link, category });
            
            return response.json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleSearch(request: Request, response: Response){
        const name: string = request.body["site-name"];

        const searchSiteService = new SearchSiteService();

        try{

            const site = await searchSiteService.execute(name);

            return response.json({ site });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleGet(){
        const getSiteService = new GetSiteService();

        try {

            const site = await getSiteService.execute();

            return site;

        }catch (err){
            throw new Error("falha");
        }
      
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteSiteService = new DeleteSiteService();

        try{

            await deleteSiteService.execute(id);
            
            return response.json("ok");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { SiteController }