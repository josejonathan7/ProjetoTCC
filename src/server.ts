import express, {Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import './database'

const server = express();
const path = require('path');

const createRoutes = require('./routes/CreateRoutes')
const updateRoutes = require('./routes/UpdateRouter')
const deleteRoutes = require('./routes/DeleteRoutes')
const searchRoutes = require('./routes/SearchRoutes')
const getRoutes = require('./routes/GetRoutes')

server.set('view engine', 'ejs')
server.set("views", path.join(__dirname, "views"))

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use(createRoutes)
server.use(updateRoutes)
server.use(deleteRoutes)
server.use(searchRoutes)
server.use(getRoutes)

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