// Selecting elements from the DOM
const mainElement = document.querySelector('.main');
const paperElement = document.querySelector('.paperDiv');
const scissorsElement = document.querySelector('.scissorsDiv');
const rockElement = document.querySelector('.rockDiv');
const rulesElement = document.querySelector('.rules');
const rulesPicElement = document.querySelector('.rulesPic');
const closeElement = document.querySelector('.close');

// Initialize score from local storage or default to 0
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// Update the total score on the page
document.querySelector('.totalScore').innerHTML = score;

let userChoice = "";
let computerChoice = "";
let winner = [];

// Event listener for rules button
rulesElement.addEventListener('click', () => {
    rulesPicElement.classList.toggle('displayFlex');
    mainElement.classList.toggle('darkBg');
});

// Event listener for close button
closeElement.addEventListener('click', () => {
    rulesPicElement.classList.toggle('displayFlex');
    mainElement.classList.toggle('darkBg');
});

// Event listeners for user choices
paperElement.addEventListener('click', () => {
    userChoice = "Paper";
    play(1, 2);
});

scissorsElement.addEventListener('click', () => {
    userChoice = "Scissors";
    play(1, 2);
});

rockElement.addEventListener('click', () => {
    userChoice = "Rock";
    play(1, 2);
});

// Function to handle the game logic
const play = (userChoiceIndex, computerChoiceIndex) => {
    // Hide the game section and show the choices section
    document.querySelector('.game').style.display = "none";
    document.querySelector('.choices').style.display = "flex";

    // Show the user's choice based on selection
    if (userChoice === 'Paper') {
        document.querySelector('.paperChoice').style.display = "flex";
    } else if (userChoice === 'Rock') {
        document.querySelector('.rockChoice').style.display = "flex";
    } else if (userChoice === 'Scissors') {
        document.querySelector('.scissorsChoice').style.display = "flex";
    }

    // Generate a random computer choice
    let computerChoiceElement = randomFigure();
    while (computerChoiceElement === userChoice) {
        computerChoiceElement = randomFigure();
    }
    computerChoice = computerChoiceElement;

    // Show the computer's choice after a delay
    setTimeout(() => {
        document.getElementById(`computer${computerChoiceElement}`).style.display = "flex";
        document.querySelector('.noChoiceYet').style.display = "none";
    }, 1000);

    // Determine the winner based on choices
    if (userChoice === "Paper" && computerChoice === "Scissors") {
        winner.push("computer", "scissors");
    } else if (userChoice === "Paper" && computerChoice === "Rock") {
        winner.push("user", "paper");
    }

    if (userChoice === "Scissors" && computerChoice === "Paper") {
        winner.push("user", "scissors");
    } else if (userChoice === "Scissors" && computerChoice === "Rock") {
        winner.push("computer", "rock");
    }

    if (userChoice === "Rock" && computerChoice === "Paper") {
        winner.push("computer", "paper");
    } else if (userChoice === "Rock" && computerChoice === "Scissors") {
        winner.push("user", "rock");
    }

    // Show the result after a delay
    setTimeout(() => {
        document.querySelector('.choices').style.display = "none";
        document.querySelector('.result').style.display = "flex";

        // Show user's and computer's choices
        switch (userChoice) {
            case 'Paper':
                document.getElementById('paperResult').style.display = "flex";
                break;
            case 'Scissors':
                document.getElementById('scissorsResult').style.display = "flex";
                break;
            case 'Rock':
                document.getElementById('rockResult').style.display = "flex";
                break;
        }

        switch (computerChoice) {
            case 'Paper':
                document.getElementById('paperResultComputer').style.display = "flex";
                break;
            case 'Scissors':
                document.getElementById('scissorsResultComputer').style.display = "flex";
                break;
            case 'Rock':
                document.getElementById('rockResultComputer').style.display = "flex";
                break;
        }

        // Show the winner and update score
        switch (winner[0]) {
            case 'computer':
                document.querySelector('.youLose').style.display = "block";
                document.getElementById(`${winner[1]}ResultComputer`).classList.toggle("winnerBoxShadow");
                break;
            case "user":
                document.querySelector('.youWin').style.display = "block";
                document.getElementById(`${winner[1]}Result`).classList.toggle("winnerBoxShadow");
        }

        const updateScore = (newScore) => {
            score = newScore;
            localStorage.setItem('score', newScore);
            document.querySelector('.totalScore').innerHTML = score;
        };

        if (winner[0] === 'user') {
            updateScore(score + 1);
        } else if (winner[0] === 'computer') {
            updateScore(score - 1);
        }
    }, 2500);
}

// Event listener for play again button
document.querySelector('.playAgain').addEventListener('click', () => {
    // Hide the previous choices and result
    switch (computerChoice) {
        case 'Paper':
            document.getElementById('paperResultComputer').style.display = "none";
            document.getElementById('computerPaper').style.display = "none";
            break;
        case 'Scissors':
            document.getElementById('scissorsResultComputer').style.display = "none";
            document.getElementById('computerScissors').style.display = "none";
            break;
        case 'Rock':
            document.getElementById('rockResultComputer').style.display = "none";
            document.getElementById('computerRock').style.display = "none";
            break;
    }

    switch (userChoice) {
        case 'Paper':
            document.getElementById('paperResult').style.display = "none";
            document.querySelector('.paperChoice').style.display = "none";
            break;
        case 'Scissors':
            document.getElementById('scissorsResult').style.display = "none";
            document.querySelector('.scissorsChoice').style.display = "none";
            break;
        case 'Rock':
            document.getElementById('rockResult').style.display = "none";
            document.querySelector('.rockChoice').style.display = "none";
            break;
    }

    switch (winner[0]) {
        case 'computer':
            document.querySelector('.youLose').style.display = "none";
            document.getElementById(`${winner[1]}ResultComputer`).classList.toggle("winnerBoxShadow");
            break;
        case "user":
            document.querySelector('.youWin').style.display = "none";
            document.getElementById(`${winner[1]}Result`).classList.toggle("winnerBoxShadow");
    }

    // Reset variables and show the game section
    document.querySelector('.noChoiceYet').style.display = "flex";
    computerChoice = "";
    userChoice = "";
    winner = [];
    document.querySelector('.result').style.display = "none";
    document.querySelector('.game').style.display = "flex";
});

// Function to generate a random figure for the computer
const randomFigure = () => {
    let figures = ['Paper', 'Rock', 'Scissors'];
    let chosenFigure = figures[Math.floor(Math.random() * figures.length)];
    return chosenFigure;
};
