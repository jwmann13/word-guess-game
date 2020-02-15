# word-guess-game

## Deployment

This hangman game is deployed on github pages at https://jwmann13.github.io/word-guess-game

## Usage

A very simple hangman style game with a changing image indicator. Each answer will be the name of a fruit.

Press the key corresponding to the letter you want to guess (works by click letter on screen or pressing the letter on your keyboard). The javascript will recognize the letter and let you know if you guess was correct or incorrect. Correct guesses will be highlighted with white and boldened in the list of letters to the left and added to the correct position in the blanks above. Incorrect guesses will be highlighted with red and struck-through.

When each fruit in the image has a bite taken from it or the word is completed the game is over and you will be alerted whether you have lost or won, and the game will reset.

## Background

The game uses jquery to handle user interaction checking keyup events and click events to register user guesses by calling the handleGuess() function. The guess handler checks the users guess against various conditions:

* if the guess is a letter at all and not another type of data
* if the number of wrong guesses has gone over 5
* if the target word contains the character guessed
* and finally if the whole word has been correctly guessed

Once all of these conditions are met the user has won, the game ends, and a success alert is posted to the screen.

The greatest difficulty for this project was in parsing the string that gets displayed to the user. In order to make it clear the number of letters in the target word and the progress of the user, underscores were used to show unknown letters and all correctly guessed letters are included in the display.

The program loops over the length of the target word and replaces each letter with an underscore and a space. On each guess it removes the spaces from this string and checks it agaisnt the target word. If a guess is correct it adds it to the string and keeps that saved for the next guess and displays it. If the guess is incorrect it returns as an unchanged string.

## Authors

* __Jeffrey Mann__ - code and design
* __Reagan Floyd__ - images
