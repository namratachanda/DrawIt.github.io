const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 100;

let context = canvas.getContext("2d");
let start_backgroundColor = "black";
context.fillStyle =start_backgroundColor;
context.fillRect(0,0,canvas.width,canvas.height);

let draw_color = "white";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let indexU = -1;

function change_color(element){
    const list = document.getElementsByClassName("active")[0];
    list.classList.remove("active");
    draw_color = element.style.background;
    element.classList.add("active");
}

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseout",stop,false);
canvas.addEventListener("mouseup",stop,false);


function start(event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop) ;
    event.preventDefault();                
}

function draw(event){
    if(is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop) ;
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();    
    }
    event.preventDefault(); 
}

function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    if(event.type != 'mouseout'){
        event.preventDefault(); 
        restore_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        indexU+=1;
    }
}

function clear_canvas(){
    context.fillStyle = start_backgroundColor;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);
    restore_array=[];
    indexU=-1;
}

function undo_text(){
    if(indexU <= 0){
        clear_canvas();
    }
    else{
        indexU-=1;
        restore_array.pop();
        context.putImageData(restore_array[indexU],0,0);
    }
}

document.getElementById("name").addEventListener('change', SetX);

function SetX(){
   var x =  this.value
}

function download(){
    var canvas = document.getElementById("myCanvas");
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL(`Image/png`);
    anchor.download = "Image.png";
    anchor.click();
}