import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class SearchSiteService {

    async execute(searchName: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.find({
            name: searchName
        })

        return classToPlain(site)
    }
}

export { SearchSiteService }