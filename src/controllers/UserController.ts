import { Request, Response } from "express";
import { CreateUserService } from "../services/Create/CreateUserService";
import { DeleteUserService } from "../services/Delete/DeleteUserService";
import { GetUserService } from "../services/Get/GetUserService";
import { SearchUserService } from "../services/Search/SearchUserService";
import { UpdateUserService } from "../services/Update/UpdateUserService";

class UserController {

    async handleCreate(request: Request, response: Response){
        const name = request.body["user-name"]
        const email_contact_link = request.body["email-contact-link"]
        const password = request.body["user-password"]
        const avatar = request.body.avatar
        const description = request.body["user-description"]

        const creatUserService = new CreateUserService()

        await creatUserService.execute({ name, email_contact_link, password, avatar, description })

        return response.render("Register")
    }
    
    async handleUpdate(request: Request, response: Response){
        const id = request.params.id
        const name = request.body["user-name"]
        const email_contact_link = request.body["email-contact-link"]
        const avatar = request.body.avatar
        const description = request.body["user-description"]

        const updateUserService = new UpdateUserService()

        await updateUserService.execute({ id, name, avatar, description, email_contact_link })
        
        return response.render("UpdateRegisters")
    }
    
    async handleSearch(request: Request, response: Response){
        const name = request.body["user-name"]

        const searchUserService = new SearchUserService()

        const user = await searchUserService.execute(name)

        const status = user ? response.render("updateDelete/UpdateDeleteShowUser", { dataResult: user }) : response.status(401).send("Name Search not Found!")

        return status
    }
    
    async handleGet(){
        const getUserService = new GetUserService()

        const user = await getUserService.execute()

        const status = user ? user : "Usuario não encontrado!"

        return status
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id

        const deleteUserService = new DeleteUserService()

        await deleteUserService.execute(id)
        
        return response.render("UpdateRegisters")
    }
}

export { UserController }