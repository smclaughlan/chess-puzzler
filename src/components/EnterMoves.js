/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from "react";
import { TextField, Button } from "@material-ui/core";

/**
 * Displays textfield and button for user interaction as long as
 * no stalemate or checkmate has occurred.
 * @param {*} props
 * @return {*}
 */
export default function EnterMoves(props) {
  if (props.isStalemate === true) {
    return <></>;
  }
  if (props.checkmatedColor !== null) {
    return <></>;
  }

  return (
    <div className="enterMovesParent">
      {props.clickMoveStr !== "" ? (
        <>
          <TextField
            value={props.clickMoveStr}
            label=""
            variant="outlined"
            color="primary"
          />
        </>
      ) : (
        <TextField
          label="Enter move (ie 'c5 c6')"
          variant="outlined"
          color="primary"
          onChange={props.handleMoveChange}
          onKeyUp={props.handleSubmit}
        />
      )}
      <div className="buttonContainer">
        <Button
          className="button"
          onClick={props.handleSubmitClick}
          variant="outlined"
          color="primary"
        >
          Submit Move
        </Button>
      </div>
    </div>
  );
}
