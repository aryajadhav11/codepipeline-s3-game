document.addEventListener('DOMContentLoaded', () => {
  const symbols = ['🍕', '🚀', '🎮', '🐶', '🎵', '🌈', '🔥', '🍩'];
  let cardsArray = [];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  const grid = document.getElementById('game-board');
  const startButton = document.getElementById('start-game');

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    // Reset everything
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];

    // Duplicate and shuffle symbols
    cardsArray = shuffle([...symbols, ...symbols]);
    grid.innerHTML = '';

    // Create cards
    for (let i = 0; i < cardsArray.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
      card.textContent = '?';
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  function flipCard() {
    const id = this.getAttribute('data-id');
    if (cardsChosenId.includes(id) || cardsWon.includes(id)) return;

    this.textContent = cardsArray[id];
    this.classList.add('revealed');
    cardsChosen.push(cardsArray[id]);
    cardsChosenId.push(id);

    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }

  function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1] && firstId !== secondId) {
      cardsWon.push(firstId, secondId);
    } else {
      cards[firstId].textContent = '?';
      cards[secondId].textContent = '?';
      cards[firstId].classList.remove('revealed');
      cards[secondId].classList.remove('revealed');
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardsArray.length) {
      setTimeout(() => alert('🎉 You matched all the symbols!'), 300);
    }
  }

  startButton.addEventListener('click', createBoard);
});
