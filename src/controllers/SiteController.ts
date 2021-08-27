import { Request, Response } from "express";
import { CreateSiteService } from "../services/Create/CreateSiteService";
import { DeleteSiteService } from "../services/Delete/DeleteSiteService";
import { GetSiteService } from "../services/Get/GetSiteService";
import { SearchSiteService } from "../services/Search/SearchSiteService";
import { UpdateSiteService } from "../services/Update/UpdateSiteService";

class SiteController {

    async handleCreate(request: Request, response: Response){
        let name: string = request.body["site-name"];
        let link: string = request.body["site-link"];
        const category: string = request.body.category;

        name = name.trim();
        link = link.trim();

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
        let name: string = request.body["site-name"];
        let link: string = request.body["site-link"];
        const category: string = request.body.category;

        name = name.trim();
        link = link.trim();

        const updateSiteService = new UpdateSiteService();

        try{

            await updateSiteService.execute({ id, name, link, category });
            
            return response.status(200).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleSearch(request: Request, response: Response){
        let name: string = request.body["site-name"];

        name = name.trim();
      
        const searchSiteService = new SearchSiteService();

        try{

            const site = await searchSiteService.execute(name);

            return response.status(200).json({ site });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleSearchId(request: Request, response: Response){
        const id = request.params.id;

        const searchSiteService = new SearchSiteService();

        try{

            const site = await searchSiteService.executeId(id);

            return response.status(200).json({ site });

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
            
            return response.status(200).json("ok");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { SiteController }