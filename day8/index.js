const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const newData = data.split("\n");
  partOne(newData);
  partTwo(newData);
});

function partOne(d) {
  const treeMap1 = {};
  for (let i = 0; i < d.length; i++) {
    treeMap1[i] = {};
    for (let j = 0; j < d[i].length; j++) {
      if (i === 0 || i === d.length - 1 || j === 0 || j === d[i].length - 1) {
        treeMap1[i][j] = true;
      } else treeMap1[i][j] = false;
    }
  }
  for (let i = 1; i < d.length - 1; i++) {
    for (let j = 1; j < d[i].length - 1; j++) {
      let up = true;
      let right = true;
      let down = true;
      let left = true;
      for (let xu = i - 1; xu >= 0; xu--) {
        if (+d[xu][j] >= +d[i][j]) up = false;
      }
      for (let xr = j + 1; xr < d[i].length; xr++) {
        if (+d[i][xr] >= +d[i][j]) right = false;
      }
      for (let xd = i + 1; xd < d.length; xd++) {
        if (+d[xd][j] >= +d[i][j]) down = false;
      }
      for (let xl = j - 1; xl >= 0; xl--) {
        if (+d[i][xl] >= +d[i][j]) left = false;
      }
      if (up || right || down || left) treeMap1[i][j] = true;
    }
  }
  let totalVisible = 0;
  Object.keys(treeMap1).forEach((column) => {
    Object.values(treeMap1[column]).forEach((item) => {
      if (item === true) totalVisible += 1;
    });
  });
  console.log("Part One: ", totalVisible);
}

function partTwo(d) {
  const treeMap2 = {};
  for (let i = 1; i < d.length - 1; i++) {
    treeMap2[i] = {};
    for (let j = 1; j < d[i].length - 1; j++) {
      let up = 0;
      let right = 0;
      let down = 0;
      let left = 0;
      for (let xu = i - 1; xu >= 0; xu--) {
        if (+d[xu][j] < +d[i][j]) up += 1;
        else {
          up += 1;
          break;
        }
      }
      for (let xr = j + 1; xr < d[i].length; xr++) {
        if (+d[i][xr] < +d[i][j]) right += 1;
        else {
          right += 1;
          break;
        }
      }
      for (let xd = i + 1; xd < d.length; xd++) {
        if (+d[xd][j] < +d[i][j]) down += 1;
        else {
          down += 1;
          break;
        }
      }
      for (let xl = j - 1; xl >= 0; xl--) {
        if (+d[i][xl] < +d[i][j]) left += 1;
        else {
          left += 1;
          break;
        }
      }
      let total = up * right * down * left;
      treeMap2[i][j] = total;
    }
  }
  let greatestTotal = 0;
  Object.keys(treeMap2).forEach((column) => {
    Object.values(treeMap2[column]).forEach((item) => {
      if (+item > greatestTotal) greatestTotal = +item;
    });
  });
  console.log("Part Two: ", greatestTotal);
}
