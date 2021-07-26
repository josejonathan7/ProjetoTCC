import { NextFunction, Response, Request } from 'express';

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){

   next()
}


