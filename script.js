const squares = [...document.querySelectorAll('.square')]

let actualPlayer = 'X'

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

for (const square of squares) {
  square.addEventListener('click', () => {
    if (square.dataset.state === 'marked') {
      return
    }

    setSquareState('marked', square)
    setSquareValue(actualPlayer, square)

    if (checkIfHasWinner()) {
      alert(`O jogador ${actualPlayer} ganhou!`)
      return
    } else if (checkIfIsAllMarked()) {
      alert('Deu velha!')
      return
    }

    togglePlayer()
  })
}