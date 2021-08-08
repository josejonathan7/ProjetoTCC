import { Request, Response } from "express";
import { CreateUserService } from "../services/Create/CreateUserService";
import { DeleteUserService } from "../services/Delete/DeleteUserService";
import { GetUserService } from "../services/Get/GetUserService";
import { SearchUserService } from "../services/Search/SearchUserService";
import { UpdateUserService } from "../services/Update/UpdateUserService";

class UserController {

    async handleCreate(request: Request, response: Response){
        const name: string = request.body["user-name"];
        const email_contact_link: string = request.body["email-contact-link"];
        const password: string = request.body["user-password"];
        const avatar: string = request.body.avatar;
        const description: string = request.body["user-description"];

        const creatUserService = new CreateUserService();

        try {

            const createUser = await creatUserService.execute({ name, email_contact_link, password, avatar, description });
            return response.send(createUser);

        }catch(err){
            return response.json({error: err.message});
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        const name: string = request.body["user-name"];
        const email_contact_link: string = request.body["email-contact-link"];
        const avatar: string = request.body.avatar;
        const description: string = request.body["user-description"];

        const updateUserService = new UpdateUserService();

        const updateUser = await updateUserService.execute({ id, name, avatar, description, email_contact_link });
        
        return response.send(updateUser);
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["user-name"];

        const searchUserService = new SearchUserService();

        const user = await searchUserService.execute(name);
        
        return response.json(user);
    }
    
    async handleGet(){
        const getUserService = new GetUserService();

        const user = await getUserService.execute();

        return user;
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteUserService = new DeleteUserService();

        const deleteUser = await deleteUserService.execute(id);
        
        return response.send(deleteUser);
    }
}

export { UserController }