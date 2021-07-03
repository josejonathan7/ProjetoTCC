const UsersData = require('../models/UsersModels')
const ContactData = require('../models/ContactModels')
const ObservationData = require('../models/ObservationModels')
const SiteData = require('../models/SitesModels')
const { hash, compare } = require('bcrypt')
const { v4 } = require('uuid')
const uuid = v4;

module.exports = {
    //acessando as páginas de criação, atualização, e deletar registros
    async accesFormNew(req, res){
        
        const user = req.body["user-name"]
        const password = req.body["user-password"]

        const data = await UsersData.getForName(user)        

        const consults = data[0]        

        try {

            async function authenticate(consults){

                if(!consults.name || consults.name == undefined){
                    throw new Error("Login/Senha inválido!")
                }

                const passwordAuthenticate = await compare(password, consults.password)
        
                if(!passwordAuthenticate){
                    throw new Error("Login/Senha inválido!")
                }

            }

            authenticate(consults)

        } catch (error) {
            
            return res.status(401).send(error.message)
        }


    

        return res.render("Register", {userData: data})
    },
    accesFormUpdate(req, res){
        return res.render("UpdatedRegisters")
    },



    //criação de novo contato/observação/usuario/sites 
    async registerContact(req, res){
        
        await ContactData.create({
            id: uuid(),
            name: req.body["contact-name"],
            link: req.body["contact-link"],
            description: req.body["contact-description"]
        })

        return res.render("Register")
    },
    async registerUsers(req, res){
        const passwordBody = req.body["user-password"]
        const encryptPasswordHash = await hash(passwordBody, 8)

        await UsersData.create({
            id: uuid(),
            name: req.body["user-name"],
            password: encryptPasswordHash,
            avatar: req.body.avatar,
            email_contact_link: req.body["email-contact-link"]
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
            link: req.body["site-link"]
        })

        return res.render("Register")
    },

    //atualização de contato/observação/usuario/sites
    async updatedContact(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["contact-name"],
            link: req.body["contact-link"],
            description: req.body["contact-description"]
        }

        await ContactData.update(bodyData, id)

        return res.render("UpdatedRegisters")
    },  
    async updatedUser(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["user-name"],
            password: req.body["user-password"],
            avatar: req.body.avatar,
            email_contact_link: req.body["email-contact-link"]
        }

        await UsersData.update(bodyData, id)

        return res.render("UpdatedRegisters")
    },  
    async updatedObservation(req, res){

        const id = req.params.id

        const bodyData = {
            information: req.body.information,
            name: req.body["observation-name"]
        }

        await ObservationData.update(bodyData, id)

        return res.render("UpdatedRegisters")
    },   
    async updatedSite(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["site-name"],
            link: req.body["site-link"]
        }

        await SiteData.update(bodyData, id)

        return res.render("UpdatedRegisters")
    },

    //consultar registro unico
    async consultContact(req, res){
        const data = {
           name: req.body["contact-name"]
        }

        const dataResult = await ContactData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowContact", {dataResult: dataResult})
    },
    async consultUser(req, res){
        const data = {
           name: req.body["user-name"]
        }

        const dataResult = await UsersData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowUser", {dataResult: dataResult})
    },
    async consultObservation(req, res){
        const data = {
           name: req.body["observation-name"]
        }

    
        const dataResult = await ObservationData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowObservation", {dataResult: dataResult})
    },
    async consultSite(req, res){
        const data = {
           name: req.body["site-name"]
        }

    
        const dataResult = await SiteData.getForName(data)

        return res.render("updateDelete/UpdateDeleteShowSite", {dataResult: dataResult})
    },




    //deleção de contato/observação/usuario/sites
    async deleteContact(req, res){
        const id = req.params.id;

        await ContactData.delete(id)

        return res.render("UpdatedRegisters")
    },  
    async deleteUser(req, res){
        const id = req.params.id;

        await UsersData.delete(id)

        return res.render("UpdatedRegisters")
    },
    async deleteObservation(req, res){
        const id = req.params.id;

        await ObservationData.delete(id)

        return res.render("UpdatedRegisters")
    },
    async deleteSite(req, res){
        const id = req.params.id;

        await SiteData.delete(id)

        return res.render("UpdatedRegisters")
    }
}