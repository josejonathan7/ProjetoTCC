import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
const express = require('express');
const cookieSession = require('cookie-session');
const app = express();

app.use(cookieSession({
    name: 'tokenSession',
    keys: ['key1']
}));
    
interface IPayload {
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){

    //receber o token
    const sessionsToken = request.session.tokenSession

    //validar se o token esta preenchido
    if(!sessionsToken){
        return response.status(401).end()
    }

    const  token  = sessionsToken 

    //validar se  o token é valido
    try {
        const { sub } = verify(token, "AniJogos") as IPayload

        request.user_id = sub

        request.session.tokenSession = token

        return next()

    } catch (error) {
        return response.status(401).send("ok");      
    }
}


