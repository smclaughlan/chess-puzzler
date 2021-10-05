import React from 'react';
import {Button, Container, Paper, Stack, Typography, TextField } from '@material-ui/core';
import Piece from './Piece';

export default function Main(props) {
  const [board, setBoard] = React.useState();
  const [boardNums, setBoardNums] = React.useState([8, 7, 6, 5, 4, 3, 2, 1]);
  const [boardLetters, setBoardLetters] = React.useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  let [spaceColor, setSpaceColor] = React.useState('d');

  React.useEffect(() => {
    async function getBoardFetch() {
      const res = await fetch(`http://localhost:5000/`);
      if (res.ok) {
        const bd = await res.json();
        setBoard(bd.brd.board);
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


  return (
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          board.map((rowArr, rowIdx) => {
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
            <div className='moveFieldParent'>
              <TextField  label="Enter move (ie 'c5 c6')" variant="outlined" />
            </div>
          </>
          :
          <></>
        }
      </Container>
  )
}
