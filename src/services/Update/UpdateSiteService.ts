import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

interface ISiteRequest{
    id: string;
    name: string;
    link: string;
    category: string;
}

class UpdateSiteService {

    async execute({ id, name, link, category }: ISiteRequest){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.update(id, {
            name: name,
            link: link,
            category: category
        });

        const status = site ? "Anime atualizado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }

        return status;
    }
}

export { UpdateSiteService }