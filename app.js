const main = document.querySelector('.main');
const paper = document.querySelector('.paperDiv');
const scissors = document.querySelector('.scissorsDiv');
const rock = document.querySelector('.rockDiv');
const rules = document.querySelector('.rules');
const rulesPic = document.querySelector('.rulesPic');
const close = document.querySelector('.close');

// set the score with the value from localStorage, or 0 if there is no value
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// set the starting value of the score element
document.querySelector('.totalScore').innerHTML = score;

// declaring variables
let userChoice = "";
let computerChoice = "";
let whoWon = [];

// for the rules popup / close
rules.addEventListener('click', ()=>{
    rulesPic.classList.toggle('displayFlex');
    main.classList.toggle('darkBg');
});

close.addEventListener('click', ()=>{
    rulesPic.classList.toggle('displayFlex');
    main.classList.toggle('darkBg');
});

// /* Game */ 
// game's logic
paper.addEventListener('click', ()=>{
    userChoice = "Paper";
    didUserChoose = true;
    play(1,2); 
});

scissors.addEventListener('click', ()=>{
    userChoice = "Scissors";
    didUserChoose = true;
    play(1,2);
});

rock.addEventListener('click', ()=>{
    userChoice = "Rock";
    didUserChoose = true;
    play(1,2);
})

// Controlling the display of elements related to the game interface.
const play = (userC,computerC)=>{
    document.querySelector('.game').style.display = "none";
    document.querySelector('.choices').style.display = "flex";
    if(userChoice==='Paper'){
        document.querySelector('.paperChoice').style.display = "flex";
    } else if(userChoice==='Rock'){
        document.querySelector('.rockChoice').style.display = "flex";
    } else if(userChoice==='Scissors'){
        document.querySelector('.scissorsChoice').style.display = "flex";
    }

    // computer's choice determined randomly
    let element = randomFigure();
    while(element===userChoice){
        element = randomFigure();
    }
    computerChoice = element;

    //delay computer's choice for 1 second before revealing the computer's selection
    setTimeout(()=>{
        document.getElementById(`computer${element}`).style.display = "flex";
        document.querySelector('.noChoiceYet').style.display = "none";
    },1000);
    
    // conditional statements to determine the outcome of the game based on either U/C choices
    if(userChoice === "Paper" && computerChoice === "Scissors"){
        whoWon.push("computer","scissors");
    
    } else if(userChoice === "Paper" && computerChoice === "Rock"){
        whoWon.push("user","paper");
    }
    
    if(userChoice === "Scissors" && computerChoice === "Paper"){
        whoWon.push("user","scissors");
    
    } else if(userChoice === "Scissors" && computerChoice === "Rock"){
        whoWon.push("computer","rock");
    }
    
    if(userChoice === "Rock" && computerChoice === "Paper"){
        whoWon.push("computer","paper");
    
    } else if(userChoice === "Rock" && computerChoice === "Scissors"){
        whoWon.push("user","rock");
    }

    // transition from the gameplay choices to displaying the result of the game.
    setTimeout(()=>{
        document.querySelector('.choices').style.display = "none";
        document.querySelector('.result').style.display = "flex";

    // Make elements visible by displaying their containers
    switch(userChoice){
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

    switch(computerChoice){
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

    switch(whoWon[0]){
        case 'computer':
            document.querySelector('.youLose').style.display = "block";
            document.getElementById(`${whoWon[1]}ResultComputer`).classList.toggle("winnerBoxShadow");
            break;
        case "user":
            document.querySelector('.youWin').style.display = "block";
            document.getElementById(`${whoWon[1]}Result`).classList.toggle("winnerBoxShadow");
    }

