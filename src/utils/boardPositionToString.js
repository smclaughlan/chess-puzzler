/**
 * Returns the string from row and idx numbers.
 * row=0 col=0 would result in 'a8'.
 * @param {Number} row - 0-7
 * @param {Number} col - 0-7
 * @return {String} - 'a0'
 */
export function boardPositionToString(row, col) {
  const columns = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
  };
  const rows = {
    0: '8',
    1: '7',
    2: '6',
    3: '5',
    4: '4',
    5: '3',
    6: '2',
    7: '1',
  };

  return `${columns[col]}${rows[row]}`;
}
