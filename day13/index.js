const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  partOne(data);
  partTwo(data);
});

/**
 * Credit to github.com/shahata for this one
 */

function check(a, b) {
  for (let i = 0; i < a.length && i < b.length; i++) {
    if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
      if (a[i] !== b[i]) return a[i] - b[i];
    } else {
      const result = check(
        Number.isInteger(a[i]) ? [a[i]] : a[i],
        Number.isInteger(b[i]) ? [b[i]] : b[i]
      );
      if (result !== 0) return result;
    }
  }
  return a.length - b.length;
}

function partOne(d) {
  let data = d
    .split("\n\n")
    .map((pair) => pair.split("\n").map((line) => JSON.parse(line)))
    .map((pair, i) => (check(...pair) < 0 ? i + 1 : 0))
    .reduce((acc, cur) => acc + cur);
  console.log(`Part One: ${data}`);
}

function partTwo(d) {
  const divider = [[[2]], [[6]]];
  const list = d
    .replaceAll("\n\n", "\n")
    .split("\n")
    .map((x) => JSON.parse(x))
    .concat(divider)
    .sort((a, b) => check(a, b));
  const result = divider
    .map((x) => list.indexOf(x) + 1)
    .reduce((acc, cur) => acc * cur);
  console.log(`Part Two: ${result}`);
}
