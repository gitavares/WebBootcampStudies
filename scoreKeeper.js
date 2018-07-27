var playerOne = document.getElementById("p1");
var playerTwo = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var scorePlayerOne = document.getElementById("scorePlayer1");
var scorePlayerTwo = document.getElementById("scorePlayer2");
var playingToNumber = document.getElementById("playingToNumber");
// var numInput = document.querySelector("input[type='number']")
var numInput = document.querySelector("input");
var countPlayerOneScore = 0;
var countPlayerTwoScore = 0;
var gameOver = false;
var winningScore = 5;


playerOne.addEventListener("click", function(){
    if(!gameOver){
        countPlayerOneScore++;
        isGameOver(countPlayerOneScore, scorePlayerOne);   
        scorePlayerOne.textContent = countPlayerOneScore;
    }
});

playerTwo.addEventListener("click", function(){
    if(!gameOver){
        countPlayerTwoScore++;
        isGameOver(countPlayerTwoScore, scorePlayerTwo);    
        scorePlayerTwo.textContent = countPlayerTwoScore;
    }
})

resetButton.addEventListener("click", function(){
    reset();
})

numInput.addEventListener("change", function(){
    var newNumber = parseInt(numInput.value);
    if(newNumber > 0){
        playingToNumber.textContent = newNumber;
        winningScore = newNumber;
        reset();
    }
});

function isGameOver(score, playerDisplay){
    if(winningScore === score){
        playerDisplay.classList.add("winner"); 
        return gameOver = true;
    }
}

function reset(){
    countPlayerOneScore = 0;
    countPlayerTwoScore = 0;
    gameOver = false;
    scorePlayerOne.textContent = 0;
    scorePlayerTwo.textContent = 0;
    scorePlayerOne.classList.remove("winner");
    scorePlayerTwo.classList.remove("winner");
}



