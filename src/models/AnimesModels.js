const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const animes = await db.all(`SELECT * FROM tb_animes ORDER BY name`)

        await db.close()

        return animes.map(animes => ({
            id: animes.id,
            name: animes.name,
            link:  animes.link,
            image:  animes.image
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_animes (
            name, 
            link, 
            image) 
            VALUES (
            "${newRegister.name}",
            "${newRegister.link}",
            "${newRegister.image}"
        )`) 

        await db.close()
    },
    async delete(Name){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_animes WHERE name = "${Name}"`)

        await db.close()
    },
    async update(updatedAnime, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_animes SET name = "${updatedAnime.name}", 
        link = "${updatedAnime.link}",
        image = "${updatedAnime.image}" WHERE id = ${Id}
        `)

        await db.close()
    }
}