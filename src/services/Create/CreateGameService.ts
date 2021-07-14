import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

interface IGamesRequest {
    id: string;
    name: string;
    link: string;
    image: string;
}

class CreateGameService {

    async execute({ id, image, link, name}: IGamesRequest){
        const gamesRepositorie = getCustomRepository(GamesRepositories);

        const game = gamesRepositorie.create({
            id,
            name,
            link,
            image
        })

        await gamesRepositorie.save(game);
    }
}

export { CreateGameService }