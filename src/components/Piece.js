import React from 'react';
import {Button, Container, Paper, Grid, Typography } from '@material-ui/core';

export default function Piece(props) {
  const [p, setP] = React.useState();

  React.useEffect(() => {
    console.log(props.props);
    setP(props.props);
    console.log(p);
  }, []);
  return (
    <>
      {p && p.pieceType ?
      <Typography>{p.color}_{p.pieceType}_</Typography> :
      <Typography>{p}</Typography>}
    </>
  )
}
