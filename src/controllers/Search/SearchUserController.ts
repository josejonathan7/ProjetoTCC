import { Request, Response } from "express";
import { SearchUserService } from "../../services/Search/SearchUserService";

class SearchUserController {

    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchUserService = new SearchUserService()

        const user = await searchUserService.execute(name)

        const status = user ? response.json(user) : response.send("Usuario não encontrado!")

        return status
    }
}

export { SearchUserController }