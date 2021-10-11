/**
 * Returns the array position of a string.
 * 'a8' would result in [0, 0].
 * 'a1' would result in [7, 0].
 * @param {String} str - 'c5', 'a1', etc.
 * @return {Array} - [x, y]
 */
export function stringToBoardPosition(str) {
  const letters = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
  };
  const nums = {
    '8': 0,
    '7': 1,
    '6': 2,
    '5': 3,
    '4': 4,
    '3': 5,
    '2': 6,
    '1': 7,
  };

  const strLetter = str[0];
  const strNum = str[1];

  return [nums[strNum], letters[strLetter]];
}
