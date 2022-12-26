//defaults
const DEFAULT_SIZE =16;

//changing pen color
let color ='black'; 
let size = 16;
let mouseDown = false;

const container = document.querySelector('.grid-container');
const button = document.querySelector('button'); //size button
const pen = document.querySelector('#pen-color'); //user choice color
const clear = document.querySelector('#clear');
const colorButtons = document.querySelectorAll('.color-choice');
const gridItem1 = document.createElement('div');
const eraser = document.querySelector('#eraser');
const precise = document.querySelector('#precise');
const hover = document.querySelector('#hover');

hover.onclick = () => hoverPen();
precise.onclick = () => precisePen();
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
clear.onclick = () => clearGrid();
pen.oninput = (e) => {color = e.target.value;};
button.addEventListener('click', () => {
    size = prompt("please enter size", 16);
    makeGrid(size);
});

function hoverPen(){
    const gridItems = container.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.removeEventListener('mouseover', mouseOver);
        gridItem.addEventListener('mouseover', colorGrid);
      });
}
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
    window.location.reload();
    // var gridItems = container.querySelectorAll('div');
    // gridItems.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}
function precisePen(){
    const gridItems = container.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.removeEventListener('mouseover', colorGrid);
        gridItem.onmousedown = (e) => {mouseDown = true; colorGrid(e);};
        gridItem.addEventListener('mouseup', () => mouseDown = false);
        gridItem.addEventListener('mouseover', mouseOver);
    });
}
function mouseOver(e){
    if(mouseDown){
        colorGrid(e)
    }
    else{
        return;
    }
}
function makeGrid(size){
    container.style.gridTemplateColumns= `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i =0; i<size*size; i++){
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mouseover', colorGrid);
        container.appendChild(gridItem);
    }
}

function colorGrid(e){
    switch (color) {
        case 'rainbow':
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;  
        case 'gray':
            shadowColor(e.target);
            break;
        case 'eraser':
            e.target.style.backgroundColor = '#ffffff';
            break;
        case 'black':
            e.target.style.backgroundColor = '#000000';
            break;
        default:
            e.target.style.backgroundColor = color;
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
    } else if (this1.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        this1.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
}

window.onload = () => {
    makeGrid(DEFAULT_SIZE)
}