const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  handleData(data);
});

function handleData(d) {
  let newData = d.split("\n");
  let sums = [];
  let sum = 0;
  for (let input of newData) {
    if (input === "") {
      sums.push(sum);
      sum = 0;
    } else {
      sum += +input;
    }
  }
  let maxCalories = Math.max(...sums);
  console.log("Max Calories ", maxCalories);
  let sumOfTopThree = sums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc + cur);
  console.log("Top Three Sum: ", sumOfTopThree);
}
