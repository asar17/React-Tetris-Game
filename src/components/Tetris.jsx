import React,{useState} from 'react';
//main components
import {Stage,Display,StartButton} from './index'
//styled components
import { StyledTetrisWrapper,StyledTetris } from './styles/StyledTetris';
//custom hooks
import {usePlayer,useStage,useInterval,useGameStatus} from '../hooks'
//function  Check that our move is inside the game areas height and width
import {createStage,checkCollision} from '../gameHelpers.js'
const Tetris = () => {
    const [gameOver,setGameOver]=useState(false)
    const [dropTime,setDropTime]=useState(null)
    //to get player
    const [player,updatePlayerPos,resetPlayer,playerRotate]=usePlayer()
    //to get stage
    const [stage,setStage,rowsCleared]=useStage(player,resetPlayer)
    //to get SCore
    const [score,setScore,row,setRow,level,setLevel]=useGameStatus(rowsCleared);
    console.log("number of row",rowsCleared)
    //moving palyer to change position
    const movePlayer = dir => {
        if(!checkCollision( player, stage, { x: dir, y: 0})){
               updatePlayerPos({ x: dir, y: 0})
        }
    }
   
    //to start game
    const startGame = () =>{
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRow(0);
        setLevel(0);

    }

    //drop palyer by keyboard down arrow by 2 steps
    //first 
    const drop = () =>{
        //increase level
        if(row > (level+1)*5){
            setLevel(prev=>prev+1)
        }
        if(!checkCollision( player, stage, { x: 0, y: 1})){
           updatePlayerPos({ x: 0, y: 1, collided: false })
        }
        else {
            // Game over!
            if ( player.pos.y < 1 ) {
              setGameOver(true);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
          }
    }


    //leave keyboard
    const keyUp =({keyCode})=>{
        if(!gameOver){
            if(keyCode ===40){
                setDropTime(1000)
            }
        }
    }
    //second
    const dropPlayer = () =>{
        setDropTime(null);
        drop();
    }
    
    //moviment by keyboard arrows
    const move=({ keyCode })=>{
        console.log("key",keyCode)
        if (!gameOver) {
            if ( keyCode === 37 ) {
               movePlayer(-1);
            }
            else if ( keyCode === 39 ) {
                movePlayer(1);
            }
            else if ( keyCode === 40 ) {
                dropPlayer();
            }
             else if ( keyCode === 38 ) {
                 playerRotate(stage,1);
             }
            
            

        }
    }
    useInterval(()=>{
        drop()
    },dropTime)

    

     return(
        <StyledTetrisWrapper 
        role="button"
        //when focus out of game 
        tabIndex="0"
        //touch keyboard 
        onKeyDown={e=>move(e)}
        //leave keyboard
        onKeyUp={keyUp}
        >
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {
                        gameOver?
                        (<Display gameOver={gameOver} text="Game Over"/>)
                        :
                        (
                          <div>
                                <Display text={`Score : ${score}`} />
                                <Display text={`Row : ${row}`}/>
                                <Display text={`Level : ${level}`}/>
                          </div>
                        )
                    }
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;





