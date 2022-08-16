import {useState,useCallback} from 'react'
import {randomTetromino, TETROMINOS} from '../tetrominos'
import {STAGE_WIDTH,checkCollision} from '../gameHelpers'


export const usePlayer=()=>{
  
  const [player,setPlayer]=useState({
    pos:{x:0,y:0},
    tetromino: TETROMINOS[0].shape,
    collided:false  
  })
  //rotate shape 
  //first
  const rotate=(matrix,dir)=>{
   // [transpose matrix] make the column to be row
    const mtrx=matrix.map((_,index)=>player.tetromino.map((c)=>c[index]))
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();

  }
  //second
  const playerRotate=(stage,dir)=>{
   const clonePlayer=JSON.parse(JSON.stringify(player))
    clonePlayer.tetromino=rotate(clonePlayer.tetromino,dir)
    const pos = clonePlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonePlayer, stage, { x: 0, y: 0 })) {
      clonePlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonePlayer.tetromino[0].length) {
        rotate(clonePlayer.tetromino, -dir);
        clonePlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonePlayer)
    
  }



  //update player position
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x+x), y: (prev.pos.y+y) },
      collided,
    }));
  };
  

  //reset player
  const resetPlayer=useCallback(() => {
     setPlayer({
       pos:{x:STAGE_WIDTH/2-2,y:0},
       tetromino: randomTetromino().shape,
       collided:false
     })
  },[])
    return [player,updatePlayerPos,resetPlayer,playerRotate]
}



// import { useState, useCallback } from 'react';

// import { TETROMINOS, randomTetrominos } from '../tetrominos';
// import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

// export const usePlayer = () => {
//   const [player, setPlayer] = useState({
//     pos: { x: 0, y: 0 },
//     tetrominos: TETROMINOS[0].shape,
    
//     collided: false,
//   });

//   function rotate(matrix, dir) {
//     // Make the rows to become cols (transpose)
//     const mtrx = matrix.map((_, index) => matrix.map(column => column[index]));
//     // Reverse each row to get a rotaded matrix
//     if (dir > 0) return mtrx.map(row => row.reverse());
//     return mtrx.reverse();
//   }

//   function playerRotate(stage, dir) {
//     const clonedPlayer = JSON.parse(JSON.stringify(player));
//     clonedPlayer.tetrominos = rotate(clonedPlayer.tetrominos, dir);

//     const pos = clonedPlayer.pos.x;
//     let offset = 1;
//     while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
//       clonedPlayer.pos.x += offset;
//       offset = -(offset + (offset > 0 ? 1 : -1));
//       if (offset > clonedPlayer.tetrominos[0].length) {
//         rotate(clonedPlayer.tetrominos, -dir);
//         clonedPlayer.pos.x = pos;
//         return;
//       }
//     }
//     setPlayer(clonedPlayer);
//   }

//   const updatePlayerPos = ({ x, y, collided }) => {
//     setPlayer(prev => ({
//       ...prev,
//       pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
//       collided,
//     }));
//   };

//   const resetPlayer = useCallback(() => {
//     setPlayer({
//       pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
//       tetromino: randomTetrominos().shape,
//       collided: false,
//     });
//   }, []);

//   return [player, updatePlayerPos, resetPlayer, playerRotate];
// };
