
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

        await db.run(`INSERT INTO tb_songs (
            id,
            name, 
            link) 
            VALUES (
            "${newRegister.id}",
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
    },
    async getForName(info){

        const db = await DataBase()

        const song = await db.all(`SELECT * FROM tb_songs WHERE name = "${info.name}"`)

        await db.close()

        return song.map(song => ({
            id: song.id,
            name: song.name,
            link:  song.link
        }))
    }
}