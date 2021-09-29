import React from 'react';
import {Button, Container, Paper, Grid, Typography } from '@material-ui/core';

export default function Main(props) {
  const [board, setBoard] = React.useState();

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
