import express, {Request, Response, NextFunction } from 'express'
import './database'
import 'reflect-metadata'

const server = express();

server.use(express.json())

import path from 'path';

import { createRouter } from './routes/CreateRoutes';
import { updateRouter } from './routes/UpdateRouter';
import { deleteRouter } from './routes/DeleteRoutes';
import { searchRouter } from './routes/SearchRoutes';
import { getRouter } from './routes/GetRoutes';
import cookieSession from 'cookie-session';

server.set('view engine', 'ejs')
server.set("views", path.join(__dirname, "views"))

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(cookieSession({
    name: 'tokenSession',
    keys: ['key1'],
    maxAge: 60 * 60 * 3// 3 hours
}))

server.use(getRouter)

server.use(createRouter)
server.use(updateRouter)
server.use(deleteRouter)
server.use(searchRouter)


server.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({error: err.message})
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error!"
    })
})

server.listen(3000, () => console.log("O servidor esta rodando"))