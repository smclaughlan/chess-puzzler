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
  const colorInCheck = props.checkedColor;

  const showDefaultText =
  colorInCheck === null &&
  props.isStalemate === false &&
  props.checkmatedColor === null;

  if (showDefaultText) {
    return (
      <>
        <Typography>Try to find checkmate for white. This is turn {props.currTurn}.</Typography>
        <Typography>Note: For the purposes of these puzzles, pawns do not promote.</Typography>
      </>
    )
  }

  return (
    <>
      {colorInCheck === 'w' && props.checkmatedColor === null ?
        <Typography>White in check!</Typography>
      :
        <></>
      }
      {colorInCheck === 'b' && props.checkmatedColor === null ?
        <Typography>Black in check!</Typography>
      :
        <></>
      }
      {props.isStalemate ?
        <Typography>Stalemate on turn {props.currTurn}.</Typography>
      :
        <></>
      }
      {props.checkmatedColor === 'b' ?
        <Typography>White found checkmate on turn {props.currTurn}.</Typography>
      :
        <></>
      }
      {props.checkmatedColor === 'w' ?
        <Typography>Black found checkmate on turn {props.currTurn}.</Typography>
      :
        <></>
      }
    </>
  )
}
