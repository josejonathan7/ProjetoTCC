import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

interface ISiteRequest {
    name: string;
    link: string;
    category: string;
}

class CreateSiteService {

    async execute({ name,  link, category }: ISiteRequest){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = siteRepositorie.create({
            name,
            link,
            category
        });

        await siteRepositorie.save(site);
        
        const status = site ? "Site criado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }

        return status;
    }
}

export { CreateSiteService }