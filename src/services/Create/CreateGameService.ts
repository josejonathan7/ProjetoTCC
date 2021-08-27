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
 
        if(name === "" || link === "" || image === ""){
            throw new Error ("Preencha todos os campos");
        }


        const game = gamesRepositorie.create({
            name,
            link,
            image
        });

        await gamesRepositorie.save(game);
        
        const status = game ? "Sucess" : undefined;

        if(typeof status === "undefined"){
            throw new Error ("Falha na criação do registro");
        }
    }
}

export { CreateGameService }