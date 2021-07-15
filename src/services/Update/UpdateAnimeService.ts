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

        await animeRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        })
    }
}

export { UpdateAnimeService }