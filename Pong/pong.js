const canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); //Trabalhar com um jogo em 2d
var docHeight, docWidth; //setar os tamanhos

function canvasSetup(){
    docHeight = window.innerHeight; //A altura é o tamanho da janela
    docWidth = window.innerWidth; // A largura é do tamanho da janela
    canvas.height = docHeight;
    canvas.width = docWidth;
    pad2Ypos = docHeight/2;
    pad1Ypos = docHeight/2
    desenharPads(pad1YPos, pad2Ypos);
    var ball = new Obj(docWidth/2, docHeight/2, 10)
    ball.desenharBola();
}

function desenharPads(pad1YPos, pad2YPos){
    var pad1 = new Obj(50, pad1YPos, 25, 100); //Criar o pad1
    var pad2 = new Obj(docWidth - 50, pad2YPos, 25, 100);  //Criar pad2
    pad1.drawPad();
    pad2.drawPad();
}

class Obj {
    constructor(x, y, radius, height){
        this.color = 'White';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.height = height;
        this.speed = 8;
    }

    drawPad(){
        ctx.fillRect(this.x, this.y, this.radius, this.height)
        ctx.fillStyle = this.color;
    }

    desenharBola(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }
}

