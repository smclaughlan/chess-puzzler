import React from 'react';
import {Avatar } from '@material-ui/core';

export default function Piece(props) {
  const [p, setP] = React.useState();
  const [iconPath, setIconPath] = React.useState();

  React.useEffect(() => {
    setP(props.props);
  }, [props]);

  React.useEffect(() => {
    if (p && p.color) {
      setIconPath(`./pieceIcons/${p.color}_${p.pieceType}_.svg`);
    }
  }, [p])

  return (
    <>
      {p && p.pieceType ?
      <Avatar src={iconPath} />:
      <div>____</div>}
    </>
  )
}
