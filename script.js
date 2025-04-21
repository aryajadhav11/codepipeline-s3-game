document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: '❤️', img: '❤️' },
        { name: '❤️', img: '❤️' },
        { name: '⭐', img: '⭐' },
        { name: '⭐', img: '⭐' },
        { name: '🍀', img: '🍀' },
        { name: '🍀', img: '🍀' },
        { name: '☀️', img: '☀️' },
        { name: '☀️', img: '☀️' },
        { name: '🌟', img: '🌟' },
        { name: '🌟', img: '🌟' },
        { name: '🌙', img: '🌙' },  // New symbol pair
        { name: '🌙', img: '🌙' },  // New symbol pair
        { name: '🔥', img: '🔥' },  // New symbol pair
        { name: '🔥', img: '🔥' },  // New symbol pair
        { name: '🍎', img: '🍎' },  // New symbol pair
        { name: '🍎', img: '🍎' },  // New symbol pair
        { name: '🌈', img: '🌈' },  // Additional new symbol pair
        { name: '🌈', img: '🌈' },  // Additional new symbol pair
        { name: '💎', img: '💎' },  // Additional new symbol pair
        { name: '💎', img: '💎' },  // Additional new symbol pair
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-id', i);
            card.textContent = '❓'; // Placeholder symbol
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.textContent = cardArray[cardId].img; // Display the symbol
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board .card');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].textContent = '❓';
            cards[secondCardId].textContent = '❓';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
