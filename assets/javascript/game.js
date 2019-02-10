// Array of words and images
// I tried to get the videos to play in an iframe but couldn't. It worked when I tested on w3schools website.
// Appears the w3schools may be white listed for youtube video playback?
var wordsToGuess = {
    WordOne: {
        secretWord: "RickAstley",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/rick.jpg" width="1024" height="576">',
        video: ''
    },
    WordTwo: {
        secretWord: "WhenInRome",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/rome.jpg" width="407" height="303">',
        video: ''
    },
    WordThree: {
        secretWord: "MenWithoutHats",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/hats.jpg" width="600" height="400">',
        video: ''
    },
    WordFour: {
        secretWord: "HouseOfPain",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/pain.jpg" width="1200" height="628">',
        video: ''
    },
    WordFive: {
        secretWord: "Semisonic",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/sonic.jpg" width="620" height="613">',
        video: ''
    },
    WordSix: {
        secretWord: "RightSaidFred",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/fred.jpg" width="990" height="660">',
        video: ''
    },
    WordSeven: {
        secretWord: "DexysMidnightRunners",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/eileen.jpg" width="431" height="270">',
        video: ''
    },
    WordEight: {
        secretWord: "VanillaIce",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/ice.jpg" width="904" height="600">',
        video: ''
    },
    WordNine: {
        secretWord: "NormanGreenbaum",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/norman.jpg" width="980" height="653">',
        video: ''
    },
    WordTen: {
        secretWord: "Survivor",
        imgHtml: '<img border="0" alt="Broken" src="assets/images/survivor.jpg" width="800" height="446">',
        video: ''
    }
}

var wordGuess = {

    /////////////////////////////////////
    // Properties of the guessing game //
    /////////////////////////////////////

    // Allowed guesses for each word/phrase
    totalGuesses: 10,
    // Store incorrectly guessed letters in an array
    invalidLettersGuessed: [],
    // Store correctly guessed letters in an array
    correctLettersGuessed: [],
    // Track the number wins in a row
    wins: 0,
    // Only allow letters
    validInput: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    // Word the user is trying to guess
    secretWord: [],
    // Image hint
    secretWordImg: "",
    // Video hint
    secretWordVideo: "",

    ////////////////////////////////////
    // Functions of the guessing game //
    ////////////////////////////////////

    // Verify 'checkLetter' exists within 'checkArray' variable array
    containsLetter: function (checkLetter, checkArray) {
        var isFound = false;
        for (var iCheckArray=0; iCheckArray<checkArray.length; iCheckArray++){
            if (checkLetter.toLowerCase()===checkArray[iCheckArray].toLowerCase()){
                isFound=true;
                break;
            }
        }
        return isFound;
    },

    // Invalid letter guess. Verify it already hasn't been guessed and push
    // it into the array.
    invalidGuess: function (letter) {
        if (!this.containsLetter(letter, this.invalidLettersGuessed)) {
            this.invalidLettersGuessed.push(letter);
            this.totalGuesses--;
            // If no more guesses, alert user and refresh page
            if (this.totalGuesses === 0) {
                alert("Game is over! You lose!");
                this.wins=0;
                this.resetStats();
                pageInitialization();
            } else {
                document.getElementById("guesses").innerHTML="<h2>Guesses Remaining: " + this.totalGuesses + "</h2>";
                document.getElementById("invalidLetters").innerHTML="<h2>Invalid Letters: " + this.printArray(this.invalidLettersGuessed) + "</h2>";
            }
        }
    },

    // Correct letter guessed. Push it into the array if it doesn't exist.
    validGuess: function (letter) {
        if (!this.containsLetter(letter, this.correctLettersGuessed)) {
            this.correctLettersGuessed.push(letter);
        }
    },

    // Reset stats when page loads or game is over.
    resetStats: function () {
        this.totalGuesses = 10;
        this.invalidLettersGuessed = [];
        this.correctLettersGuessed = [];
        this.secretWord = [];
        this.secretWordImg = "";
        this.secretWordVideo = "";
    },

    // Formatting for printing arrays
    printArray: function (myArray) {
        var printString = ""
        for (var iMyArray=0; iMyArray<myArray.length; iMyArray++){
            printString = printString + myArray[iMyArray] + " ";
        }
        return printString;
    },

    // Returns the word to display to the user.
    // Replace unknown characters with '_' character.
    generateSecretWordArray: function(wordArray){
        var returnArray = "";
        for (var iWordArray=0; iWordArray<wordArray.length; iWordArray++){
            if(wordGuess.containsLetter(wordArray[iWordArray], wordGuess.correctLettersGuessed)) {
                returnArray = returnArray + wordArray[iWordArray] + " ";
            } else {
                returnArray = returnArray + "_ ";
            }
        }
        return returnArray;
    },

    // Get random word/phrase object to guess.
    getRandomGuess: function (){
        var wordArray = Object.keys(wordsToGuess);
        var wordArrayIndex = Math.floor(Math.random() * wordArray.length);
        var randomSecretName = wordsToGuess[wordArray[wordArrayIndex]].secretWord;
        var randomImgHtml = wordsToGuess[wordArray[wordArrayIndex]].imgHtml;
        var randomVideo = wordsToGuess[wordArray[wordArrayIndex]].video;
        return ([randomSecretName, randomImgHtml, randomVideo]);
    },

    // Verify all the letters were correctly guessed.
    wordComplete: function(wordToCheck, arrayVerify){
        var complete = true;
        for (var iWordToCheck=0; iWordToCheck<wordToCheck.length; iWordToCheck++){
            if (!this.containsLetter(wordToCheck[iWordToCheck], arrayVerify)){
                complete = false;
                break;
            }
        }
        return complete;
    }
}

// Initializtion function that will run when the page gets loaded
function pageInitialization(){

    var secretArray = wordGuess.getRandomGuess();
    console.log(secretArray);
    wordGuess.secretWord = secretArray[0].split("");
    console.log(wordGuess.secretWord);
    wordGuess.secretWordImg = secretArray[1];
    console.log(wordGuess.secretWordImg);
    wordGuess.secretWordVideo = secretArray[2];
    console.log(wordGuess.secretWordVideo);
    
    document.getElementById("winCounter").innerHTML="<h2>Wins: " + wordGuess.wins + "</h2>";
    document.getElementById("currentWord").innerHTML="<h2>Current Word: "+wordGuess.generateSecretWordArray(wordGuess.secretWord)+"</h2>";
    document.getElementById("guesses").innerHTML="<h2>Guesses Remaining: " + wordGuess.totalGuesses + "</h2>";
    document.getElementById("invalidLetters").innerHTML="<h2>Invalid Letters: " + wordGuess.printArray(wordGuess.invalidLettersGuessed) + "</h2>";
    document.getElementById("imageHint").innerHTML=wordGuess.secretWordImg;
    document.getElementById("videoHint").innerHTML="";
}

// onkeyup event handler
document.onkeyup = function (event) {
    var letterPressed = event.key.toLowerCase();
    if (wordGuess.containsLetter(letterPressed, wordGuess.validInput)) {
        if (!wordGuess.containsLetter(letterPressed, wordGuess.secretWord)) {
            wordGuess.invalidGuess(letterPressed);
        } else {
            wordGuess.validGuess(letterPressed);
            if (wordGuess.wordComplete(wordGuess.secretWord, wordGuess.correctLettersGuessed)) {
                wordGuess.wins++;
                document.getElementById("winCounter").innerHTML="<h2>Wins: " + wordGuess.wins + "</h2>";
                document.getElementById("currentWord").innerHTML="<h2>Current Word: "+wordGuess.generateSecretWordArray(wordGuess.secretWord)+"</h2>";
                alert("YOU WIN!!! The band/singer is " + wordGuess.printArray(wordGuess.secretWord));
                wordGuess.resetStats();
                pageInitialization();
            }
        }
    }
    document.getElementById("winCounter").innerHTML="<h2>Wins: " + wordGuess.wins + "</h2>";
    document.getElementById("currentWord").innerHTML="<h2>Current Word: "+wordGuess.generateSecretWordArray(wordGuess.secretWord)+"</h2>";
    document.getElementById("guesses").innerHTML="<h2>Guesses Remaining: " + wordGuess.totalGuesses + "</h2>";
    document.getElementById("invalidLetters").innerHTML="<h2>Invalid Letters: " + wordGuess.printArray(wordGuess.invalidLettersGuessed) + "</h2>";
}
