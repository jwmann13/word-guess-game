// Initialize list of words, pick random word from list
const wordList = ["horse", "apple", "bushes", "comb", "police"];
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];

// Grab div to hold the user interfacing text
const blankSpace = document.getElementById("blanks");

let blankStr = "";
let guessCounter = 5;
let wrongGuesses = []


console.log(targetWord);
console.log(guessCounter);

for (let i = 0; i < targetWord.length; i++) {
    blankStr = blankStr + "_ ";
}

blankSpace.textContent = blankStr;

document.onkeyup = function (event) {
    let userGuess = event.key;
    console.log(userGuess);

    if (targetWord.indexOf(userGuess) != -1) {
        // console.log("in word");
        let temp = blankStr.replace(/\s/g, '');
        console.log('in', temp);
        blankStr = "";
        for (let i = 0; i < targetWord.length; i++) {
            if (targetWord[i] === userGuess) {
                blankStr = blankStr + userGuess + " ";
            } else if (targetWord[i] != userGuess && temp[i] === "_") {
                blankStr = blankStr + "_ ";
            } else {
                blankStr = blankStr + temp[i] + " ";
            }
            // console.log('iter' + i, blankStr);
        }
        console.log('out', blankStr);
        blankSpace.textContent = blankStr;
        // return blankStr;
    } else {
        console.log("not in word");
        guessCounterDown(userGuess);
        // return blankStr;
    }
}

function guessCounterDown(guess) {
    if (!wrongGuesses.includes(guess)) {
        wrongGuesses.push(guess);
        if (targetWord.indexOf(guess) === -1) {
            guessCounter -= 1;
        }
    }
}

// Pseudocode
// -computer has a list of words for user to guess***
// -computer picks random word from list***
// -computer displays blanks (_) for each char in word picked***
// -take length of word***
// -add that many blanks to DOM***
// -user presses a key to make a guess***
// -if user guess is in the word, add letter to the correct position in the blanked word
// example:
// *word is 'apple'    *user guesses 'p'    *index at 1 and 2 meets condition of first if statement
// *enters for loop to loop 5 times (length of word) *char0 != user guess, add blank char ('_') to displayed string
// *char1 === user guess, add inputted char to displayed string *char2 === user guess, add inputted char to displayed string
// *char3 != user guess, add blank char ('_') to displayed string *char4 != user guess, add blank char ('_') to displayed string
// *
// -if user guess is not in the word, display a message that guess was wrong and the remaining number of wrong guesses
// -if user guesses all letters in the word display a win message
// -if user guesses too many times wrongly display a loss message