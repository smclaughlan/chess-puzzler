import React from 'react';

export default function Piece(props) {
  const [p, setP] = React.useState();
  const [spaceColor, setSpaceColor] = React.useState();
  const [iconPath, setIconPath] = React.useState();
  const [squarePath, setSquarePath] = React.useState();

  React.useEffect(() => {
    setP(props.spaceOrPiece);
    setSpaceColor(props.spaceColor);
  }, [props]);

  React.useEffect(() => {
    if (p && p.color) {
      setIconPath(`./pieceIcons/${p.color}_${p.pieceType}_.svg`);
    }

  }, [p])

  React.useEffect(() => {
    setSquarePath(`./squares/${props.spaceColor}.png`);
  }, [props.spaceColor])

  return (
    <div className="boardParent">
      {p && p.color ?
      <img className='boardPiece' alt='chess piece' src={iconPath}/> :
      <></>}
      <img className='boardSpace' alt='chess board space' src={squarePath}/>
    </div>
  )
}
