import React from 'react';
import {Cell} from './index'
import {StyledStage} from './styles/StyledStage'
const Stage =({stage})=>{
    return(
    <StyledStage width={stage[0].length} height={stage.length}>
        {/* looping the first array of length[20,height] then looping for each index in this array[12,width] */}
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        
        </StyledStage>
    )
};
export default Stage