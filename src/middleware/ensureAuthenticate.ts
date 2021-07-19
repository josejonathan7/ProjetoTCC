import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
    
interface IPayload {
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){

    //receber o token
    const authToken = request.headers.authorization

    console.log(authToken)
    //validar se o token esta preenchido
    if(!authToken){
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    //validar se  o token é valido
    try {
        const { sub } = verify(token, "32fe1db801db87ee9742046508726b89") as IPayload

        request.user_id = sub

        return next()

    } catch (error) {
        return response.status(401).end();      
    }
}


