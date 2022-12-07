const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const newData = data.split("\n");
  partOne(newData);
  partTwo(newData);
});

function calcTotals(fileSystem, totals = []) {
  const keys = Object.keys(fileSystem);
  let total = 0;
  for (const key of keys) {
    if (Number.isInteger(fileSystem[key])) total += fileSystem[key];
    else total += calcTotals(fileSystem[key], totals)[0];
  }
  totals.unshift(total);
  return totals;
}

function handleData(data) {
  const fileSystem = {};
  let currentDir = [];
  for (const line of data) {
    if (line.startsWith("$ cd")) {
      const path = line.slice(5);
      if (path === "/") currentDir = [];
      else if (path === "..") currentDir.pop();
      else currentDir.push(path);
    } else if (!line.startsWith("$")) {
      const [size, name] = line.split(" ");
      const cd = currentDir.reduce((obj, d) => obj[d], fileSystem);
      cd[name] = size === "dir" ? {} : +size;
    }
  }
  return calcTotals(fileSystem);
}

function partOne(data) {
  const totals = handleData(data);
  const total = totals
    .filter((x) => x <= 100000)
    .reduce((acc, cur) => acc + cur);
  console.log("Part One: ", total);
}

function partTwo(data) {
  const totals = handleData(data);
  const free = 70000000 - totals[0];
  const missing = 30000000 - free;
  const total = totals.filter((x) => x >= missing).sort((a, b) => a - b)[0];
  console.log("Part Two: ", total);
}
