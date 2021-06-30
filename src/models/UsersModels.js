const DataBase = require('../database/config')

module.exports = {
    async get(){
        const db = await DataBase()

        const users = await db.all(`SELECT name, avatar FROM tb_users`)

        await db.close()

        return users.map(users => ({
            name: users.name,
            avatar: users.avatar
        }))
    },
    async create(newRegister){
        const db = await DataBase()

        await db.run(`INSERT INTO tb_users (name, 
            password,
            avatar) 
            VALUES (name = "${newRegister.name}", 
            password = "${newRegister.password}",
            avatar = "${newRegister.avatar}")
        `)

        await db.close()
    },
    async delete(id){
        const db = await DataBase()

        await db.run(`DELETE FROM tb_users WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedUsers, id){
        const db = await DataBase()

        await db.run(`UPDATED tb_users SET name = "${updatedUsers.name}",
        password = "${updatedUsers.password}",
        avatar = "${updatedUsers.avatar}" WHERE id = ${id}
        `)

        await db.close()
    }
}