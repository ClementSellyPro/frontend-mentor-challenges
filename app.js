const projectList = document.querySelector('.projectList');

projectList.addEventListener('wheel', (e) => {
    if(e.deltaX > 0){
        this.scrollLeft -= 50;
    }else{
        this.scrollLeft += 50;
    }
    console.log(e);
});