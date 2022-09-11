"use strict";

const AppDisplay = function()
{
    const gameStartScreen = document.getElementsByClassName("game-start-screen")[0];
    const playerCard = gameStartScreen.querySelector("#player-1-card");
    const opponentCard = gameStartScreen.querySelector("#player-2-card");
    const continueButton = gameStartScreen.querySelector("#continueButton");

    const gameScreen = document.getElementById("game-screen");
    const scoreBoard = document.getElementById("scoreboard");

    const startGame = function()
    {
        continueButton.addEventListener("click", function()
        {
            if(playerCard.querySelector("input").value === "")
            {
                playerCard.querySelector("input").classList.add("name-error");
                playerCard.querySelector(".name-error-msg").style.display = "block";
            }

            if(opponentCard.querySelector("input").value === "")
            {
                opponentCard.querySelector("input").classList.add("name-error");
                opponentCard.querySelector(".name-error-msg").style.display = "block";
            }

            if(opponentCard.querySelector("input").value !== "" && playerCard.querySelector("input").value !== "")
            {
                gameStartScreen.style.display = "none";
                gameScreen.style.display = "grid";

                scoreBoard.querySelector("#gamer-1-name").textContent = playerCard.querySelector("input").value;
                scoreBoard.querySelector("#gamer-2-name").textContent = opponentCard.querySelector("input").value;
            }
        })

        playerCard.querySelector("input").addEventListener("input", function()
        {
            if(playerCard.querySelector("input").value !== "")
            {
                playerCard.querySelector("input").classList.remove("name-error");
                playerCard.querySelector(".name-error-msg").style.display = "none";
            }
        })

        opponentCard.querySelector("input").addEventListener("input", function()
        {
            if(opponentCard.querySelector("input").value !== "")
            {
                opponentCard.querySelector("input").classList.remove("name-error");
                opponentCard.querySelector(".name-error-msg").style.display = "none";
            }
        })

    }


    startGame();
}();

const Player = function(name)
{
    const getName = function()
    {
        const playerName = `Player Name: ${name}`;
        console.log(playerName);

        return playerName;
    }

    return {getName}
};

const GameBoard = function()
{
    const gameBoard = [undefined, 
        null, null, null,
        null, null, null,
        null, null, null];

   return gameBoard;

}();

const GameController = function(GameBoard)
{
    const gameScreen = document.getElementById("game-screen")
    const gameBoardHTML = document.getElementById("gameboard");
    const gameBoardSquare = gameBoardHTML.querySelectorAll("td");
    const gameResults = gameScreen.querySelector("header #game-results");
    
    let gameBoard = GameBoard.map((x) => x) ;
    let isPlayerTurn = true;
    let playerGameMark = "X";
    
    let opponentScore = 0;
    let playerScore = 0;

    const boardEvents = function(event)
    {
        changeTurn(addXorO(event));
        checkScore();
    }

    
    const bindEvents = function() 
    {       
            for(let i = 0; i < gameBoardSquare.length; i++)
            {
                gameBoardSquare[i].addEventListener("click", boardEvents)
            }  
        
        const restartButton = gameScreen.querySelector("#restart-btn");

        restartButton.addEventListener("click", function()
        {
            restartGame();
        })
    };

    const removeEvents = function()
    {
        console.log(gameBoardHTML.getAttribute("disabled"));

        if(gameBoardHTML.getAttribute("disabled") === "true")
        {
            for(let i = 0; i < gameBoardSquare.length; i++)
            {
                gameBoardSquare[i].removeEventListener("click", boardEvents);
            }  
        }
    }

    const checkScore = function()
    {
        /* Check the player 1 score horizontally */
        if((gameBoard[1] === "X" && gameBoard[2] === "X" && gameBoard[3] === "X") || (gameBoard[4] === "X" && gameBoard[5] === "X" && gameBoard[6] === "X") || (gameBoard[7] === "X" && gameBoard[8] === "X" && gameBoard[9] === "X"))
        {
            gameResults.textContent = "You Win!"
            gameResults.classList.add("player-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            playerScore = addScore(playerScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[0].textContent = `${playerScore}`;
        }
        /* Check the player 1 score vertically*/
        else if((gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") || (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X") || (gameBoard[3] === "X" && gameBoard[6] === "X" && gameBoard[9] === "X"))
        {
            gameResults.textContent = "You Win!"
            gameResults.classList.add("player-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            playerScore = addScore(playerScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[0].textContent = `${playerScore}`;
        }
        /* Check the player 1 score diagonally */
        else if((gameBoard[1] === "X" && gameBoard[5] === "X" && gameBoard[9] === "X") || (gameBoard[3] === "X" && gameBoard[5] === "X" && gameBoard[7] === "X"))
        {
            gameResults.textContent = "You Win!"
            gameResults.classList.add("player-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            playerScore = addScore(playerScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[0].textContent = `${playerScore}`;
        }
        /* Check the opponent score horizontally */
        if((gameBoard[1] === "O" && gameBoard[2] === "O" && gameBoard[3] === "O") || (gameBoard[4] === "O" && gameBoard[5] === "O" && gameBoard[6] === "O") || (gameBoard[7] === "O" && gameBoard[8] === "O" && gameBoard[9] === "O"))
        {
            gameResults.textContent = "You Lose!"
            gameResults.classList.add("opponent-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            opponentScore = addScore(opponentScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[1].textContent = `${opponentScore}`;
        }
        /* Check the opponent score vertically*/
        else if((gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") || (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O") || (gameBoard[3] === "O" && gameBoard[6] === "O" && gameBoard[9] === "O"))
        {
            gameResults.textContent = "You Lose!"
            gameResults.classList.add("opponent-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            opponentScore = addScore(opponentScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[1].textContent = `${opponentScore}`;
        }
        /* Check the opponent score diagonally */
        else if((gameBoard[1] === "O" && gameBoard[5] === "O" && gameBoard[9] === "O") || (gameBoard[3] === "O" && gameBoard[5] === "O" && gameBoard[7] === "O"))
        {
            gameResults.textContent = "You Lose!"
            gameResults.classList.add("opponent-won");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);

            opponentScore = addScore(opponentScore);
            gameScreen.querySelectorAll("#scoreboard .gamer-score-number")[1].textContent = `${opponentScore}`;
        }
        else if(gameBoard[1] !== null && gameBoard[2] !== null && gameBoard[3] !== null && gameBoard[4] !== null && gameBoard[5] !== null &&  gameBoard[6] !== null && gameBoard[7] !== null && gameBoard[8] !== null && gameBoard[9] !== null)
        {
            gameResults.textContent = "It's a tie!"
            gameResults.classList.add("player-opponent-tie");
            gameResults.style.display = "block";
            gameBoardHTML.setAttribute("disabled", true);
        }

        removeEvents();
    };

    const changeTurn = function(turnCompleted)
    {
        if(turnCompleted && playerGameMark ==="X")
        {
            isPlayerTurn = false;
            playerGameMark = "O"
        }
        else if(turnCompleted && playerGameMark ==="O")
        {
            isPlayerTurn = true;
            playerGameMark = "X"
        }
    };

    const addXorO = function(e)
    {
        let gameBoardIndex = Number(e.target.getAttribute("data-cell"));
        

        if(gameBoard[gameBoardIndex] === null)
        {
            gameBoard[gameBoardIndex] = playerGameMark;
            e.target.textContent = playerGameMark;
            console.log(gameBoard[gameBoardIndex]);
            console.log(gameBoard);

            return true;
        }

        return false;
    };

    const restartGame = function()
    {
        playerGameMark = "X";
        gameBoardHTML.setAttribute("disabled", false);

        for(let i =1; i < gameBoard.length; i++)
        {
            gameBoard[i] = null;
        }

        for(let i = 0; i < gameBoardSquare.length; i++)
        {

            gameBoardSquare[i].textContent = "";
        }

        gameResults.style.display = "block";
        gameResults.textContent = "";
        gameResults.removeAttribute("class");

        bindEvents();
        
    }

    const addScore = function(score) 
    {
        score += 1;

        return score;
    };

    bindEvents();

};

let myGame = GameController(GameBoard);

