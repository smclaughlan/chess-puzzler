/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {Typography} from '@material-ui/core';

/**
 * Returns different text based on whether there is a stalemate, checkmate,
 * or continued play.
 * @param {*} props
 * @return {*}
 */
export default function BoardStatusText(props) {
  if (props.isStalemate) {
    return (
      <Typography>Stalemate on turn {props.currTurn}.</Typography>
    );
  } else if (props.checkmatedColor !== null) {
    if (props.checkmatedColor === 'b') {
      return (
        <Typography>White found checkmate on turn {props.currTurn}.</Typography>
      );
    } else {
      return (
        <Typography>Black found checkmate on turn {props.currTurn}.</Typography>
      );
    }
  } else {
    return (
      <>
        <Typography>Try to find checkmate for white. This is turn {props.currTurn}.</Typography>
        <Typography>Note: For the purposes of these puzzles, pawns do not promote.</Typography>
      </>
    );
  }
}
