//defaults
const DEFAULT_SIZE =16;

//changing pen color
let color ='gray'; 

const container = document.querySelector('.grid-container');
const button = document.querySelector('button'); //size button
const pen = document.querySelector('#pen-color'); //user choice color
const clear = document.querySelector('#clear');
const colorButtons = document.querySelectorAll('.color-choice');
const gridItem1 = document.createElement('div');
const eraser = document.querySelector('#eraser');
gridItem1.classList.add('grid-item');

colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
clear.onclick = () => clearGrid();
pen.oninput = (e) => {color = e.target.value;};
button.addEventListener('click', () => {
    let size = prompt("please enter size", 16);
    makeGrid(size);
});

function changeColor(e){
    switch (e.target.id) { 
        case 'gray':
            color = 'gray';
            break;
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'eraser':
            color = 'eraser';
            break;
    } 
}

function clearGrid(){
    var gridItems = container.querySelectorAll('div');
    gridItems.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}
function makeGrid(size){
    container.style.gridTemplateColumns= `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i =0; i<size*size; i++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mouseover', colorGrid);
        container.appendChild(gridItem);
    }
}
function colorGrid(e){
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('gray');
            break;  
        case 'gray':
            shadowColor(this);
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('gray');
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('gray');
            break;
    } 
}
function shadowColor(this1){
    if (this1.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(this1.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this1.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            this1.classList.add('gray');
        }
    } else if (this1.classList == 'gray' && this1.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        this1.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
}

window.onload = () => {
    makeGrid(DEFAULT_SIZE)
}