import React from 'react';
import {Typography } from '@material-ui/core';

export default function Piece(props) {
  const [p, setP] = React.useState();

  React.useEffect(() => {
    setP(props.props);
  }, []);

  return (
    <>
      {p && p.pieceType ?
      <Typography>{p.color}_{p.pieceType}_</Typography> :
      <Typography>{p}</Typography>}
    </>
  )
}
