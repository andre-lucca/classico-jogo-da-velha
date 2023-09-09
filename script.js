const squares = [...document.querySelectorAll('.square')]
const actualPlayerDisplay = document.querySelector('.actual-player')
const restartButton = document.querySelector('.restart')

let gamingState = 'playing'
let actualPlayer = 'X'

actualPlayerDisplay.textContent = `Jogador atual: ${actualPlayer}`

const winningCombinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

function checkIfHasWinner() {
  return winningCombinations.some(combination => {
    return [
      squares[combination[0]],
      squares[combination[1]],
      squares[combination[2]],
    ].every(square => {
      return getSquareValue(square) === actualPlayer
    })
  })
}

function togglePlayer() {
  actualPlayer = actualPlayer === 'X' ? 'O' : 'X'
  actualPlayerDisplay.textContent = `Jogador atual: ${actualPlayer}`
}

function setSquareState(state, square) {
  square.dataset.state = state
}

function getSquareState(square) {
  return square.dataset.state
}

function setSquareValue(value, square) {
  square.textContent = value
}

function getSquareValue(square) {
  return square.textContent
}

function checkIfIsAllMarked() {
  return squares.every(square => getSquareState(square) === 'marked')
}

function setGamingState(state) {
  gamingState = state
}

function resetGame() {
  for (const square of squares) {
    setSquareState('unmarked', square)
    setSquareValue('', square)
  }

  actualPlayer = 'X'
  actualPlayerDisplay.textContent = `Jogador atual: ${actualPlayer}`
}

for (const square of squares) {
  square.addEventListener('click', () => {
    if (
      square.dataset.state === 'marked' ||
      gamingState === 'finished'
    ) {
      return
    }

    setSquareState('marked', square)
    setSquareValue(actualPlayer, square)

    if (checkIfHasWinner()) {
      setGamingState('finished')
      alert(`O jogador ${actualPlayer} ganhou!`)
      return
    } else if (checkIfIsAllMarked()) {
      setGamingState('finished')
      alert('Deu velha!')
      return
    }

    togglePlayer()
  })
}

restartButton.addEventListener('click', () => {
  resetGame()
  setGamingState('playing')
})

window.addEventListener('keydown', event => {
  const keyMapping = {
    'r': () => {
      resetGame()
      setGamingState('playing')
    },
    '1': () => {
      squares[0].click()
    },
    '2': () => {
      squares[1].click()
    },
    '3': () => {
      squares[2].click()
    },
    '4': () => {
      squares[3].click()
    },
    '5': () => {
      squares[4].click()
    },
    '6': () => {
      squares[5].click()
    },
    '7': () => {
      squares[6].click()
    },
    '8': () => {
      squares[7].click()
    },
    '9': () => {
      squares[8].click()
    }
  }

  if (keyMapping[event.key]) {
    keyMapping[event.key]()
  }
})