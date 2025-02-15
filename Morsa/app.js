const squares = document.querySelectorAll('.square') //Cria um array com todos os quadrados
const timeLeft = document.querySelector('#time-left') //Pega o tempo
const score = document.querySelector('#score') //Pontuação

let tempo = 60 //tempo de jogo
let result = 0
let hitPosition
let currentTime = tempo
let timerId = 0
let countDownTimerId = 0 // 🔹 Defini a variável globalmente para evitar erro

iniciar.addEventListener('click', () =>{
    iniciar.remove()

    iniciarJogo()
})
function iniciarJogo(){
    function randomSquare() { 
    squares.forEach(square => { /*Função que garante que nenhuma morsa estará nos quadrados */ 
      square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)] // 🔹 Garantindo que não acesse índice inválido
    //Vai gerar uma posição aleatória, tanto que é num array, squares[]
    randomSquare.classList.add('mole') //Adiciona a morsa nesse quadrado

    hitPosition = randomSquare.id //Armazena o id do quadrado
  }

  squares.forEach(square => { //Ele verifica cada quadrado a cada momento
    square.addEventListener('mousedown', () => { //Como é uma função arrow, ele passa o parâmetro quadrado e ouve cada vez que o mouse
      //Passa em cima do quadrado (addEventListener('mousedown')), ou seja, toda vez que clicar ele vai fazer o if
      if (square.id === hitPosition) { //Se o id do quadrado for o mesmo que o clicado ele vai aumentar o result
        result++
        /*square.style.backgroundImage = "url('./broken.png')";*/
        score.textContent = result //O textContent obtem o texto do HTML
        hitPosition = null //Assim que ele aumenta o result, o hitPosition se torna nulo, pq aí a pessoa não clica várias vezes
      }
 
    })
  })

  function moveMole() { //Move a morsa a cada 0,5 segundos
    timerId = setInterval(randomSquare, 450)
  }

  moveMole()

  function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) { //Se o tempo acabou
      clearInterval(countDownTimerId) // 🔹 Agora a variável está definida antes do uso
      clearInterval(timerId)
      alert('SEU TEMPO ACABOU!!! Sua pontuação foi de ' + result)

      //CRIAR UM NOVO BOTÃO
      let novoBotao = document.createElement('button') //Cria um novo botão
      novoBotao.id = 'iniciar' //Atribui o id iniciar a ele, fazendo com que ele tenha as mesmas propriedades do outro
      novoBotao.textContent = "Jogar Novamente" //O texto do botão

      novoBotao.addEventListener('click', ()=>{
        novoBotao.remove();
        iniciarJogo()
        currentTime = tempo
        result = 0;
      })
      novoBotao.addEventListener('click', () =>{
        novoBotao.remove()
      })

      document.getElementById('botao').appendChild(novoBotao)
    }
  }

  countDownTimerId = setInterval(countDown, 1000) // 🔹 Agora está definido corretamente antes do uso
}