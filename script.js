const gridBox = document.body.querySelector('.grid-box');
const playerTurnDisplay = document.querySelector('.player-turn-display');
const newGameBtn = document.querySelector('.new-game');
const winnerPlayer = document.querySelector('.winner');
const winnerMessage = document.querySelector('.winner-message');
const tiles = document.querySelectorAll('.tiles');


gridBox.addEventListener('click', (event)=> {
    if (!event.target.classList.contains('tiles')) return;
    const index = event.target.dataset.index;
    gameController.playerTurn(parseInt(index), event.target);
})


newGameBtn.addEventListener('click', () => {
    gameController.reset()
} )




function createPlayer(name, mark){
        return {
            name: name,
            mark: mark
        }
}


const gameboard = (() => {
    return {
    
    markTiles: function(mark, index){
        this.tiles[index] = mark;
    },

    tiles: [null, null, null, null, null, null, null, null, null],

    winCondition: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],

    condition: function(mark) {
       return this.winCondition.some(element => {
           return element.every(m => mark === this.tiles[m])})
    }, 

    tie: function() {
         if(this.tiles.every(t => t !== null))
            return true
    }    
}
})()




const gameController = (() => {
    const player1 = createPlayer("Player 1","x");
    const player2 = createPlayer("Player 2","o");
    let currentPlayer = player1;
    let gameover = false;

    return {
        playerTurn: function(clickedIndex, clickedTile){
            console.log(clickedIndex, clickedTile);
            console.log(currentPlayer);
            
            if(gameover) return;

            if(gameboard.tiles[clickedIndex] != null){
                console.log("Alrady hit");                
                return;
            }      

            clickedTile.classList.add(currentPlayer == player1 ? 'x-mark' : 'o-mark');
            clickedTile.textContent = currentPlayer.mark;
            playerTurnDisplay.className = currentPlayer == player1 ? 'o-turn' : 'x-turn'; 
            playerTurnDisplay.textContent = (currentPlayer == player1 ? player2.mark : player1.mark); 
            

            gameboard.markTiles(currentPlayer.mark, clickedIndex)

            if(gameboard.condition(currentPlayer.mark)){
                gameover = true;
                console.log(`${currentPlayer.name} is a winner`);
                const markClass = (currentPlayer == player1 ? "winner-1" : "winner-2") 
                winnerMessage.innerHTML = `<h3>Player  <span class ="${markClass}">${currentPlayer.mark}</span>  is a winner</h3>`
                return                
            } 

            if(gameboard.tie()){
                gameover = true;
                console.log(`It is a tie`);
                winnerMessage.innerHTML = `<h3>It's a tie!</h3>`;
                return 
            } 
            
    
            if(currentPlayer == player1){           
                currentPlayer = player2;
            }else {
                currentPlayer = player1;
            }
       },

       reset: function(){

        let i = 0;
        while (i < gameboard.tiles.length){
            gameboard.tiles[i] = null;
            i++
        }
    
        tiles.forEach(tile => {
            tile.textContent = "";
            tile.classList.remove("x-mark", "o-mark");
            playerTurnDisplay.className = "default-turn"
        })

        currentPlayer = player1;    
        gameover = false;
        playerTurnDisplay.textContent = player1.mark;
        winnerMessage.textContent = "";
       }
 }
})()


gameController.reset()



