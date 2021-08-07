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

        const anime = await animeRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        });

        const status = anime ? "Anime atualizado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }

        return status;
    }
}

export { UpdateAnimeService }