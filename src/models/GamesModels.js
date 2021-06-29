
let data = [
    {
        id: "string",
        name: "nome",
        link: "link",
        image: "imagem"
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