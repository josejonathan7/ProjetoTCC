const DataBase = require('../database/config')

module.exports = {
    async get(){
        const db = await DataBase()

        const users = await db.all(`SELECT * FROM tb_users`)

        await db.close()

        return users.map(users => ({
            name: users.name,
            password: users.password,
            avatar: users.avatar,
            email_contact_link: users.email_contact_link,
            description: users.description
        }))
    },
    async create(newRegister){
        const db = await DataBase()

        await db.run(`INSERT INTO tb_users (
            id,
            name, 
            password,
            avatar,
            email_contact_link,
            description) 
            VALUES (
            "${newRegister.id}",
            "${newRegister.name}", 
            "${newRegister.password}",
            "${newRegister.avatar}",
            "${newRegister.email_contact_link}",
            "${newRegister.description}"
            );
        `)

        await db.close()
    },
    async delete(id){
        const db = await DataBase()

        await db.run(`DELETE FROM tb_users WHERE id = "${id}"`)

        await db.close()
    },
    async update(updateUsers, id){
        const db = await DataBase()

        await db.run(`UPDATE tb_users SET name = "${updateUsers.name}",
        avatar = "${updateUsers.avatar}",
        email_contact_link = "${updateUsers.email_contact_link}",
        description = "${updateUsers.description}" WHERE id = "${id}"
        `)

        await db.close()
    },
    async getForName(name){

        const db = await DataBase()

        const user = await db.all(`SELECT * FROM tb_users WHERE name = "${name}"`)

        await db.close()

        
            return user.map(user => ({
                id: user.id,
                password: user.password,
                name: user.name,
                avatar: user.avatar,
                email_contact_link: user.email_contact_link,
                description: user.description
            }))
        
    },
    
}