import {  Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticate(request: Request, response: Response){
   const token = request.body.token;


   try{

      verify(token, "AniJogos");

      return response.json({token});

   }catch(err){

      return response.status(401).send("token not exists"); 
   }
}


