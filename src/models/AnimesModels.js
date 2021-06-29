
let data = [
    {
        id: 0,
        name: "11 eyes",
        link:  "https://www.meuanime.com/11-eyes",
        image: "/images/animes/11eyes.jpg"
    },
]

module.exports = {
    get(){
        return data;
    },
    create(newRegister){  
         data.push(newRegister)
    }
}