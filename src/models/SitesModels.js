const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const sites = await db.all(`SELECT * FROM tb_sites ORDER BY name`)

        await db.close()

        return sites.map(sites => ({
            id: sites.id,
            name: sites.name,
            link:  sites.link
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_sites (
            name, 
            link) 
            VALUES (
            "${newRegister.name}",
            "${newRegister.link}"
        )`) 

        await db.close()
    },
    async delete(id){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_sites WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedSite, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_sites SET name = "${updatedSite.name}", 
        link = "${updatedSite.link}" WHERE id = ${Id}
        `)

        await db.close()
    }
}