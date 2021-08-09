import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class DeleteSiteService {

    async execute(id: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.delete({
            id
        });

        const status = site ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha ao deletar registro");
        }
    }
}

export { DeleteSiteService}