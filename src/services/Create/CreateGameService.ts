import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../../repositories/GamesRepositories";

interface IGamesRequest {
    name: string;
    link: string;
    image: string;
}

class CreateGameService {

    async execute({ name, link, image }: IGamesRequest){
        const gamesRepositorie = getCustomRepository(GamesRepositories);

        const game = gamesRepositorie.create({
            name,
            link,
            image
        });

        await gamesRepositorie.save(game);
        
        const status = game ? "Jogo criado com sucesso" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }

        return status;
    }
}

export { CreateGameService }