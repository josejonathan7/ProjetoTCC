import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { GamesRepositories } from "../../../repositories/GamesRepositories";

class PaginationGameService {

    async execute(start: number, recordsPerPage: number){
        const gameRepositorie = getCustomRepository(GamesRepositories);

        const count = await gameRepositorie.count()
        const game = await gameRepositorie.query(`SELECT * FROM tb_games ORDER BY name LIMIT ${recordsPerPage} OFFSET  ${start} `)
        
        const array = [
            classToPlain(game),
            count
        ]

        const status = array ? array : "";

        return status
    }
}

export { PaginationGameService }