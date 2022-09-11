
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
    const gameBoardHTML = document.getElementById("gameboard");
    const gameBoardSquare = gameBoardHTML.querySelectorAll("td");
    
    let gameBoard = GameBoard.map((x) => x) ;
    let isPlayerTurn = true;
    let playerGameMark = "X";
    
    const bindEvents = function() 
    {
        for(let i = 0; i < gameBoardSquare.length; i++)
        {

            gameBoardSquare[i].addEventListener("click", function(event)
            {
                changeTurn(addXorO(event));
                checkScore();
            })
        }    
    };

    const render = function()
    {

    };

    const checkScore = function()
    {
        /* Check the player 1 score horizontally */
        if((gameBoard[1] === "X" && gameBoard[2] === "X" && gameBoard[3] === "X") || (gameBoard[4] === "X" && gameBoard[5] === "X" && gameBoard[6] === "X") || (gameBoard[7] === "X" && gameBoard[8] === "X" && gameBoard[9] === "X"))
        {
            alert("You win");
        }
        /* Check the player 1 score vertically*/
        else if((gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") || (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X") || (gameBoard[3] === "X" && gameBoard[6] === "X" && gameBoard[9] === "X"))
        {
            alert("You win");
        }
        /* Check the player 1 score diagonally */
        else if((gameBoard[1] === "X" && gameBoard[5] === "X" && gameBoard[9] === "X") || (gameBoard[3] === "X" && gameBoard[5] === "X" && gameBoard[7] === "X"))
        {
            alert("You win");
        }
        /* Check the opponent score horizontally */
        if((gameBoard[1] === "O" && gameBoard[2] === "O" && gameBoard[3] === "O") || (gameBoard[4] === "O" && gameBoard[5] === "O" && gameBoard[6] === "O") || (gameBoard[7] === "O" && gameBoard[8] === "O" && gameBoard[9] === "O"))
        {
            alert("You lose");
        }
        /* Check the opponent score vertically*/
        else if((gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") || (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O") || (gameBoard[3] === "O" && gameBoard[6] === "O" && gameBoard[9] === "O"))
        {
            alert("You lose");
        }
        /* Check the opponent score diagonally */
        else if((gameBoard[1] === "O" && gameBoard[5] === "O" && gameBoard[9] === "O") || (gameBoard[3] === "O" && gameBoard[5] === "O" && gameBoard[7] === "O"))
        {
            alert("You lose");
        }
        else 
        {
            alert("It's a tie");
        }
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
        console.log(e.target);
        let gameBoardIndex = Number(e.target.getAttribute("data-cell"));
        

        if(gameBoard[gameBoardIndex] === null)
        {
            gameBoard[gameBoardIndex] = playerGameMark;
            console.log(gameBoard[gameBoardIndex]);
            console.log(gameBoard);

            return true;
        }

        return false;
    };

    bindEvents();

};

let myGame = GameController(GameBoard);

/*Need to collect name after the page finishes loading */
let player = Player(document.querySelector("#player-1-card input").value);
let opponent = Player(document.querySelector("#player-2-card input").value);
