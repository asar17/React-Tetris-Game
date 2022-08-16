import {useState,useCallback,useEffect,useMemo} from 'react'
export const useGameStatus=(rowsCleared)=>{
    const [score,setScore]=useState(0);
    const [row,setRow]=useState(0);
    const [level,setLevel]=useState(0);
    
    //gain one row   =>score is 40
    //gain two rows  =>score is 100
    //gain three rows =>score is 300
    //gain four rows =>score is 1200
   
 
    const linePoints=[40,100,300,1200];

    //function calculate score
    const calcScore=useCallback(()=>{
        if(rowsCleared>0){
            setScore(prev=>prev+linePoints[rowsCleared-1]* (level + 1));
            setRow(prev=>prev+rowsCleared)
        }
    },[rowsCleared,level,linePoints])


    //run calcSCore function
    useEffect(()=>{
        calcScore()
    },[calcScore,rowsCleared,score])
    
    return[score,setScore,row,setRow,level,setLevel];
}