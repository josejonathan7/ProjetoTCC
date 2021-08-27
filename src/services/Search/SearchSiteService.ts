import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { SitesRepositories } from "../../repositories/SitesRepositories";

class SearchSiteService {

    async execute(searchName: string){
        const siteRepositorie = getCustomRepository(SitesRepositories);

        if(searchName === ""){
            throw new Error ("Informe o nome do site que desejar pesquisar!");
        }

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

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar pesquisar!");
        }

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