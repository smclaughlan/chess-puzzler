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
        <Grid container spacing={2}>
        { board ?
          board.map((rowArr) => {
            return (
              rowArr.map((spaceOrPiece) => {
                console.log('spaceOrPiece: ', spaceOrPiece);
                return (
                  <Grid item xs={2}>
                    <Piece props={spaceOrPiece}/>
                  </Grid>
                )
              }))
            })
            :
            <Typography>No board found. Please reload the page and try again.</Typography> }
        </Grid>
      </Container>
    </>
  )
}
