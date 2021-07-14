import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

interface ISiteRequest {
    id: string;
    name: string;
    link: string;
    category: string;
}

class CreateSiteService {

    async execute({ category, id, link, name}: ISiteRequest){
        const siteRepositorie = getCustomRepository(SitesRepositories)

        const site = siteRepositorie.create({
            id,
            name,
            link,
            category
        })

        await siteRepositorie.save(site);

    }
}

export { CreateSiteService }