/* eslint-disable operator-linebreak */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {Button, Container, Paper, Stack, Typography, TextField} from '@material-ui/core';
import Piece from './Piece';
import BoardStatusText from './BoardStatusText';
import EnterMoves from './EnterMoves';
import TopBar from './TopBar';
import Footer from './Footer';
import {createBoard} from '../chess/createBoard';
import {isValidMove} from '../utils/isValidMove';
import {defaultBoard} from '../utils/defaultBoard';
import {stringToBoardPosition} from '../utils/stringToBoardPosition';
import {boardPositionToString} from '../utils/boardPositionToString';
import {apiBaseUrl} from '../config';

export default function Main(props) {
  const [board, setBoard] = React.useState(defaultBoard);
  const [savedBoard, setSavedBoard] = React.useState();
  const [moveStr, setMoveStr] = React.useState('');
  const [clickMoveStr, setClickMoveStr] = React.useState('');
  const [withinTurns, setWithinTurns] = React.useState();
  const [isStalemate, setIsStalemate] = React.useState(false);
  const [checkmatedColor, setCheckmatedColor] = React.useState(null);
  const [currTurn, setcurrTurn] = React.useState(0);
  const [boardNums, setBoardNums] = React.useState([8, 7, 6, 5, 4, 3, 2, 1]);
  const [boardLetters, setBoardLetters] = React.useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  let [spaceColor, setSpaceColor] = React.useState('d');

  async function getBoardAndReset() {
    try {
      const res = await fetch(`${apiBaseUrl}/`);
      if (!res.ok) {
        console.log('Error: ', res);
      } else {
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
          setSavedBoard(newBoard);
          setWithinTurns(bd.brd.findCheckmateWithin);
          setIsStalemate(false);
          setCheckmatedColor(null);
          setClickMoveStr('');
          setcurrTurn(0);
      }
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getBoardAndReset();
  }, []);

  function resetBoard() {
    setBoard(savedBoard);
    setIsStalemate(false);
    setClickMoveStr('');
    setCheckmatedColor(null);
    setcurrTurn(0);
  }

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
    return (<Piece key={spaceIdx} spaceOrPiece={spaceOrPiece} spaceColor={spaceColor} handlePositionClick={handlePositionClick} row={rowIdx} col={spaceIdx}/>);
  }

  function handleMoveChange(e) {
    setMoveStr(e.target.value);
  }

  async function getMoveResponse() {
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
      const res = await fetch(`${apiBaseUrl}/move`, {
        method: 'POST',
        body: JSON.stringify(newBoard),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw res;
      } else if (res.ok) {
        const resJson = await res.json();
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

  async function handleSubmit(e) {
    if (e.key === 'Enter') {
      const moveValid = isValidMove(moveStr, board);
      // If the move is valid, modify the board with the move,
      // and send to backend
      if (moveValid) {
        getMoveResponse();
      }
    }
  }

  function handleSubmitClick() {
    const moveValid = isValidMove(moveStr, board);
    // If the move is valid, modify the board with the move,
    // and send to backend
    if (moveValid) {
      getMoveResponse();
    }
  }

  function handlePositionClick(row, col, pieceColor) {
    const strPos = boardPositionToString(row, col);
    let newStr = clickMoveStr.split(' ');
    if (pieceColor === 'w') {
      // Set first part of move
      newStr[0] = strPos;
    } else {
      // Set second part of move
      newStr[1] = strPos;
    }
    newStr = newStr.join(' ');
    setClickMoveStr(newStr);
    setMoveStr(newStr);
  }

  return (
    <>
      <Container>
        <TopBar/>
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
            <BoardStatusText board={board} isStalemate={isStalemate} checkmatedColor={checkmatedColor} currTurn={currTurn} withinTurns={withinTurns}/>
            <EnterMoves isStalemate={isStalemate} checkmatedColor={checkmatedColor} clickMoveStr={clickMoveStr} handleMoveChange={handleMoveChange} handleSubmit={handleSubmit} handleSubmitClick={handleSubmitClick}/>
            <div className='buttonContainer'>
              <Button onClick={getBoardAndReset} variant='outlined'>New Puzzle</Button>
            </div>
            <div className='buttonContainer'>
              <Button onClick={resetBoard} variant='outlined'>Restart Puzzle</Button>
            </div>
          </> :
          <></>
          }
        </Paper>
      </Container>
      <Footer/>
    </>
  );
}
