import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

interface IAnimesRequest{
    id: string;
    name: string;
    link: string;
    image: string;
}

class CreateAnimeService {

    async execute({ id, image, link, name }: IAnimesRequest ){
        const animesRepositorie = getCustomRepository(AnimesRepositories);

        const animes = animesRepositorie.create({
            id,
            name,
            image,
            link
        })

        await animesRepositorie.save(animes)
    }
}

export { CreateAnimeService }