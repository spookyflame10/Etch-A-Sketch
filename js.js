const container = document.querySelector('.grid-container');

function makeGrid(size){
    container.style.gridTemplateColumns= `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i =0; i<16*16; i++){
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
    makeGrid(16)
  }