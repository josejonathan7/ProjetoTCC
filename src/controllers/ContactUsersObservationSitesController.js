const UsersData = require('../models/UsersModels')
const ContactData = require('../models/ContactModels')
const ObservationData = require('../models/ObservationModels')
const SiteData = require('../models/SitesModels')

module.exports = {
    accesForm(req, res){
        return res.render("Register")
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
            avatar: req.body.avatar
        })

        return res.render("Register")
    },
    async registerObservation(req, res){

        await ObservationData.create({
            information: req.body.information
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

        return res.redirect("/Register/" + id)
    },  
    async updatedUser(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["user-name"],
            password: req.body["user-password"],
            avatar: req.body.avatar
        }

        await UsersData.update(bodyData, id)

        return res.redirect("/Register/" + id)
    },  
    async updatedObservation(req, res){

        const id = req.params.id

        const bodyData = {
            information: req.body.information
        }

        await ObservationData.update(bodyData, id)

        return res.redirect("/Register/" + id)
    },   
    async updatedSite(req, res){

        const id = req.params.id

        const bodyData = {
            name: req.body["site-name"],
            link: req.body["site-link"]
        }

        await SiteData.update(bodyData, id)

        return res.redirect("/Register/" + id)
    },

    //deleção de contato/observação/usuario/sites
    async deleteContact(req, res){
        const id = req.params.id;

        await ContactData.delete(id)

        return res.render("Register")
    },  
    async deleteUser(req, res){
        const id = req.params.id;

        await UsersData.delete(id)

        return res.render("Register")
    },
    async deleteObservation(req, res){
        const id = req.params.id;

        await ObservationData.delete(id)

        return res.render("Register")
    },
    async deleteSite(req, res){
        const id = req.params.id

        await SiteData.delete(id)

        return res.render("Register")
    }
}