const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const games = await db.all(`SELECT * FROM tb_games ORDER BY name`)

        await db.close()

        return games.map(games => ({
            id: games.id,
            name: games.name,
            link:  games.link,
            image:  games.image
        }))

    },
    
    async getLimit(start, recordsPerPage){

        
        const db = await DataBase()

        const games = await db.all(`SELECT * FROM tb_games ORDER BY name LIMIT ${start}, ${recordsPerPage}`)

        await db.close()

        return games.map(games => ({
            id: games.id,
            name: games.name,
            link:  games.link,
            image:  games.image
        }))

    },
    async countRow(){
        
        const db = await DataBase()

        const total = await db.all(`SELECT COUNT (*) FROM tb_games`)

        await db.close()


        return total[0]["COUNT (*)"];
    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_games (
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

        await db.run(`DELETE FROM tb_games WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedGames, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_games SET name = "${updatedGames.name}", 
        link = "${updatedGames.link}",
        image = "${updatedGames.image}" WHERE id = ${Id}
        `)

        await db.close()
    },
    async getForName(info){

        const db = await DataBase()

        const game = await db.all(`SELECT * FROM tb_games WHERE name = "${info.name}"`)

        await db.close()

        return game.map(game => ({
            id: game.id,
            name: game.name,
            link: game.link,
            image: game.image
        }))
    }
}