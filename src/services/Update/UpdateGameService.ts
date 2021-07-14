import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

interface IGameRequest{
    id: string;
    name: string;
    link: string;
    image: string;
}

class UpdateGameService {

    async execute({ id, image, link, name }: IGameRequest){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        await gameRepositorie.update(id, {
            name: name,
            link: link,
            image: image
        })
    }
}

export { UpdateGameService }