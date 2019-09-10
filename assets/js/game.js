$(document).ready(function () {
    // Initialize list of words, pick random word from list
    const wordList = ["horse", "apple", "bushes", "comb", "police"];
    const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    // Grab div to hold the user interfacing text
    const blankSpace = $(".blanks");
    const guessIndicator = $(".guess-number");

    let blankStr = "";
    let guessCounter = 5;
    let wrongGuesses = []

    for (let i = 0; i < targetWord.length; i++) {
        blankStr = blankStr + "_ ";
    }
    for (let i = 0; i < letters.length; i++){
        var letterDisplay = $("<div>");
        letterDisplay.addClass("lead col-2");
        letterDisplay.attr("data-letter", letters[i], "style", "font-size: 32px")
        letterDisplay.text(letters[i]);
        $(".letters").append(letterDisplay);
    }
    blankSpace.text(blankStr);
    guessIndicator.text("You have " + guessCounter + " more wrong guesses");

    $(document).keyup(function (event) {
        let userGuess = event.key;

        if (guessCounter > 1) {
            if (targetWord.indexOf(userGuess) != -1) {
                let temp = blankStr.replace(/\s/g, '');
                blankStr = "";
                for (let i = 0; i < targetWord.length; i++) {
                    if (targetWord[i] === userGuess) {
                        blankStr = blankStr + userGuess + " ";
                    } else if (targetWord[i] != userGuess && temp[i] === "_") {
                        blankStr = blankStr + "_ ";
                    } else {
                        blankStr = blankStr + temp[i] + " ";
                    }
                }
                $('[data-letter=' + userGuess.toUpperCase() + ']').css({'color': 'green', 'font-weight': 'bold'});
                blankSpace.text(blankStr);
                if(targetWord == blankStr.replace(/\s/g, '')){
                    alert("You Win!");
                }
            } else {
                guessCounterDown(userGuess);
                console.log("wrong", guessCounter);
                $('[data-letter=' + userGuess.toUpperCase() + ']').css({'color': 'red', 'text-decoration': 'line-through'});
                guessIndicator.text("You have " + guessCounter + " more wrong guesses");
            }
        } else {
            guessCounterDown(userGuess);
            guessIndicator.text("You have " + guessCounter + " more wrong guesses");
            alert("Ya lost!");
        }
    });

    function guessCounterDown(guess) {
        if (!wrongGuesses.includes(guess)) {
            wrongGuesses.push(guess);
            if (targetWord.indexOf(guess) === -1) {
                guessCounter -= 1;
            }
        }
    }
});

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