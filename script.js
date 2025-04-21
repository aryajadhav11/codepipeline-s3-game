document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    const restartBtn = document.getElementById('restart');
    const scoreXText = document.getElementById('score-x');
    const scoreOText = document.getElementById('score-o');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let score = { X: 0, O: 0 };
  
    const winConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
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
  
    function handleClick(e) {
      const cell = e.target;
      const index = cell.getAttribute('data-index');
  
      if (gameState[index] !== '' || !gameActive) return;
  
      makeMove(index, currentPlayer);
  
      if (checkWin(currentPlayer)) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        score[currentPlayer]++;
        updateScore();
        gameActive = false;
        return;
      }
  
      if (!gameState.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
  
      if (currentPlayer === 'O') {
        setTimeout(() => computerMove(), 500);
      }
    }
  
    function makeMove(index, player) {
      const cell = document.querySelector(`.cell[data-index='${index}']`);
      gameState[index] = player;
      cell.textContent = player;
      cell.classList.add(player.toLowerCase());
    }
  
    function computerMove() {
      if (!gameActive) return;
  
      const emptyCells = gameState
        .map((val, i) => val === '' ? i : null)
        .filter(i => i !== null);
  
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
      makeMove(randomIndex, 'O');
  
      if (checkWin('O')) {
        statusText.textContent = `💻 Player O (Computer) wins!`;
        score['O']++;
        updateScore();
        gameActive = false;
      } else if (!gameState.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function checkWin(player) {
      return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === player && gameState[b] === player && gameState[c] === player;
      });
    }
  
    function updateScore() {
      scoreXText.textContent = score.X;
      scoreOText.textContent = score.O;
    }
  
    board.addEventListener('click', handleClick);
    restartBtn.addEventListener('click', () => {
      createBoard();
    });
  
    createBoard();
  });
