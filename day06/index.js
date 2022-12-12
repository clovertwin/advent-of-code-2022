const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  handleData(data, 4, "Part One: ");
  handleData(data, 14, "Part Two: ");
});

function handleData(d, charLength, message) {
  let marker;
  for (let i = 0; i < d.length; i++) {
    let charSet = d.slice(i, i + charLength);
    let check = "";
    for (let k = 0; k < charSet.length; k++) {
      let isMatch = false;
      for (let l = 0; l < charSet.length; l++) {
        if (k === l) continue;
        if (charSet[k] === charSet[l]) isMatch = true;
      }
      if (!isMatch) check += charSet[k];
    }
    if (charSet === check) {
      marker = i + charLength;
      break;
    }
  }
  console.log(message, marker);
}
