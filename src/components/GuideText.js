import React from "react";
import ReactMarkdown from "react-markdown";

export default function GuideText() {
  const markdown = `
  ## Guide
  ### Solving the puzzle
  * In each puzzle, you play as white.
  * White pawns always move up the board, while black pawns always move down the board.
  * To play, specify and submit moves.
  * A move consists of two positions:
    * A start position, where a white piece is located.
    * A destination position, which must be a valid chess move from the start position.
  * You can select a move two ways:
    * Click on a white piece to move followed by clicking on a destination position.
    * Manually type into the 'enter move' field a start position and destination position using the move notation below.
  * The start position must indicate a white piece to move.
  * The destination position must be valid for the start position piece, by traditional chess rules.
  * Read more about chess rules at Wikipedia: https://en.wikipedia.org/wiki/Rules_of_chess#Gameplay
  * Note that *pawns do not promote in the context of these puzzles.*
  * Press the submit button once you have selected a move.
  * Invalid moves will not be played.
  * Press the new puzzle button to try a different puzzle.
  * Pressing the restart button will reset the current puzzle, from the beginning.
  * The AI is deterministic. It will always play the same move in the same situations.

  ### Move notation
  * Positions are specified by column letter first, row number second.
  * 'c5' would indicate column c, row 5.
  * When indicating a move, the starting position is first, followed by the destination.
  * 'c5 c6' indicates a movement from position c5 to c6.
  * If an opposing piece is in the destination position, that indicates a piece will be captured.`;

  return (
    <ReactMarkdown
      className="guideText"
      children={markdown}
    />
  );
}
