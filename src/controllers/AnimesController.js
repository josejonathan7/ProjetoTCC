const DataBase = require('../models/AnimesModels')

module.exports = {
    get(req,res){
        const data = DataBase.get()

        return res.render("animes", {data})
    }
}
