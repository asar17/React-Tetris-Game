import {useState,useEffect} from 'react';
import {createStage} from '../gameHelpers';

export const useStage =(player,resetPlayer) => {
    const [stage,setStage]=useState(createStage());
    const [rowsCleared,setRowsCleared]=useState(0);
  
    useEffect(() => {

      setRowsCleared(0)
      const sweepRows = newStage => 
        newStage.reduce((ack, row) => {
        //  console.log("row",row);
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            setRowsCleared(rowsCleared+1);
            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
         // console.log("ack",ack);
          return ack;
        },[]);
      

     //update array by tetrominos 
    const updateStage = prevStage => {
       const newStage = prevStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
        // Then draw the tetromino
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              // console.log("y",player.pos.y)
              // console.log("x",player.pos.x)

              newStage[y + player.pos.y ][x + player.pos.x] = [
                value,
                `${player.collided ? 'merged' : 'clear'}`,
              ];
            }
          });
        });


       
        // Then check if we got some score if collided
        if (player.collided) {
          resetPlayer();
         return sweepRows(newStage)
        }
        return newStage;
      };
  
      // Here are the updates
      setStage(prev => updateStage(prev));
    }
    ,[player.tetromino,player.pos.y,player.pos.x,player.collided,resetPlayer])

    return [stage,setStage,rowsCleared]
}



