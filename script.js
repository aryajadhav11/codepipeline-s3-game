document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const statusText = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  function createBoard() {
    board.innerHTML = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      board.appendChild(cell);
    }
  }

  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWin()) {
      statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (!gameState.includes('')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function checkWin() {
    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
  }

  restartBtn.addEventListener('click', createBoard);
  board.addEventListener('click', handleCellClick);

  createBoard(); // initialize on load
});
