var wordList = ["horse", "apple", "bushes", "comb", "police"];
var targetWord = wordList[Math.floor(Math.random() * wordList.length)];
var blankSpace = document.getElementById("blanks");
const displayBlank = initBlanks();
var userViewStr = displayBlank;

console.log(targetWord);

blankSpace.textContent = initBlanks();

document.onkeyup = function (event) {
    let userGuess = event.key;
    // console.log(event);
    console.log(userGuess);


    blankSpace.textContent = addGuess(userGuess, userViewStr);
    userViewStr = addGuess(userGuess, userViewStr);

}

function initBlanks() {
    var blankStr = "";

    for (var i = 0; i < targetWord.length; i++) {
        blankStr = blankStr + "_ ";
    }
    return blankStr;
}

function addGuess(guess, displayStr) {
    if (targetWord.indexOf(guess) != -1) {
        console.log("in word");
        temp = displayStr;
        displayStr = "";
        for (var i = 0; i < targetWord.length; i++) {
            if (targetWord.charAt(i) != guess) {
                displayStr = displayStr + "_ ";
            } else {
                displayStr = displayStr + guess + " ";
            }
        }
        // console.log(displayStr);
        return displayStr;
    } else {
        console.log("not in word");
        return displayStr;
    }
}

// Pseudocode
// -computer has a list of words for user to guess*
// -computer picks random word from list*
// -computer displays blanks (_) for each char in word picked
    // -take length of word
    // -add that many blanks to DOM
// -user presses a key to make a guess
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