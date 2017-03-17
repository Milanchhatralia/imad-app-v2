console.log('Loaded!');
var img = document.getElementById("madi");
var moveLeft = 0;
function moveRight() {
    moveLeft = moveLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function click(){
    var interval = setInterval(moveRight, 10);
};