//defaults
const DEFAULT_SIZE =16;

//changing
let color ='black'; // default pen color
let rainbowPen = false;

const container = document.querySelector('.grid-container');
const button = document.querySelector('button');
const eraser = document.querySelector('button.eraser');
const pen = document.querySelector('#pen-color');
const clear = document.querySelector('#clear');
const rainbow = document.querySelector('#rainbow');

rainbow.onclick = () => {rainbowPen = true; return};
clear.onclick = () => reloadGrid();
pen.oninput = (e) => {rainbowPen = false; color = e.target.value;};
eraser.onclick = () => {rainbowPen = false; color = 'white';};
button.addEventListener('click', () => {
    let size = prompt("please enter size", 16);
    makeGrid(size);
});

function reloadGrid(){
    clearGrid();
    makeGrid(DEFAULT_SIZE);
}
function clearGrid(){
    container.innerHTML = '';
}
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
    if(rainbowPen)
        this.style.backgroundColor = getRandomColor();
    else
        this.style.backgroundColor = color;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
window.onload = () => {
    makeGrid(DEFAULT_SIZE)
}