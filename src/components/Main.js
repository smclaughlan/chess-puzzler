import React from 'react';
import {Button, Container, Paper, Grid, Typography } from '@material-ui/core';
import Piece from './Piece';

export default function Main(props) {
  const [board, setBoard] = React.useState();

  React.useEffect(() => {
    async function getBoardFetch() {
      console.log('componentDidMount ran');
      const res = await fetch(`http://localhost:5000/`);
      if (res.ok) {
        const bd = await res.json();
        setBoard(bd.brd.board);
        console.log(board);
      }
    }

    getBoardFetch();
  }, []);


  return (
    <>
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          board.map((rowArr) => {
            return (
            rowArr.map((spaceOrPiece) => {
              console.log('spaceOrPiece: ', spaceOrPiece);
              return (<Piece props={spaceOrPiece}/>)
            }))
          })
          :
          <Typography>No board</Typography> }
      </Container>
    </>
  )
}
