import React from 'react';
import {Button, Container, Paper, Stack, Typography } from '@material-ui/core';
import Piece from './Piece';

export default function Main(props) {
  const [board, setBoard] = React.useState();

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

  function boardRow(rowArr) {
    return (
      <Stack direction="row" spacing={3}>
        {rowArr.map((spaceOrPiece) => {
          return (boardLocation(spaceOrPiece))
        })}
      </Stack>
    )
  }

  function boardLocation(spaceOrPiece) {
    return (<Piece props={spaceOrPiece}/>)
  }


  return (
    <>
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          board.map((rowArr) => {
            return (boardRow(rowArr))
          })
            :
            <Typography>No board found. Please reload the page and try again.</Typography>
        }
      </Container>
    </>
  )
}
