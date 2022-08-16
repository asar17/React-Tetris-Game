//You should export this object to return value of randomTetrominos function at the end of page
export const TETROMINOS = {
  0: { shape: [[0]], color: '0,0,0' },
  I: {
    shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
    color: '80, 227, 230',
  },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: '36, 95, 223' },
  L: {
    shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
    color: '223, 173, 36',
  },
  O: { shape: [['O', 'O'], ['O', 'O']], color: '223, 217, 36' },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: '48, 211, 56' },
  T: {
    shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]],
    color: '132, 61, 198',
  },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: '227, 78, 78' },
};
 //to make random letter
 export const randomTetromino =()=> {
     const tetrominos='IJLOSTZ';
     //randomTetrominos=>get the random letter from above string
     //tetroMinos[......]=>get the random index in range of above string
     const randTetromino=tetrominos[Math.floor(Math.random()*tetrominos.length)]
     //to acces any key in TETROMINOS object using any letter such as ===>TETROMINOS[k] return the shape and color
     return TETROMINOS[randTetromino]
    }
  