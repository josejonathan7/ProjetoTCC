const UsersData = require('../models/UsersModels')
const ObservationData = require('../models/ObservationModels')
const SiteData = require('../models/SitesModels')
const { hash, compare } = require('bcrypt')
const { v4 } = require('uuid')
const uuid = v4;

let userDataForDisplay = {};

module.exports = {
    //acessando as páginas de criação, atualização, e deletar registros
    async accesFormNew(req, res){
        
        const user = req.body["user-name"]
        const password = req.body["user-password"]

        const data = await UsersData.get()    

        const consult = data.find(data => data.name === user)

        if(consult == null){
            return res.status(401).send("Login/Password invalid!")
        }

        try {

            if(await compare(password, consult.password)){
                
                userDataForDisplay = consult;

                return res.render("Register", {userData: userDataForDisplay})

            }else{
            
                    return res.status(401).send("Password invalid!")

            }

        } catch {
            
            return res.status(500).send()
        }
    },
    async accesFormUpdate(req, res){
        const data = userDataForDisplay ? userDataForDisplay : ""

        if(!data){
            return res.status(401).send("User not logged in!")
        }

        return res.render("UpdateRegisters", { userData: data })
    },
    async redirectUpdateForNewForm(req, res){
        const data = userDataForDisplay ? userDataForDisplay : ""

        if(!data){
            return res.status(401).send("User not logged in!")
        }

        return res.render("Register", { userData: data })
    },


    //criação de novo observação/usuario/sites 
    async registerUsers(req, res){
        const passwordBody = req.body["user-password"]
        const encryptPasswordHash = await hash(passwordBody, 8)

        await UsersData.create({
            id: uuid(),
            name: req.body["user-name"],
            password: encryptPasswordHash,
            avatar: req.body.avatar,
            email_contact_link: req.body["email-contact-link"],
            description: req.body["user-description"]
        })

        return res.render("Register")
    },
    async registerObservation(req, res){

        await ObservationData.create({
            id: uuid(),
            information: req.body.information,
            name: req.body["observation-name"]
        })

        return res.render("Register")
    },
    async registerSite(req, res){

        await SiteData.create({
            id: uuid(),
            name: req.body["site-name"],
            link: req.body["site-link"],
            category: req.body["site-category"]
        })

        return res.render("Register")
    },

    //atualização de observação/usuario/sites 
    async updateUser(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["user-name"],
            avatar: req.body.avatar,
            email_contact_link: req.body["email-contact-link"],
            description: req.body["user-description"]
        }

        await UsersData.update(bodyData, id)

        return res.render("UpdateRegisters")
    },  
    async updateObservation(req, res){

        const id = req.params.id

        const bodyData = {
            information: req.body.information,
            name: req.body["observation-name"]
        }

        await ObservationData.update(bodyData, id)

        return res.render("UpdateRegisters")
    },   
    async updateSite(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["site-name"],
            link: req.body["site-link"],
            category: req.body["site-category"]
        }

        await SiteData.update(bodyData, id)

        return res.render("UpdateRegisters")
    },

    //consultar registro unico
    async consultUser(req, res){
        const data =  req.body["user-name"]
        

        const dataResult = await UsersData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowUser", {dataResult: dataResult})
    },
    async consultObservation(req, res){
        const data = req.body["observation-name"]
        
        const dataResult = await ObservationData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowObservation", {dataResult: dataResult})
    },
    async consultSite(req, res){
        const data =  req.body["site-name"]
    
        const dataResult = await SiteData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowSite", {dataResult: dataResult})
    },

    //deletar de observação/usuario/sites  
    async deleteUser(req, res){
        const id = req.params.id;

        await UsersData.delete(id)

        return res.render("UpdateRegisters")
    },
    async deleteObservation(req, res){
        const id = req.params.id;

        await ObservationData.delete(id)

        return res.render("UpdateRegisters")
    },
    async deleteSite(req, res){
        const id = req.params.id;

        await SiteData.delete(id)

        return res.render("UpdateRegisters")
    }
}
