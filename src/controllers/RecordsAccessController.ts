import { Request, Response } from "express";
import { UserController } from "./UserController";


class RecordsAccessController{

    constructor() {}
  
    //acessando as páginas de criação, atualização, e deletar registros
    async accesFormNew(request: Request, response: Response){
        const userController = new UserController()

        try {

            const users = await userController.handleGetAdmin()

            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (users.length - 0));
            const contactUsers = typeof users === 'object' ? users[randomUser] : users;

            return response.status(200).json({contactUsers});

        }catch(err: any){
            return response.status(400).send(err.message)
        }
    }
}

export { RecordsAccessController }