import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

interface IAnimeRequest{
    id: string;
    name: string;
    link: string;
    image: string;
}

class UpdateAnimeService {

    async execute({ id, image, link, name}: IAnimeRequest){
        const animeRepositorie = getCustomRepository(AnimesRepositories);

        await animeRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        })
    }
}

export { UpdateAnimeService }