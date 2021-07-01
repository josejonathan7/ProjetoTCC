const UsersData = require('../models/UsersModels')
const ContactData = require('../models/ContactModels')
const ObservationData = require('../models/ObservationModels')
const SiteData = require('../models/SitesModels')

module.exports = {
    //acessando as páginas de criação, atualização, e deletar registros
    accesFormNew(req, res){
        return res.render("Register")
    },
    accesFormDelete(req, res){
        return res.render("DeleteRegisters")
    },
    accesFormUpdate(req, res){
        return res.render("UpdatedRegisters")
    },

    //criação de novo contato/observação/usuario/sites 
    async registerContact(req, res){
        
        await ContactData.create({
            name: req.body["contact-name"],
            link: req.body["contact-link"],
            description: req.body["contact-description"]
        })

        return res.render("Register")
    },
    async registerUsers(req, res){

        await UsersData.create({
            name: req.body["user-name"],
            password: req.body["user-password"],
            avatar: req.body.avatar,
            email_contact_link: req.body["email-contact-link"]
        })

        return res.render("Register")
    },
    async registerObservation(req, res){

        await ObservationData.create({
            information: req.body.information,
            name: req.body["observation-name"]
        })

        return res.render("Register")
    },
    async registerSite(req, res){

        await SiteData.create({
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

        return res.render("update/UpdateShowContact", {dataResult: dataResult})
    },
    async consultUser(req, res){
        const data = {
           name: req.body["user-name"]
        }

        const dataResult = await UsersData.getForName(data)

        return res.render("update/UpdateShowUser", {dataResult: dataResult})
    },
    async consultObservation(req, res){
        const data = {
           name: req.body["observation-name"]
        }

    
        const dataResult = await ObservationData.getForName(data)

        return res.render("update/UpdateShowObservation", {dataResult: dataResult})
    },
    async consultSite(req, res){
        const data = {
           name: req.body["site-name"]
        }

    
        const dataResult = await SiteData.getForName(data)

        return res.render("update/UpdateShowSite", {dataResult: dataResult})
    },




    //deleção de contato/observação/usuario/sites
    async deleteContact(req, res){
        const name = req.body["contact-name"];

        await ContactData.delete(name)

        return res.render("DeleteRegisters")
    },  
    async deleteUser(req, res){
        const name = req.body["user-name"];

        await UsersData.delete(name)

        return res.render("DeleteRegisters")
    },
    async deleteObservation(req, res){
        const name = req.body["observation-name"];

        await ObservationData.delete(name)

        return res.render("DeleteRegisters")
    },
    async deleteSite(req, res){
        const name = req.body["site-name"]

        await SiteData.delete(name)

        return res.render("DeleteRegisters")
    }
}