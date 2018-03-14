/* ----------- Variable declarations ----------- */

const stars = document.querySelectorAll('.star');
const movesTxt = document.querySelector('.moves');
const hoursTxt = document.querySelector('.hours');
const minsTxt = document.querySelector('.minutes');
const secondsTxt = document.querySelector('.seconds');
const restartBtn = document.querySelector('#restart');

// Get deck
const deck = document.querySelector('.deck');
// Get list of cards
const cards = [].slice.call(deck.children);
// Create list of card symbols
let cardSymbols = ['js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less',
    'js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less'];

// List of opened cards
let openCards = [];

// Number of start
let rating = 3;

// Number of wrong moves
let moves = 0;

// Number of matches. Max is 8
let matches = 0;

// Total seconds elapsed since game start
let elapsedSeconds = 0;

// Timer
let timer = undefined;

// Game status
let gameStarted = false;

/* ----------- Event listeners ----------- */

// Click event listener attached to cards
deck.addEventListener('click', openCard);

// Click event listener attached to restart button
restartBtn.addEventListener('click', restartGame);

/* ----------- Main game logic ----------- */

// Start new game
restartGame();

// Function to add 'open' & 'show' classes to card
function openCard(event) {

    startTimer();

    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('card')) {
        target = parent;
    }

    if (!openCards.includes(target)) {
        target.classList.add('open', 'show');
        openCards.push(target);
        checkMatch();
    }
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(setTime, 1000);
    }
}

function stopTimer() {
    gameStarted = false;
    clearInterval(timer);
}

function setTime() {
    let remainderSeconds = ++elapsedSeconds;
    hoursTxt.textContent = stringifyTime(parseInt(remainderSeconds / 3600));
    remainderSeconds = remainderSeconds % 3600;
    minsTxt.textContent = stringifyTime(parseInt(remainderSeconds / 60));
    remainderSeconds = remainderSeconds % 60;
    secondsTxt.textContent = stringifyTime(remainderSeconds);
}

// Function to remove 'open' & 'show' classes to card
function closeCard(card) {
    setTimeout(() => {
        card.classList.remove('open', 'show');
    }, 500)
}

// Function to add 'match' class to card
function matchCard(card) {
    setTimeout(() => {
        card.classList.add('match', 'bounceIn');
    }, 500)
}

function checkMatch() {
    const length = openCards.length;
    if (length === 2) {

        const last = openCards[1];
        const preLast = openCards[0];

        if (last.children[0].classList.toString() ===
            preLast.children[0].classList.toString()) {
            incrementMatches();
            matchCard(last);
            matchCard(preLast);
        } else {
            closeCard(last);
            closeCard(preLast);
        }
        incrementMove();
        openCards = [];
        checkGameWin();
    }
}

function incrementMove() {
    moves++;
    movesTxt.textContent = moves;
    determineRating();
}

function determineRating() {
    if (moves > 16 && moves <= 24) {
        rating--;
        stars[2].classList.add('empty-star');
    } else if (moves > 25 && moves <= 32) {
        rating--;
        stars[1].classList.add('empty-star');
    } else if (moves > 33) {
        rating--;
        stars[0].classList.add('empty-star');
    }
}

function incrementMatches() {
    matches++;
}

function checkGameWin() {
    if (matches === 8) {
        // Show modal
    }
}

function restartGame() {
    resetScore();
    resetDeck();
}

function resetScore() {

    // Reset rating
    rating = 3;
    stars.forEach(star => removeClassByPrefix(star, 'empty-star'));

    // Reset moves
    moves = 0;
    movesTxt.textContent = moves;

    // Reset matches
    matches = 0;

    // Reset time
    elapsedSeconds = 0;
    hoursTxt.textContent = '00';
    minsTxt.textContent = '00';
    secondsTxt.textContent = '00';

    // Stop timer
    stopTimer();
}

function resetDeck() {

    // Clear openedCards array
    openCards = [];

    // Shuffle symbols
    cardSymbols = shuffle(cardSymbols);

    // Iterate over all cards
    cards.forEach((card, index) => {
        // Remove classes
        card.classList.remove('open', 'show', 'match', 'bounceIn');
        // Remove symbols
        removeClassByPrefix(card.children[0], 'fa-');

        // Attach new symbols to cards
        const symbol = `fa-${cardSymbols[index]}`;
        card.children[0].classList.add(symbol);
    });
}

/* ----------- Helper functions ----------- */

/*
* @description Removes element's class based on pattern
*/
function removeClassByPrefix(el, prefix, replace = '') {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
    el.className = el.className.replace(regx, replace);
    return el;
}

/*
* @description Shuffle elements of array
*
* Shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* @description Convert min, hour & seconds into string
*
* Shuffle function from http://stackoverflow.com/a/2450976
*/
function stringifyTime(val) {
    var valString = val + '';
    return valString.length >= 2 ? `${val}` : `0${val}`;
}