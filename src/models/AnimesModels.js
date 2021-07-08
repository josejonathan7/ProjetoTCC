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
    async getLimit(start, recordsPerPage){

        
        const db = await DataBase()

        const animes = await db.all(`SELECT * FROM tb_animes ORDER BY name LIMIT ${start}, ${recordsPerPage}`)

        await db.close()

        return animes.map(animes => ({
            id: animes.id,
            name: animes.name,
            link:  animes.link,
            image:  animes.image
        }))

    },
    async countRow(){
        
        const db = await DataBase()

        const total = await db.all(`SELECT COUNT (*) FROM tb_animes`)

        await db.close()


        return total[0]["COUNT (*)"];
    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_animes (
            id,
            name, 
            link, 
            image) 
            VALUES (
            "${newRegister.id}",
            "${newRegister.name}",
            "${newRegister.link}",
            "${newRegister.image}"
        )`) 

        await db.close()
    },
    async delete(id){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_animes WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedAnime, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_animes SET name = "${updatedAnime.name}", 
        link = "${updatedAnime.link}",
        image = "${updatedAnime.image}" WHERE id = ${Id}
        `)

        await db.close()
    },
    async getForName(name){

        const db = await DataBase()

        const anime = await db.all(`SELECT * FROM tb_animes WHERE name = "${name}"`)

        await db.close()

        return anime.map(anime => ({
            id: anime.id,
            name: anime.name,
            link: anime.link,
            image: anime.image
        }))
    }
}