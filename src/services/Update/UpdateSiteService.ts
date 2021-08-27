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

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }
        
        if(name === "" || link === ""){
            throw new Error ("Preencha todos os campos");
        }
        
        if(category === "" || category !== "anime" && category !== "game"){
            throw new Error ("Preencha a categoria corretamente!!");
        }

        const site = await siteRepositorie.update(id, {
            name: name,
            link: link,
            category: category
        });

        const status = site ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateSiteService }