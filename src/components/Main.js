/* eslint-disable operator-linebreak */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {Button, Container, Paper, Stack, Typography, TextField} from '@material-ui/core';
import Piece from './Piece';
import BoardStatusText from './BoardStatusText';
import EnterMoves from './EnterMoves';
import {createBoard} from '../chess/createBoard';
import {isValidMove} from '../utils/isValidMove';
import {stringToBoardPosition} from '../utils//stringToBoardPosition';

export default function Main(props) {
  const [board, setBoard] = React.useState();
  const [moveStr, setMoveStr] = React.useState('');
  const [withinTurns, setWithinTurns] = React.useState();
  const [isStalemate, setIsStalemate] = React.useState(false);
  const [checkmatedColor, setCheckmatedColor] = React.useState(null);
  const [currTurn, setcurrTurn] = React.useState(0);
  const [boardNums, setBoardNums] = React.useState([8, 7, 6, 5, 4, 3, 2, 1]);
  const [boardLetters, setBoardLetters] = React.useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  let [spaceColor, setSpaceColor] = React.useState('d');

  async function getBoardAndReset() {
    const res = await fetch(`http://localhost:5000/`);
    if (res.ok) {
      const bd = await res.json();
      const newBoard = createBoard();
      const boardWithPieces = bd.brd.puzzleBoard.board;
      // Iterate over all positions and add pieces to newBoard
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          const posOrPiece = boardWithPieces[x][y];
          if (posOrPiece !== '____') {
            newBoard.addPiece(x, y, posOrPiece.color, posOrPiece.pieceType);
          }
        }
      }

      setBoard(newBoard);
      setWithinTurns(bd.brd.findCheckmateWithin);
      setIsStalemate(false);
      setCheckmatedColor(null);
      setcurrTurn(0);
    }
  }

  React.useEffect(() => {
    getBoardAndReset();
  }, []);

  function boardRow(rowArr, rowIdx) {
    return (
      <Stack className='boardRow' key={rowIdx} direction='row' spacing={0} justifyContent='center'>
        <Typography className='boardNumber'>{boardNums[rowIdx]}</Typography>
        {rowArr.map((spaceOrPiece, spaceIdx) => {
          return (boardLocation(spaceOrPiece, rowIdx, spaceIdx));
        })}
      </Stack>
    );
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
    return (<Piece spaceOrPiece={spaceOrPiece} spaceColor={spaceColor}/>);
  }

  function handleMoveChange(e) {
    setMoveStr(e.target.value);
  }

  async function handleSubmit(e) {
    if (e.key === 'Enter') {
      console.log('Enter key pressed.');
      console.log(moveStr);
      const moveValid = isValidMove(moveStr, board);
      // If the move is valid, modify the board with the move,
      // and send to backend
      if (moveValid) {
        const [moveStrStart, moveStrEnd] = moveStr.split(' ');
        const [moveStartX, moveStartY] = stringToBoardPosition(moveStrStart);
        const [moveEndX, moveEndY] = stringToBoardPosition(moveStrEnd);
        const newBoard = board.copyBoard();
        // Save piece from start pos
        const savedPieceColor = newBoard.board[moveStartX][moveStartY].color;
        const savedPieceType = newBoard.board[moveStartX][moveStartY].pieceType;
        // Remove piece from start pos
        newBoard.removePiece(moveStartX, moveStartY);
        // Remove piece at end pos
        newBoard.removePiece(moveEndX, moveEndY);
        // Place saved piece at end pos
        newBoard.addPiece(moveEndX, moveEndY, savedPieceColor, savedPieceType);
        setBoard(newBoard);
        setcurrTurn(currTurn + 1);

        try {
          const res = await fetch(`http://localhost:5000/move`, {
            method: 'POST',
            body: JSON.stringify(newBoard),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) {
            console.log(res);
            throw res;
          } else if (res.ok) {
            const resJson = await res.json();
            console.log(resJson);
            if (resJson.stalemate === true) {
              setIsStalemate(true);
            } else if (resJson.checkmated === 'b') {
              setCheckmatedColor('b');
            } else if (resJson.move) {
              const nextBoard = createBoard();
              const boardWithPieces = resJson.move.board;
              for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                  const posOrPiece = boardWithPieces[x][y];
                  if (posOrPiece !== '____') {
                    nextBoard.addPiece(x, y, posOrPiece.color, posOrPiece.pieceType);
                  }
                }
              }
              setBoard(nextBoard);
              setcurrTurn(currTurn + 2);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
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
      <Paper elevation={3} className='boardContainer'>
        { board ?
          board.board.map((rowArr, rowIdx) => {
            return (boardRow(rowArr, rowIdx));
          }) :
          <Typography>No board found. Please reload the page and try again.</Typography>
        }
        { board ?
          <>
            <Stack direction='row' spacing={0} justifyContent='center'>
              <Typography className='boardLetters'>{boardLetters.map((letter)=>letter)}</Typography>
            </Stack>
            <BoardStatusText isStalemate={isStalemate} checkmatedColor={checkmatedColor} currTurn={currTurn} withinTurns={withinTurns}/>
            <EnterMoves isStalemate={isStalemate} checkmatedColor={checkmatedColor} handleMoveChange={handleMoveChange} handleSubmit={handleSubmit} handleSubmitClick={handleSubmitClick}/>
            <Button onClick={getBoardAndReset} variant="outlined">New Puzzle</Button>
          </> :
          <></>
        }
      </Paper>
    </Container>
  );
}
