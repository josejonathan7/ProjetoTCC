import { Request, Response } from "express";
import { CreateUserService } from "../services/Create/CreateUserService";
import { DeleteUserService } from "../services/Delete/DeleteUserService";
import { GetUserService } from "../services/Get/GetUserService";
import { SearchUserService } from "../services/Search/SearchUserService";
import { UpdateUserService } from "../services/Update/UpdateUserService";

class UserController {

    async handleCreate(request: Request, response: Response){
        const { name, email_contact_link, password, avatar, description } = request.body

        const creatUserService = new CreateUserService()

        const user = await creatUserService.execute({ name, email_contact_link, password, avatar, description })

        return response.json(user)
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const { name, password, avatar, description, email_contact_link } = request.body

        const updateUserService = new UpdateUserService()

        await updateUserService.execute({ id, name, password, avatar, description, email_contact_link })
        
        return response.send(`Conteudo de ID:${id} Atualizado com sucesso`)
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body

        const searchUserService = new SearchUserService()

        const user = await searchUserService.execute(name)

        const status = user ? response.json(user) : response.send("Usuario não encontrado!")

        return status
    }
    
    async handleGet(request: Request, response: Response){
        const getUserService = new GetUserService()

        const user = await getUserService.execute()

        const status = user ? response.json(user) : response.send("Usuario não encontrado!")

        return status
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteUserService = new DeleteUserService()

        await deleteUserService.execute(id)
        
        return response.send(`Conteudo de ID:${id} Deletado com sucesso`)
    }
}

export { UserController }








/*

let userDataForDisplay = {};
module.exports = {
    //acessando as páginas de criação, atualização, e deletar registros
    async accesFormNew(req, res){
        
        const user = req.body["user-name"]
        const password = req.body["user-password"]

        const data = await UsersData.get()    

        const consult = data.find(data => data.name === user)

        if(consult == null){
            return res.status(401).send("Login/Password invalid!")
        }

        try {

            if(await compare(password, consult.password)){
                
                userDataForDisplay = consult;

                return res.render("Register", {userData: userDataForDisplay})

            }else{
            
                    return res.status(401).send("Password invalid!")

            }

        } catch {
            
            return res.status(500).send()
        }
    },
    async accesFormUpdate(req, res){
        const data = userDataForDisplay ? userDataForDisplay : ""

        if(!data){
            return res.status(401).send("User not logged in!")
        }

        return res.render("UpdateRegisters", { userData: data })
    },
    async redirectUpdateForNewForm(req, res){
        const data = userDataForDisplay ? userDataForDisplay : ""

        if(!data){
            return res.status(401).send("User not logged in!")
        }

        return res.render("Register", { userData: data })
    },

}
*/