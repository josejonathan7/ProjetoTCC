import { Request, Response } from "express";


class RecordsAccessController{
  
    //acessando as páginas de criação, atualização, e deletar registros
    accesFormNew(request: Request, response: Response){
        return response.render("Register");
    }

    accesFormUpdate(request: Request, response: Response){
        return response.render("UpdateRegisters");
    }
    
}

export { RecordsAccessController }