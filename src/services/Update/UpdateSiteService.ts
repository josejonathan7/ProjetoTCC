import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

interface ISiteRequest{
    id: string;
    name: string;
    link: string;
    category: string;
}

class UpdateSiteService {

    async execute({ category, id, link, name }: ISiteRequest){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        await siteRepositorie.update(id, {
            name: name,
            link: link,
            category: category
        })
    }
}

export { UpdateSiteService }