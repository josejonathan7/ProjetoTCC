import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

interface IGameRequest{
    id: string;
    name: string;
    link: string;
    image: string;
}

class UpdateGameService {

    async execute({ id, name, link, image }: IGameRequest){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const game = await gameRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        });

        const status = game ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error("Falha na atualização");
        }
    }
}

export { UpdateGameService }