$(document).ready(function() {
  // Initialize list of words, pick random word from list
  const wordList = [
    "orange",
    "apple",
    "banana",
    "grape",
    "pineapple",
    "kumquat",
    "kiwi",
    "tangerine",
    "pear",
    "fig",
    "tomato",
    "pomegranate",
    "apricot",
    "blueberry",
    "strawberry"
  ];
  let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  // Grab divs to hold the user interfacing text
  const blankSpace = $(".blanks");
  const imgs = $(".images");

  // Set up dynamic variables to hold background data
  let blankStr = "";
  let guessCounter = 0;
  let wrongGuesses = [];

  // fill blank string with dashes(as place holders) and spaces(for legibility);
  for (let i = 0; i < targetWord.length; i++) {
    blankStr = blankStr + "_ ";
  }

  // Set the picture indicator to the next image on wrong guesses
  let fruitPic = $("<img>");
  fruitPic.addClass("img-fluid");
  fruitPic.css({
    width: "100%",
    height: "auto",
    opacity: 1
  });
  fruitPic.attr("src", "assets/images/froot-" + guessCounter + ".jpeg");
  imgs.append(fruitPic);

  //  create letter indicators to html;
  for (let i = 0; i < letters.length; i++) {
    var letterDisplay = $("<div>");
    letterDisplay.addClass("lead col-2 character");
    letterDisplay.attr("data-letter", letters[i]);
    letterDisplay.text(letters[i]);
    $(".letters").append(letterDisplay);
  }
  // show those on page;
  blankSpace.text(blankStr);

  // main user interaction function
  $(document).keyup(function(event) {
    handleGuess(event.key.toLowerCase());
  });

  $(".letters").on("click", ".character", function(event) {
    handleGuess(
      $(this)
        .data("letter")
        .toLowerCase()
    );
  });

  function handleGuess(guess) {
    // handles non letter key presses
    if (letters.includes(guess.toUpperCase())) {
      // handles play vs loss state
      if (guessCounter < 5) {
        if (targetWord.indexOf(guess) != -1) {
          // hold temporary string of correctly guessed letters and dashes with no spaces
          let temp = blankStr.replace(/\s/g, "");
          // reset blank string
          blankStr = "";
          // refill blank string with dashes for un-guessed letters(dashes) and correctly guessed letters(guess)
          for (let i = 0; i < targetWord.length; i++) {
            // guess is correct, write to string
            if (targetWord[i] === guess) {
              blankStr = blankStr + guess + " ";
              // guess is incorrect, write a dash
            } else if (targetWord[i] != guess && temp[i] === "_") {
              blankStr = blankStr + "_ ";
              // letter is already in string, rewrite to string
            } else {
              blankStr = blankStr + temp[i] + " ";
            }
          }
          // correctly guessed letters made white and bold in alphabet interface
          $("[data-letter=" + guess.toUpperCase() + "]").css({
            color: "white",
            "font-weight": "bold"
          });
          // write resulting string to page
          blankSpace.text(blankStr);
          // win state
          if (targetWord == blankStr.replace(/\s/g, "")) {
            alert("You Win!");
            reset();
          }
        } else {
          guessCounterDown(guess);
          // incorrectly guessed letters made red and struckthrough in alphabet interface
          $("[data-letter=" + guess.toUpperCase() + "]").css({
            color: "red",
            "text-decoration": "line-through"
          });
          fruitPic.attr("src", "assets/images/froot-" + guessCounter + ".jpeg");
          imgs.append(fruitPic);
        }
      } else {
        // engages loss state
        guessCounterDown(guess);
        $("[data-letter=" + guess.toUpperCase() + "]").css({
          color: "red",
          "text-decoration": "line-through"
        });
        fruitPic.attr("src", "assets/images/froot-" + guessCounter + ".jpeg");
        alert("Ya lost!");
        reset();
      }
    }
  }

  // function to count down wrong guesses
  function guessCounterDown(guess) {
    if (!wrongGuesses.includes(guess)) {
      wrongGuesses.push(guess);
      if (targetWord.indexOf(guess) === -1) {
        guessCounter += 1;
      }
    }
  }

  // resets the game state to beginning
  function reset() {
    targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    blankStr = "";
    guessCounter = 0;
    wrongGuesses = [];
    for (let i = 0; i < targetWord.length; i++) {
      blankStr = blankStr + "_ ";
    }
    $(".character").removeAttr("style");
    fruitPic.attr("src", "assets/images/froot-" + guessCounter + ".jpeg");
    imgs.append(fruitPic);
    blankSpace.text(blankStr);
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
