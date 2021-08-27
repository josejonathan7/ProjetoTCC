import {  Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticate(request: Request, response: Response){
   const token = request.body.token;


   try{

      const user = verify(token, "AniJogos");


      return response.json({user});

   }catch(err){

      return response.status(401).send("token inválido"); 
   }
}


