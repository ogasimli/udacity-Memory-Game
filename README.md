# Memory Game Project

## Table of Contents

* [Game Rules](#game-rules)
* [Technical](#technical)
* [Credits](#credits)
* [Tools Used](#tools-used)

## Game Rules

* There are eight pairs of cards on the game board.
* Once you click on a card, it will flip & show you its icon.
* When you click on another card & after that card flips:
	* In case this card icon matches the one that was flipped earlier then both cards will turn blue.
		![Correct match](./img/_correct_move.png)
	* In case both cards don't match then both cards will be flipped on their back again.
		![Wrong match](./img/_wrong_move.png)
* Every card you flip will be considered as a move & will be incremented in the counter you see above the game board.
	* After 17 moves you will loose one star, after 33, you'll loose two stars.
* After you successfully manage to match all pairs, a success window will open showing how many moves you've done & how long have you spent.

	![Completed Game](./img/_complete.png)
	![Success Message](./img/_success.png)

## Technical

* This project includes the following assets:
	* **index.html** This is where the game html structure is located.
		* You can access the memory game from: [https://alia-adel.github.io/fend-project-memory-game/](https://alia-adel.github.io/fend-project-memory-game/)
	* **main.css** This is where the game board styling is located.
	* **app.js** This is where all the board actions reside.
* To follow the game workflow, please check `app.js`.

## Credits

* For shuffling the cards **shuffle** javaScript function was used from http://stackoverflow.com/a/2450976

## Tools Used

* [Fontawesome](http://fontawesome.io/icons/) was used to display game card's icons.
