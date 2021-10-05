import React from 'react';
import {Button, Container, Paper, Stack, Typography } from '@material-ui/core';
import Piece from './Piece';

export default function Main(props) {
  const [board, setBoard] = React.useState();
  let [spaceColor, setSpaceColor] = React.useState('d');
  let [spaceCount, setSpaceCount] = React.useState(0);

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
      <Stack key={rowIdx} direction="row" spacing={0}>
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
    return (<Piece props={spaceOrPiece}/>)
  }


  return (
    <>
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          board.map((rowArr, rowIdx) => {
            return (boardRow(rowArr, rowIdx))
          })
            :
            <Typography>No board found. Please reload the page and try again.</Typography>
        }
      </Container>
    </>
  )
}
