const emojis = ["😺", "😺", "🐶", "🐶", "🐼", "🐼", "🐸", "🐸"];
let shuffled = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function startGame() {
  shuffled = emojis.sort(() => 0.5 - Math.random());
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  moves = 0;
  document.getElementById("moves").textContent = moves;

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener("click", revealCard);
    board.appendChild(card);
  });
}

function revealCard() {
  if (lockBoard || this.classList.contains("revealed")) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("revealed");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    moves++;
    document.getElementById("moves").textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    } else {
      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("revealed");
        secondCard.classList.remove("revealed");
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 800);
    }
  }
}

startGame();
