import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class SearchSiteService {

    async execute(searchName: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.find({
            name: searchName
        });

        const status = site.length ?  classToPlain(site): undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ searchName } não encontrado!`);
        }

        return status;
    }

    async executeId(id: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.find({
            id
        });

        const status = site.length ? classToPlain(site) : undefined;

        if(typeof status === "undefined"){
            throw new Error (`${ id } não encontrado!`);
        }

        return status
    }
}

export { SearchSiteService }