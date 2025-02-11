const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = 0
let countDownTimerId = 0 // 🔹 Defini a variável globalmente para evitar erro

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
      score.textContent = result //O textContent obtem o texto do HTML
      hitPosition = null //Assim que ele aumenta o result, o hitPosition se torna nulo, pq aí a pessoa não clica várias vezes
    }
  })
})

function moveMole() { //Move a morsa a cada 0,5 segundos
  timerId = setInterval(randomSquare, 250)
}

moveMole()

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime === 0) { //Se o tempo acabou
    clearInterval(countDownTimerId) // 🔹 Agora a variável está definida antes do uso
    clearInterval(timerId)
    alert('SEU TEMPO ACABOU!!! Sua pontuação foi de ' + result)
  }
}

countDownTimerId = setInterval(countDown, 1000) // 🔹 Agora está definido corretamente antes do uso
