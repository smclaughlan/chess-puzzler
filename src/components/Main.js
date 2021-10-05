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

  function boardRow(rowArr, idx) {
    return (
      <Stack key={idx} direction="row" spacing={0}>
        {rowArr.map((spaceOrPiece) => {
          return (boardLocation(spaceOrPiece))
        })}
      </Stack>
    )
  }

  function boardLocation(spaceOrPiece) {
    if (spaceCount === 8) {
      // To get correct pattern, don't switch color on 8th/final row fill
      spaceCount = 0;
    } else {
      spaceColor = spaceColor === 'l' ? 'd' : 'l';
      spaceCount = spaceCount + 1;
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
          board.map((rowArr, idx) => {
            return (boardRow(rowArr, idx))
          })
            :
            <Typography>No board found. Please reload the page and try again.</Typography>
        }
      </Container>
    </>
  )
}
