import React from 'react';
import {Button, Container, Paper, Grid, Typography } from '@material-ui/core';

export default function Main(props) {
  const [board, setBoard] = React.useState();

  React.useEffect(() => {
    async function getBoardFetch() {
      console.log('componentDidMount ran');
      const res = await fetch(`http://localhost:5000/`);
      if (res.ok) {
        const bd = await res.json();
        setBoard(bd);
      }
    }

    getBoardFetch();
  }, []);


  return (
    <>
      <Container>
        <Typography variant='h3' align='center'>Chess Puzzler</Typography>
        { board ?
          <Typography>Have board</Typography> :
          <Typography>No board</Typography> }
      </Container>
    </>
  )
}
