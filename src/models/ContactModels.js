
let data = [
    {
        id: "string",
        name: "nome",
        link: "link",
        description: "descrição"
    }
]

module.exports = {
    get(){
        return data
    },
    create(newRegister){  
        data.push(newRegister)
   }
}