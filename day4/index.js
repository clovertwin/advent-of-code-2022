const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const pairsData = data.split("\n");
  partOne(pairsData);
  partTwo(pairsData);
});

function partOne(data) {
  let fullyContainedPairs = 0;
  data.forEach((pairData) => {
    const [rangeOne, rangeTwo] = getRangePair(pairData);
    const firstContains =
      rangeOne[0] <= rangeTwo[0] && rangeOne[1] >= rangeTwo[1] ? true : false;
    const secondContains =
      rangeTwo[0] <= rangeOne[0] && rangeTwo[1] >= rangeOne[1] ? true : false;
    if (firstContains || secondContains) fullyContainedPairs += 1;
  });
  console.log("Part One: ", fullyContainedPairs);
}

function partTwo(data) {
  let overlaps = 0;
  data.forEach((pairData) => {
    const [rangeOne, rangeTwo] = getRangePair(pairData);
    const overlapStart =
      rangeOne[0] <= rangeTwo[0] && rangeOne[1] >= rangeTwo[0] ? true : false;
    const overlapEnd =
      rangeOne[0] <= rangeTwo[1] && rangeOne[1] >= rangeTwo[1] ? true : false;
    const firstContains =
      rangeOne[0] <= rangeTwo[0] && rangeOne[1] >= rangeTwo[1] ? true : false;
    const secondContains =
      rangeTwo[0] <= rangeOne[0] && rangeTwo[1] >= rangeOne[1] ? true : false;
    if (overlapStart || overlapEnd || firstContains || secondContains)
      overlaps += 1;
  });
  console.log("Part Two: ", overlaps);
}

function getRangePair(dataString) {
  const splitPair = dataString.split(",");
  const rangePair = [];
  splitPair.forEach((pair) => {
    const range = pair.split("-");
    range[0] = +range[0];
    range[1] = +range[1];
    rangePair.push(range);
  });
  return rangePair;
}
