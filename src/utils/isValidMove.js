/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {stringToBoardPosition} from './stringToBoardPosition';

export function isValidMove(moveString, board) {
  const letters = {
    'a': true,
    'b': true,
    'c': true,
    'd': true,
    'e': true,
    'f': true,
    'g': true,
    'h': true,
  };
  const nums = {
    '8': true,
    '7': true,
    '6': true,
    '5': true,
    '4': true,
    '3': true,
    '2': true,
    '1': true,
  };
  const mvStrSplit = moveString.split(' ');
  // If moveString split on space isn't length === 2, return false.
  if (mvStrSplit.length !== 2) return false;
  const firstPair = mvStrSplit[0];
  const secondPair = mvStrSplit[1];
  const firstPairLetter = firstPair[0];
  const firstPairNum = firstPair[1];
  const secondPairLetter = secondPair[0];
  const secondPairNum = secondPair[1];
  // If idx[0] of first pair isn't a-h, return false
  // If idx[1] of first pair isn't 1-8, return false
  if (!letters[firstPairLetter] || !nums[firstPairNum]) return false;
  // If idx[0] of second pair isn't a-h, return false
  // If idx[1] of second pair isn't 1-8, return false
  if (!letters[secondPairLetter] || !nums[secondPairNum]) return false;
  // At this point, seems the letters and number inputs are formatted correctly,
  // Now need to convert to board coords and check there
  const startCoords = stringToBoardPosition(firstPair);
  const endCoords = stringToBoardPosition(secondPair);

  const startPos = board.board[startCoords[0]][startCoords[1]];
  const endPos = board.board[endCoords[0]][endCoords[1]];
  // If there's no piece at the start position, return false
  if (startPos === '____') return false;
  // If the piece is not on white team, return false
  if (startPos.color !== 'w') return false;

  const validMoves = startPos.getValidMoves(board);
  // If the move is found in the validMoves, return true
  for (let i = 0; i < validMoves.length; i++) {
    const move = validMoves[i];
    const {endPosX, endPosY} = move;
    if (endCoords[0] === endPosX && endCoords[1] === endPosY) {
      return true;
    }
  }
  // If not found, return false
  return false;
}
