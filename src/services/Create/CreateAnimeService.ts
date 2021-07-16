import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

interface IAnimesRequest{
    name: string;
    link: string;
    image: string;
}

class CreateAnimeService {

    async execute({ name, link, image }: IAnimesRequest ){
        const animesRepositorie = getCustomRepository(AnimesRepositories);

        const animes = animesRepositorie.create({
            name,
            image,
            link
        })

        await animesRepositorie.save(animes)
        
        const status = animes ? animes : "Falha na operação"

        return status
    }
}

export { CreateAnimeService }