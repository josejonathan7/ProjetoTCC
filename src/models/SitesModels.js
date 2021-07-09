const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const sites = await db.all(`SELECT * FROM tb_sites ORDER BY name`)

        await db.close()

        return sites.map(sites => ({
            id: sites.id,
            name: sites.name,
            link:  sites.link,
            category: sites.category
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_sites (
            id,
            name, 
            link,
            category) 
            VALUES (
            "${newRegister.id}",
            "${newRegister.name}",
            "${newRegister.link}",
            "${newRegister.category}"
        )`) 

        await db.close()
    },
    async delete(id){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_sites WHERE id = "${id}"`)

        await db.close()
    },
    async update(updateSite, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_sites SET name = "${updateSite.name}", 
        link = "${updateSite.link}", category = "${updateSite.category}" WHERE id = "${Id}"
        `)

        await db.close()
    },
    async getForName(name){

        const db = await DataBase()

        const site = await db.all(`SELECT * FROM tb_sites WHERE name = "${name}"`)

        await db.close()

        return site.map(site => ({
            id: site.id,
            name: site.name,
            link:  site.link,
            category: site.category
        }))
    }
}