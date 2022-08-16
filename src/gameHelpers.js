//to make height of game
export const STAGE_HEIGHT=20;
//to make width of game
export const STAGE_WIDTH=12;

//to make the background [2d array]
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

//function  Check that our move is inside the game areas height and width
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for(let y=0;y<player.tetromino.length;y++){
    for(let x=0;x<player.tetromino[y].length;x++){
      if(player.tetromino[y][x] !==0){
        if(
          !stage[y+player.pos.y+moveY]||
          !stage[y+player.pos.y+moveY][x+player.pos.x+moveX]||
          stage[y+player.pos.y+moveY][x+player.pos.x+moveX][1] !=='clear'
          ){
          return true
        }
      }
    }
  }
  return false
}
