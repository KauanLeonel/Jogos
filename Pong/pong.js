const canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d'); //Trabalhar com um jogo em 2d
canvas.style.background = 'black'
let dirX = true, dirY = true;
var pad1YPos, pad2YPos
var docHeight, docWidth; //setar os tamanhos
var WKeyState = false
var SKeyState = false
var OKeyState = false
var LKeyState = false
var Score1 = 0, Score2 = 0
var requestFrame = false


document.addEventListener('keydown', (e) =>{
    if(e.key == 'w') WKeyState = true;
    if(e.key == 's') SKeyState = true;
    if(e.key == "ArrowUp") OKeyState = true;
    if(e.key == 'ArrowDown') LKeyState = true;
    if(e.key == 'enter'){
        if(!requestFrame){
            var ball = new Obj(docWidth /2, docHeight/2 , 10)
            ball.desenharBola()
                requestFrame = true;
                moverBolaLoop(ball);
            
        }
    }
})

document.addEventListener('keyup', (e) =>{
    if(e.key == 'w') WKeyState = false;
    if(e.key == 's') SKeyState = false;
    if(e.key == "ArrowUp") OKeyState = false;
    if(e.key == 'ArrowDown') LKeyState = false;
})



function canvasSetup(){
    docHeight = window.innerHeight; //A altura é o tamanho da janela
    docWidth = window.innerWidth; // A largura é do tamanho da janela
    canvas.height = docHeight;
    canvas.width = docWidth;
    pad2Ypos = docHeight/2;
    pad1Ypos = docHeight/2
    pad1YPos = docHeight / 2;  // Corrigido
    pad2YPos = docHeight / 2;  // Corrigido
    dirX = aleatorio()
    dirY = aleatorio()
    desenharPads(pad1YPos, pad2Ypos);
    var ball = new Obj(docWidth/2, docHeight/2, 10)
    ball.desenharBola();
    ctx.fillStyle = 'white'
    ctx.fillRect(docWidth / 2 - 5, 0, 10, docHeight)
    ctx.fill()
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
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius, this.height)
    
    }

    desenharBola(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }
     moverBola(){
        ctx.clearRect(0, 0, docWidth + 100, docHeight)
        desenharPads(pad1YPos, pad2YPos)
        if(dirY) this.y += this.speed;
        if(dirX) this.x += this.speed;
        if(!dirX) this.x -= this.speed;
        if(!dirY) this.y -= this.speed;
        ctx.fillStyle = 'white'
        ctx.fillRect(docWidth/2 - 5, 0 , 10, docHeight)
        ctx.fill()
        this.desenharBola()
        checarColisao(this.y, this.x);

        if(this.y < 0) dirY = true;
        if(this.y > docHeight) dirY = false;

        if(this.x >docWidth){

            dirX = aleatorio()
            dirY = aleatorio()
            this.x = docWidth/2;
            this.y = docHeight/2;
            Score1++;
            requestFrame = false;
            ctx.clearRect(0, 0, docWidth + 100, docHeight)
            desenharPads(pad1YPos, pad2YPos)
            ctx.fillStyle = 'white'
            ctx.fillRect(docWidth / 2 - 5, 0, 10, docHeight)
            ctx.fill()
            this.desenharBola()
        }
        if(this.x < 0){

            dirX = aleatorio()
            dirY = aleatorio()
            this.x = docWidth/2;
            this.y = docHeight/2;
            Score2++;
            requestFrame = false;
            ctx.clearRect(0, 0, docWidth + 100, docHeight)
            desenharPads(pad1YPos, pad2YPos)
            ctx.fillStyle = 'white'
            ctx.fillRect(docWidth / 2 - 5, 0, 10, docHeight)
            ctx.fill()
            this.desenharBola()
    }
    
}}

function moverBolaLoop(ball){
    ball.moverBola();
    if(requestFrame) requestAnimationFrame(() => {moverBolaLoop(ball)})

    if(WKeyState && pad1YPos > 0 ) pad1YPos -= 10;
    if(SKeyState && pad1YPos < window.innerHeight - 100 ) pad1YPos += 10;
    if(OKeyState && pad2YPos > 0 ) pad2YPos -= 10;
    if(LKeyState && pad2YPos < window.innerHeight - 100 ) pad2YPos += 10;
}
canvas.onclick = () =>{
    if(!requestFrame){
        var ball = new Obj(docWidth/2, docHeight/2, 10)
    ball.desenharBola();
    requestFrame = true 
    moverBolaLoop(ball)
    }
}





function checarColisao(ballY, ballX){
    ballX = ballX - 5;
    let loclPad1xPos = 50 + 12.5
    distance1 = Math.abs(ballX - loclPad1xPos)

    if (distance1 < 5 && ballY > (pad1YPos - 50) && pad1YPos + 100 > ballY) dirX = true;
    ballX +=10
    let loclPad2xPos = docWidth - 50;
    distance2 = Math.abs(ballX - loclPad2xPos)
    if (distance2 < 5 && ballY > (pad1YPos - 50) && pad2YPos + 100 > ballY) dirX = false;

}

function aleatorio(){
    return Boolean(Math.floor(Math.random() * 2))
}

canvasSetup()