const projectList = document.querySelector('.projectList');

projectList.addEventListener('wheel', (e) => {
    if(window.innerWidth > 1000){
        projectList.scrollLeft += e.deltaY ;
    }
});