import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class GetSiteService {

    async execute(){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.find();

        const status = site ? classToPlain(site) : undefined;

        if(typeof status === "undefined"){
            throw new Error("Nenhum site encontrado");
        }

        return status;
    }
}

export { GetSiteService }