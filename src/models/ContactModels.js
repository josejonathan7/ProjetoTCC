const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const contact = await db.all(`SELECT * FROM tb_contact ORDER BY name`)

        await db.close()

        return contact.map(contact => ({
            id: contact.id,
            name: contact.name,
            link:  contact.link,
            description:  contact.description
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSER INTO tb_contact (
            name, 
            link, 
            description) 
            VALUES (
            "${newRegister.name}",
            "${newRegister.link}",
            "${newRegister.description}"
        )`) 

        await db.close()
    },
    async delete(id){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_contact WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedContact, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_contact SET name = "${updatedContact.name}", 
        link = "${updatedContact.link}",
        description = "${updatedContact.description}" WHERE id = ${Id}
        `)

        await db.close()
    }
}