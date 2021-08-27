import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

interface IAnimeRequest{
    id: string;
    name: string;
    link: string;
    image: string;
}

class UpdateAnimeService {

    async execute({ id, name, link, image}: IAnimeRequest){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        if(id === ""){
            throw new Error ("Informe o ID do registro que desejar deletar!");
        }
        
        if(name === "" || link === "" || image === ""){
            throw new Error ("Preencha todos os campos");
        }

        const anime = await animeRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        });

        const status = anime ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateAnimeService }