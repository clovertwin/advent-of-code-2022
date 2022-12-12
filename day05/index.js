const fs = require("fs");
const { dirname } = require("path");

const stackMap1 = {};
const stackMap2 = {};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const newData = data.split("\n");
  partOne(newData);
  partTwo(newData);
});

function partOne(d) {
  const { data, stackNumsIndex } = buildStackMap(d, stackMap1);
  for (let i = stackNumsIndex + 2; i < data.length; i++) {
    let directions = data[i].split(" ");
    for (let j = 0; j < +directions[1]; j++) {
      let item = stackMap1[directions[3]].stack.pop();
      stackMap1[directions[5]].stack.push(item);
    }
  }
  let items = "";
  Object.entries(stackMap1).forEach(([key, props]) => {
    items += props.stack.at(-1);
  });
  console.log("Part One: ", items);
}

function partTwo(d) {
  const { data, stackNumsIndex } = buildStackMap(d, stackMap2);
  for (let i = stackNumsIndex + 2; i < data.length; i++) {
    let directions = data[i].split(" ");
    let container = [];
    for (let j = 0; j < +directions[1]; j++) {
      let item = stackMap2[directions[3]].stack.pop();
      if (item) container.push(item);
    }
    for (let k = container.length - 1; k >= 0; k--) {
      stackMap2[directions[5]].stack.push(container[k]);
    }
  }
  let items = "";
  Object.entries(stackMap2).forEach(([key, props]) => {
    items += props.stack.at(-1);
  });
  console.log("Part Two: ", items);
}

function buildStackMap(data, object) {
  let stackNumsIndex = data.findIndex((item) => item.includes("1"));
  let stackNumsString = data[stackNumsIndex];
  for (let i = 0; i < stackNumsString.length; i++) {
    if (stackNumsString[i] !== " ")
      object[stackNumsString[i]] = { id: i, stack: [] };
  }
  for (let i = stackNumsIndex - 1; i >= 0; i--) {
    for (let j = 0; j < stackNumsString.length; j++) {
      Object.entries(object).forEach(([key, props]) => {
        if (props.id === j && data[i][j] !== " ") {
          object[key].stack.push(data[i][j]);
        }
      });
    }
  }
  return { data, stackNumsIndex };
}
