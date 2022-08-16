import React from 'react';
import {StyledCell} from './styles/StyledCell'
import {TETROMINOS} from '../tetrominos'
// get the color from TETROMINOS object in page tetrominos.js depend on the letter 
const Cell =({type})=>(
    <StyledCell type={type} color={TETROMINOS[type].color} />
      
)
export default Cell;