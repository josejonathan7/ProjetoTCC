const Modal = {
    open(){
        document.querySelector('div.modal-delete').classList.add('active')
    },
    close(){
        document.querySelector('div.modal-delete').classList.remove('active')
    },
    openAuthenticate(){
        document.querySelector('div.modal-config-site').classList.add('active')
    },
    closeAuthenticate(){
        document.querySelector('div.modal-config-site').classList.remove('active')
    }
}


const Url = {
    animeUrl(){
        const urlParams = new URLSearchParams(location.search.substring(1))

        //página atual
        const current = urlParams.get("page") ? urlParams.get("page") : 1  

        //quantidade de registro por página
        let recordsPerPage = 27

        //total de registro
        const totalRows = document.querySelector("#numberRows").getAttribute("value")

        //quantidade de paginas 
        let numberOfPages =(totalRows / recordsPerPage)

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;


    document.querySelector("#value-button").setAttribute("title", `${start}`)

        return {start, recordsPerPage, numberOfPages}

        
    }
}

console.log(document.querySelector('#value-button'))