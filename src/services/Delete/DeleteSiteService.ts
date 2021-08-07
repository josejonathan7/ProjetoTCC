import { getCustomRepository } from "typeorm";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class DeleteSiteService {

    async execute(id: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        const site = await siteRepositorie.delete({
            id
        });

        const status = site ? "Site deletado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na criação do registro");
        }

        return status;
    }
}

export { DeleteSiteService}