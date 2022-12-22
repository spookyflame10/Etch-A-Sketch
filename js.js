const container = document.querySelector('.grid-container');
const button = document.querySelector('button');
const DEFAULTSIZE =16;

button.addEventListener('click', () => {
    let size = prompt("please enter size", 16);
    makeGrid(size);
});

function makeGrid(size){
    container.style.gridTemplateColumns= `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i =0; i<size*size; i++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mouseover', changeColor);
        container.appendChild(gridItem);
    }
}
function changeColor(e){
    this.classList.add('green');
}


window.onload = () => {
    makeGrid(DEFAULTSIZE)
}