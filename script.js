function createPlayer(name, mark){
        return {
            name: name,
            mark: mark
        }
}



const gameboard = (() =>   {
    return {
    
    markTiles: function(mark, index){
        if(this.tiles[index] === null){
         this.tiles[index] = mark; 
        } else{
            console.log("Alreay marked");
            return;
        } 
        
    },

    tiles: ["o", "o", "o", null, null, null, null, null, null],

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
        playerTurn: function(clicked){
            if(gameover) return;
            gameboard.markTiles(currentPlayer.mark, clicked)          
            if(gameboard.condition(currentPlayer.mark)){
                gameover = true;
                return `${currentPlayer.name} is a winner`
            } 
            if(gameboard.tie()){
                gameover = true;
                return `It is a tie`
            } 
            
            if(currentPlayer == player1){           
                currentPlayer = player2
            }else{
                currentPlayer = player1; 
            }
       }
 }
})()




// gameboard.markTiles(playerMark, index)
// gameboard.markTiles(playerMark, index)
console.log(gameController.playerTurn(0));
// console.log(gameboard.tie());
// gameController.playerTurn(0)
// console.log(gameboard.tiles)
// console.log(gameboard.condition("x"));
// console.log(gameboard.markTiles("o", 0));

