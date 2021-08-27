import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { CreateUserService } from "../services/Create/CreateUserService";
import { DeleteUserService } from "../services/Delete/DeleteUserService";
import { GetUserService } from "../services/Get/GetUserService";
import { SearchUserService } from "../services/Search/SearchUserService";
import { UpdateUserService } from "../services/Update/UpdateUserService";

class UserController {

    async handleCreate(request: Request, response: Response){
        let name = request.body["create-login"];
        let email_contact_link = request.body.email;
        let password = request.body["create-password"];
        let admin = request.body.admin;
        let description = request.body.description
        let avatar = request.body.avatar;
      

        const creatUserService = new CreateUserService();

        try {

            name = name.trim();
            password = password.trim();
    
            if(email_contact_link === "" || typeof email_contact_link === "undefined"){
                email_contact_link = null;
            }else{
                email_contact_link = email_contact_link.trim();
            }
    
            if(avatar === "" || typeof avatar === "undefined"){
                avatar = null;
            }else{
                avatar = avatar.trim();
            }
    
            if(description === "" || typeof description === "undefined"){
                description= null;
            }else{
                description = description.trim();
            }
    
            if(admin === "true"){
                admin = true;
            }else {
                admin = false;
            }

            await creatUserService.execute({ name, email_contact_link, password, avatar, description, admin });

            return response.status(201).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleCreateCommonUser (request: Request, response: Response){
        let name = request.body["create-login"];
        let email_contact_link = request.body.email;
        let password = request.body["create-password"];

        const creatUserService = new CreateUserService();
        const authenticateUserService = new AuthenticateUserService();
        const searchUserService = new SearchUserService();

        try {

            name = name.trim();
            password = password.trim();

           
            if(email_contact_link === "" || typeof email_contact_link === "undefined"){
                email_contact_link = null;
            }else{
                email_contact_link = email_contact_link.trim();
            }

            await creatUserService.executeCommonUser({ name, email_contact_link, password });

            const token = await authenticateUserService.execute({
                name,
                password
            });

            const userData = await searchUserService.execute(name);

            return response.status(201).json({ token, user: userData });

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        let name: string = request.body["user-name"];
        let email_contact_link = request.body.email;
        let avatar = request.body.avatar;
        let description = request.body["user-description"];
        let admin = request.body.admin;

    
        if(admin.trim() === "true"){
            admin = true;
        }else {
            admin = false;
        }

        const updateUserService = new UpdateUserService();

        try{ 

            name = name.trim();
            
            if(email_contact_link === "" || typeof email_contact_link === "undefined"){
                email_contact_link = null;
            }else{
                email_contact_link = email_contact_link.trim();
            }

            
            if(avatar === "" || typeof avatar === "undefined"){
                avatar = null;
            }else{
                avatar = avatar.trim();
            }
    
            if(description === "" || typeof description === "undefined"){
                description= null;
            }else{
                description = description.trim();
            }
    
            
            await updateUserService.execute({ id, name, avatar, description, email_contact_link, admin });
            
            return response.status(200).json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        let name: string = request.body["user-name"];

        name = name.trim();

        const searchUserService = new SearchUserService();

        try{

            const user = await searchUserService.execute(name);
            
            return response.status(200).json({ user });
            
        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleSearchId(request: Request, response: Response){
        const id: string = request.params.id;

        const searchUserService = new SearchUserService();

        try{

            const user = await searchUserService.executeId(id);
            
            return response.status(200).json({ user });
            
        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handleGet(){
        const getUserService = new GetUserService();

        try {

            const user = await getUserService.execute();

            return user;

        } catch(err){
            throw new Error("falha");
        }
    }

    
    async handleGetAdmin(){
        const getUserService = new GetUserService();

        try {

            const user = await getUserService.executeAdmin();

            return user;

        } catch(err){
            throw new Error("falha");
        }
    }
    
    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteUserService = new DeleteUserService();

        try{
            await deleteUserService.execute(id);
            
            return response.status(200).json("ok");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { UserController }