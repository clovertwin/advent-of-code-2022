const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  let allItems = data.split("\n");
  partOne(allItems);
  partTwo(allItems);
});

function partOne(d) {
  let commonItems = [];
  d.forEach((items) => {
    let firstHalf = items.slice(0, items.length / 2);
    let secondHalf = items.slice(items.length / 2);
    for (let item of firstHalf) {
      if (secondHalf.includes(item)) {
        commonItems.push(item);
        break;
      }
    }
  });
  let sum = commonItems.reduce((acc, cur) => {
    if (cur.charCodeAt(0) > 90) {
      acc += cur.charCodeAt(0) - 96;
    } else {
      acc += cur.charCodeAt(0) - 38;
    }
    return acc;
  }, 0);
  console.log("Part One: ", sum);
}

function partTwo(d) {
  let groups = [];
  for (let i = 0; i < d.length; i += 3) {
    groups.push(d.slice(i, i + 3));
  }
  let badges = [];
  groups.forEach((group) => {
    let lowToHigh = group.sort((a, b) => a.length - b.length);
    for (let item of lowToHigh[0]) {
      if (lowToHigh[1].includes(item) && lowToHigh[2].includes(item)) {
        badges.push(item);
        break;
      }
    }
  });
  let sum = badges.reduce((acc, cur) => {
    if (cur.charCodeAt(0) > 90) {
      acc += cur.charCodeAt(0) - 96;
    } else {
      acc += cur.charCodeAt(0) - 38;
    }
    return acc;
  }, 0);
  console.log("Part Two: ", sum);
}
