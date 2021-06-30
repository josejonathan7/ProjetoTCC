const DataBase = require('../database/config')

module.exports = {
    async get(){
        const db = await DataBase()

        const users = await db.all(`SELECT name, avatar, email_contact_link FROM tb_users`)

        await db.close()

        return users.map(users => ({
            name: users.name,
            avatar: users.avatar,
            email_contact_link: users.email_contact_link
        }))
    },
    async create(newRegister){
        const db = await DataBase()

        await db.run(`INSERT INTO tb_users (
            name, 
            password,
            avatar,
            email_contact_link) 
            VALUES (
            "${newRegister.name}", 
            "${newRegister.password}",
            "${newRegister.avatar}",
            "${newRegister.email_contact_link}"
            );
        `)

        await db.close()
    },
    async delete(name){
        const db = await DataBase()

        await db.run(`DELETE FROM tb_users WHERE name = "${name}"`)

        await db.close()
    },
    async update(updatedUsers, id){
        const db = await DataBase()

        await db.run(`UPDATED tb_users SET name = "${updatedUsers.name}",
        password = "${updatedUsers.password}",
        avatar = "${updatedUsers.avatar}",
        email_contact_link = "${newRegister.email_contact_link}" WHERE id = ${id}
        `)

        await db.close()
    }
}