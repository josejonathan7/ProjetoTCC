
let data = [
    {
        id: "string",
        name: "nome",
        link: "link",
    }
]
const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const songs = await db.all(`SELECT * FROM tb_songs ORDER BY name`)

        await db.close()

        return songs.map(songs => ({
            id: songs.id,
            name: songs.name,
            link:  songs.link
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSER INTO tb_songs (
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

        await db.run(`DELETE FROM tb_songs WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedSongs, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_songs SET name = "${updatedSongs.name}", 
        link = "${updatedSongs.link}" WHERE id = ${Id}
        `)

        await db.close()
    }
}