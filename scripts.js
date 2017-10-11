window.onload = function() {
  var mainDiv = document.querySelector("#main-div");
  var wordInput = document.querySelector("#word-submit-input");
  var word = "";
  var divRow = document.querySelector(".row");
  var wordArray = [];
  var wrongLetterArray = [];

  wordInput.addEventListener("keypress", startGame);

  function startGame(event) {
    word = wordInput.value;
    word = word.toUpperCase();

    // Deletes selection screen when enter pressed
    var x = event.keyCode || event.which;
    if (x == '13') {
      while (divRow.hasChildNodes()) {
        divRow.removeChild(divRow.lastChild);
      }
      createGame();
    }
  }

  function createGame() {
    // Guess Counter Pops Up
    var guessesLeft = 10;
    var guessDiv = document.createElement("div");
    guessDiv.className = "col-xs-12 guess-div";
    var guessText = document.createElement("h1");
    guessText.innerText = "Guesses Remaining: " + guessesLeft;
    guessDiv.appendChild(guessText);
    divRow.appendChild(guessDiv);

    // Show blanks
    for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) == " ")
        wordArray[i] = " ";
      else {
        wordArray[i] = "_";
      }

      var wordDiv = document.createElement("div");
      wordDiv.className = "col-xs-1 word-div"
      var p = document.createElement("p");
      p.innerText = wordArray[i];
      p.className = "letter-" + i;
      wordDiv.appendChild(p)
      divRow.appendChild(wordDiv);
    }

    // Create Space for Guessed Characters
    var guessedChar = document.createElement("div");
    guessedChar.className = "col-xs-12 guessed-char-div";
    var guessedCharHeader = document.createElement("h1");
    guessedCharHeader.innerText = "Guessed Letters:"
    var guessedChars = document.createElement("div");
    guessedChars.className = "col-xs-12 guessed-chars-div";
    guessedChar.appendChild(guessedCharHeader);
    divRow.appendChild(guessedChar);
    divRow.appendChild(guessedChars);

    // Create Guessing Input
    var guessInputDiv = document.createElement("div");
    guessInputDiv.className = "col-xs-12 guess-input-div";
    var guessInput = document.createElement("input");
    guessInput.className = "guess-input";
    guessInput.type = "text";
    guessInput.addEventListener("keypress", guess)
    guessInputDiv.appendChild(guessInput);
    divRow.appendChild(guessInputDiv);

    function guess(event) {
      // When enter is pressed
      if (event.keyCode == '13' || event.which == '13') {
        // If a single letter is input
        if (guessInput.value.length == 1 && /^[a-zA-Z]/.test(guessInput.value)) {
          var guessedChar = guessInput.value.toUpperCase();
          // Check if letter is in the word
          for (var i = 0; i < word.length; i++) {
            if (guessedChar == word[i]) {
              wordArray[i] = word[i];
              // Replace underline with letter
              var p = document.querySelector(".letter-" + i);
              p.innerText = word[i];
              guessInput.value = "";
            }
          }
          // Shows wrong guesses
          for (var i = 0; i < word.length; i++) {
            if (guessedChar != word[i]) {
              // If guessed letter hasn't already been guessed, add it to wrong guess list
              if (wrongLetterArray.every(function(letter) {
                  return letter != guessedChar;
                })) {
                wrongLetterArray.push(guessedChar);
                var wrongLetter = document.createElement("h2");
                wrongLetter.innerText = guessInput.value.toUpperCase() + " ";
                guessedChars.appendChild(wrongLetter);

                guessInput.value = "";

                guessesLeft--;
                guessText.innerText = "Guesses Remaining: " + guessesLeft;
              }
              else {
                guessInput.value = "";
              }

            }

          }
        }
      }
    }
  }
}
