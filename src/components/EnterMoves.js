/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {TextField, Button} from '@material-ui/core';

/**
 * Displays textfield and button for user interaction as long as
 * no stalemate or checkmate has occurred.
 * @param {*} props
 * @return {*}
 */
export default function EnterMoves(props) {
  if (props.isStalemate === true) {
    return (<></>);
  }
  if (props.checkmatedColor !== null) {
    return (<></>);
  }

  return (
    <div className='moveFieldParent'>
      <TextField label="Enter move (ie 'c5 c6')" variant="outlined" onChange={props.handleMoveChange} onKeyUp={props.handleSubmit}/>
      <Button onClick={props.handleSubmitClick}>Submit Move</Button>
    </div>
  );
}
