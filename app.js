/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 in one of the dices, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6 in a row, he loses all the scores he has previously won
- The players can establish a winning score. If they do not establish it, it will have the default value of 100 points.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach the winning score WINS the game.

*/

//Creation of variables
let currentScore0;
let currentScore1;
let currentScore;
let totalScore0;
let totalScore1;
let totalScores;
let activePlayer;
let gamePlaying; //State variable which will tell me if the game is being played or not right now
let player1;
let player2;
let lastDice1;
let lastDice2;

init();


//ROLL THE DICE BUTTON
document.querySelector(".btn-roll").addEventListener("click", function() {

    if (gamePlaying) {
        //Generator of random numbers between 1 and 6
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //Display the result
        document.getElementById("dice-1").style.display="block";
        document.getElementById("dice-2").style.display="block";
        document.getElementById("dice-1").src="dice-" + dice1 + ".png";
        document.getElementById("dice-2").src="dice-" + dice2 + ".png";

        //If a player rolls two 6 in a row, loses all his previous score
        if(dice1===6 && lastDice1===6 ||dice2===6 && lastDice2===6  ){
            totalScores[activePlayer]=0; //Change of the variable value
            document.querySelector("#score-" + activePlayer).textContent = totalScores[activePlayer]; //Update the UI
            changeActivePlayer(); //Change the player
        } else if (dice1 != 1 && dice2 != 1) { //Sum the dice score to the currentscore of the active player if the dice values are not 1
            currentScore= dice1 + dice2;
            // console.log(currentScore);
            document.querySelector('#current-' + activePlayer).textContent = currentScore; //With this I select the id of the currentScore of the Active Player and I can save a lot of lines of code
        } else { // If the player rolls a 1, it's the turn of the next player
            changeActivePlayer();
        }

        lastDice1=dice1;
        lastDice2=dice2;

    }


});

//HOLD BUTTON
document.querySelector(".btn-hold").addEventListener("click", function() {

    if (gamePlaying) {
        //Add current score to the totalScore
        totalScores[activePlayer] += currentScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = totalScores[activePlayer];

        //The user established the quantity to win

        let input=document.getElementById("quantitytowin").value;
        console.log(input);
        let quantitytowin;
        
        if(input){
            quantitytowin=input;
        } else {
            quantitytowin=100;
        }


        //Check if someone won
        if (totalScores[activePlayer] >= quantitytowin) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.toggle('active');
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
            hideDices();
            gamePlaying = false;

        } else {
            //Change the player after clicking on hold button
            changeActivePlayer();
        }

    }


});

//NEW GAME BUTTON
document.querySelector(".btn-new").addEventListener("click", init);

//FUNCTIONS OF THE PROGRAM

function changeActivePlayer() { //Function to change the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //If activePlayer is 0, should be one, else should be 0.

    /* The ternary operator is doing the same that this code just below
    if(activePlayer===0){
        activePlayer=1;
    }else{
        activePlayer=0;
    }
    */

    currentScore0.innerHTML = 0;
    currentScore1.innerHTML = 0;
    currentScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


}

function init() { //Function to initialize the variables of the game


    //The dices wont appear on screen till we start playing
    hideDices();//With this I can manipulate CSS with JS

    //Inicialization of all the scores to 0
    totalScore0 = document.getElementById("score-0");
    totalScore1 = document.getElementById("score-1");
    currentScore0 = document.getElementById("current-0");
    currentScore1 = document.getElementById("current-1");

    currentScore = 0;
    totalScores = [0, 0];
    activePlayer = 0;
    totalScore0.innerHTML = 0;
    totalScore1.innerHTML = 0;
    currentScore0.innerHTML = 0;
    currentScore1.innerHTML = 0;

    player1 = document.getElementById("name-0");
    player2 = document.getElementById("name-1");
    player1.innerHTML = "Player 1";
    player2.innerHTML = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;

}

function hideDices(){
    document.getElementById("dice-1").style.display="none";
    document.getElementById("dice-2").style.display="none";
}
