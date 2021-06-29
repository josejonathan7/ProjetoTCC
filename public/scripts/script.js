

const Utils = {
    currentPage(Page1){
        let i= document.location()     
        let currentPage;

        for(i=0; i<=2; i++){
        
            if(Page1){
                currentPage = 1;
            }else {
            currentPage = 2;
            }

            if(currentPage == i){
                const addClass = document.querySelectorAll('li.page-item');

                addClass[i].classList.add('active')
            }

        }
    }
}
