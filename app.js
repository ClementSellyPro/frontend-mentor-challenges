const projectList = document.querySelector('.projectList');

projectList.addEventListener('wheel', (e) => {
    if(window.innerWidth > 720){
        projectList.scrollLeft += e.deltaY;
    }
});