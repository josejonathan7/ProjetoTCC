import dotenv from 'dotenv';
import express, {Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import './database';
import 'express-async-error';
import { createRouter } from './routes/CreateRoutes';
import { updateRouter } from './routes/UpdateRouter';
import { deleteRouter } from './routes/DeleteRoutes';
import { searchRouter } from './routes/SearchRoutes';
import { getRouter } from './routes/GetRoutes';
import cors from 'cors';

const server = express();

server.use(express.json())
server.use(express.static("public"));

server.use(cors());

server.use(express.urlencoded({extended: true}))

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

dotenv.config()

server.listen(process.env.PORT || 3010, () => console.log("O servidor esta rodando"))