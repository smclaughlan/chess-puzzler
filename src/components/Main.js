import React from 'react';
import {Button, Container, Paper, Stack, Typography, TextField } from '@material-ui/core';
import Piece from './Piece';
import {createBoard} from '../chess/createBoard';
import {isValidMove} from '../utils/isValidMove';

export default function Main(props) {
  const [board, setBoard] = React.useState();
  const [moveStr, setMoveStr] = React.useState('');
  const [withinTurns, setWithinTurns] = React.useState();
  const [currTurn, setcurrTurn] = React.useState(0);
  const [boardNums, setBoardNums] = React.useState([8, 7, 6, 5, 4, 3, 2, 1]);
  const [boardLetters, setBoardLetters] = React.useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  let [spaceColor, setSpaceColor] = React.useState('d');

  React.useEffect(() => {
    async function getBoardFetch() {
      const res = await fetch(`http://localhost:5000/`);
      if (res.ok) {
        const bd = await res.json();
        const newBoard = createBoard();
        const boardWithPieces = bd.brd.puzzleBoard.board;
        // Iterate over all positions and add pieces to newBoard
        for(let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            const posOrPiece = boardWithPieces[x][y];
            if (posOrPiece !== '____') {
              newBoard.addPiece(x, y, posOrPiece.color, posOrPiece.pieceType);
            }
          }
        }

        setBoard(newBoard);
        setWithinTurns(bd.brd.findCheckmateWithin);
      }
    }

    getBoardFetch();
  }, []);

  function boardRow(rowArr, rowIdx) {
    return (
      <Stack key={rowIdx} direction='row' spacing={0}>
        <Typography className='boardNumber'>{boardNums[rowIdx]}</Typography>
        {rowArr.map((spaceOrPiece, spaceIdx) => {
          return (boardLocation(spaceOrPiece, rowIdx, spaceIdx))
        })}
      </Stack>
    )
  }

  function boardLocation(spaceOrPiece, rowIdx, spaceIdx) {
    const rowIdxIsEven = rowIdx % 2 === 0;
    const spaceIdxIsEven = spaceIdx % 2 === 0;
    if (rowIdxIsEven) {
      if (spaceIdxIsEven) {
        spaceColor = 'l';
      } else {
        spaceColor = 'd';
      }
    } else { // rowIdx is odd
      if (spaceIdxIsEven) {
        spaceColor = 'd';
      } else {
        spaceColor = 'l';
      }
    }
    if (spaceOrPiece === '____') {
      spaceOrPiece = spaceColor;
    }
    return (<Piece spaceOrPiece={spaceOrPiece} spaceColor={spaceColor}/>)
  }

  function handleMoveChange(e) {
    setMoveStr(e.target.value);
  }

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      console.log('Enter key pressed.');
      console.log(moveStr);
      const moveValid = isValidMove(moveStr, board);
      // If the move is valid, modify the board with the move,
      // and send to backend
      // if (moveValid) {

      // }
    }
  }

  function handleSubmitClick() {
      console.log(moveStr);
      const moveValid = isValidMove(moveStr, board);
      // If the move is valid, modify the board with the move,
      // and send to backend
      // if (moveValid) {
      // }
  }


  return (
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          board.board.map((rowArr, rowIdx) => {
            return (boardRow(rowArr, rowIdx))
          })
          :
          <Typography>No board found. Please reload the page and try again.</Typography>
        }
        { board ?
          <>
            <Stack direction='row' spacing={0}>
              <Typography className='boardLetters'>{boardLetters.map(letter=>letter)}</Typography>
            </Stack>
            <Typography>Try to find checkmate for white within {withinTurns} turns. This is turn {currTurn}.</Typography>
            <div className='moveFieldParent'>
              <TextField label="Enter move (ie 'c5 c6')" variant="outlined" onChange={handleMoveChange} onKeyUp={handleSubmit}/>
              <Button onClick={handleSubmitClick}>Submit Move</Button>
            </div>
          </>
          :
          <></>
        }
      </Container>
  )
}
