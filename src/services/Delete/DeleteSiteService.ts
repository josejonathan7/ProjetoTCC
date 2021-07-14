import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class DeleteSiteService {

    async execute(id: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        await siteRepositorie.delete({
            id
        })
    }
}

export { DeleteSiteService}