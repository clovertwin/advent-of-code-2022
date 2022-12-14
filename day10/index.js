const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  handleData(data);
});

function updateSignalStrength(cc, ssArray, v) {
  if (cc === 20) {
    ssArray.push(cc * v);
  } else if (cc % 40 === 20) {
    ssArray.push(cc * v);
  }
}

function buildCRT(v, screen) {
  let lastCRTLine = screen[screen.length - 1];
  if (lastCRTLine.length < 40) {
    if (
      lastCRTLine.length === v - 1 ||
      lastCRTLine.length === v ||
      lastCRTLine.length === v + 1
    ) {
      lastCRTLine.push("#");
    } else lastCRTLine.push(".");
  } else {
    let firstItem;
    if (0 === v - 1 || 1 === v || 2 === v + 1) {
      firstItem = "#";
    } else firstItem = ".";
    screen.push([firstItem]);
  }
}

function handleData(d) {
  const steps = d.split("\n").map((item) => item.split(" "));
  let cycleCount = 1;
  let x = 1;
  const signalStrength = [];
  const crt = [[]];
  for (let step of steps) {
    const [instruction, value] = step;
    if (instruction === "noop") {
      updateSignalStrength(cycleCount, signalStrength, x);
      buildCRT(x, crt);
      cycleCount++;
    } else if (instruction === "addx") {
      for (let i = 0; i < 2; i++) {
        updateSignalStrength(cycleCount, signalStrength, x);
        buildCRT(x, crt);
        cycleCount++;
      }
      x += +value;
    }
  }
  const signal = signalStrength.reduce((acc, cur) => acc + cur);
  console.log(`Part One: ${signal}`);
  console.log("Part Two:");
  crt.forEach((line) => console.log(line.join(" ")));
}
