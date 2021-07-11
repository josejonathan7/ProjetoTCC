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