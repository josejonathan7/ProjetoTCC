import { Request, Response } from "express";
import { UserController } from "./UserController";


class RecordsAccessController{
  
    //acessando as páginas de criação, atualização, e deletar registros
    async accesFormNew(request: Request, response: Response){
        const userController = new UserController()

        try {

            const users = await userController.handleGetAdmin()

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (users.length - 0));
            let contactUsers= [];
 
            if(typeof users === "object"){
                contactUsers = users[randomUser];
            }else {
                contactUsers = users;
            }

            return response.status(200).json({contactUsers});

        }catch(err){
            return response.status(400).send(err.message)
        }
    }
}

export { RecordsAccessController }