const DataBase = require('../database/config')

module.exports = {
    async get(){
        
        const db = await DataBase()

        const observation = await db.all(`SELECT * FROM tb_observation`)

        await db.close()

        return observation.map(observation => ({
            id: observation.id,
            information: observation.information,
            name: observation.name
        }))

    },
    async create(newRegister){  

        const db = await DataBase()

        await db.run(`INSERT INTO tb_observation (
            id,
            information,
            name) 
            VALUES (
            "${newRegister.id}",
            "${newRegister.information}",
            "${newRegister.name}"         
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

        await db.run(`UPDATE tb_observation SET information = "${updatedObservation.information}",
        name = "${updatedObservation.name}" 
        WHERE id = ${Id}
        `)

        await db.close()
    },
    async getForName(name){

        const db = await DataBase()

        const observation = await db.all(`SELECT * FROM tb_observation WHERE name = "${name}"`)

        await db.close()

        return observation.map(observation => ({
            id: observation.id,
            information: observation.information,
            name: observation.name
        }))
    }
}