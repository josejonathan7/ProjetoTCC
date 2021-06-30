const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const observation = await db.all(`SELECT * FROM tb_observation`)

        await db.close()

        return observation.map(observation => ({
            id: observation.id,
            information: observation.information,
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSER INTO tb_observation (
            information) 
            VALUES (
            "${newRegister.information}"         
        )`) 

        await db.close()
    },
    async delete(id){

        const db = await DataBase()

        await db.run(`DELETE FROM tb_observation WHERE id = ${id}`)

        await db.close()
    },
    async update(updatedObservation, Id){

        const db = await DataBase()

        await db.run(`UPDATE tb_observation SET information = "${updatedObservation.information}" 
        WHERE id = ${Id}
        `)

        await db.close()
    }
}