import { getCustomRepository } from "typeorm";
import { AnimesRepositories } from "../../repositories/AnimesRepositories";

interface IAnimesRequest{
    name: string;
    link: string;
    image?: string;
}

class CreateAnimeService {

    constructor() {}

    async execute({ name, link, image }: IAnimesRequest ){
        const animesRepositorie = getCustomRepository(AnimesRepositories);

        if(name === "" || link === ""){
            throw new Error ("Preencha pelo menos os campos nome e link!");
        }

        const animes = animesRepositorie.create({
            name,
            image,
            link
        });

        await animesRepositorie.save(animes);
        
        const status = animes ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }

    }
}

export { CreateAnimeService }