// Get deck
const deck = document.querySelector('.deck');
// Get list of cards
const cards = [].slice.call(deck.children);
// Create list of card symbols
const cardSymbols = ['js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less',
    'js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less'];

// List of opened cards
const openedCards = [];

function checkMatch(event) {
    if (event.propertyName.includes('transform')) {
        const length = openedCards.length;
        if (length >= 2 && length % 2 == 0) {
            const last = openedCards[length - 1];
            const preLast = openedCards[length - 2];
            if (last.firstElementChild.classList.toString() ===
                preLast.firstElementChild.classList.toString()) {
                matchCard(last);
                matchCard(preLast);
            } else {
                openedCards.pop();
                openedCards.pop();
                setTimeout(() => {
                    closeCard(last)
                    closeCard(preLast)
                }, 300);
            }

            if (openedCards.length === cardSymbols.length) {
                // TODO: Game won! Show modal and results. Offer replay.
            }
        }
    }
}

// Add symbols to cards
cards.forEach((card, index) => {
    const symbol = `fa-${cardSymbols[index]}`;
    card.firstElementChild.classList.add(symbol);
});



/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/


// Shuffle function from http://stackoverflow.com/a/2450976
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

// Function to add 'open' & 'show' classes to card
function openCard(event) {
    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('card')) {
        target = parent;
    }

    if (!openedCards.includes(target)) {
        target.classList.add('open', 'show');
        openedCards.push(target);
    }
}

// Function to removing 'open' & 'show' classes to card
function closeCard(card) {
    card.classList.remove('open', 'show')
}

// Function to add 'match' class to card
function matchCard(card) {
    card.classList.add('match')
}

// Click event listener attached to cards
deck.addEventListener('click', openCard, true);

cards.forEach(card => card.addEventListener('transitionend', checkMatch));

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
