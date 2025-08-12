const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
hintBtn = document.querySelector(".hint-button"),
hintElement = document.querySelector(".hint"),
notification = document.querySelector("#notification"),
scoreDisplay = document.querySelector("#score-display");

let correctWord, timer, score = 0; 

// Function to update score display
const updateScore = () => {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to show notifications
const showNotification = (message, type) => {
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--; // decrement maxTime by -1
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        showNotification(`Time's up! ${correctWord.toUpperCase()} is the correct word`, 'warning');
        initGame(); // calling initGame function, so the game restarts
    }, 1000);
}

const initGame = () => {
    initTimer(30); // calling iniTimer function with passing 30 as maxTime value
    let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
    let wordArray = randomObj.word.split(""); // splitting each letter of random word
    for (let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1)); // getting random number
        // shuffling words randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); // passing shuffled word as word text
    hintText.innerText = randomObj.hint; //passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength attr value to word length
    console.log(randomObj);
    
    // Hide hint when new word is loaded
    hintElement.classList.add("hidden");
    
    // Update score display
    updateScore();
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase(); // getting user value
    if(!userWord) {
        showNotification("Please enter a word to check", 'error');
        return;
    }

    // if users word does not match the correct word
    if(userWord !== correctWord) {
        showNotification(`Nope! ${userWord} is not the correct word`, 'error');
        return;
    }

    // if users word matches the correct word
    showNotification(`Congratulations! ${userWord.toUpperCase()} is a correct word`, 'success');
    score++; // Increment score
    updateScore(); // Update score display
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Add hint button functionality
hintBtn.addEventListener("click", () => {
    hintElement.classList.toggle("hidden");
});