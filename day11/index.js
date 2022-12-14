const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  handleData(data, 20);
  handleData(data, 10000, 2);
});

const getOperation = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
};

function getMonkeys(d) {
  const monkeys = [];
  d.forEach((line) => {
    let trimmedLine = line.trim();
    if (trimmedLine === "Monkey 0:") monkeys.push({ activity: 0 });
    if (trimmedLine === "") monkeys.push({ activity: 0 });
    if (trimmedLine.startsWith("Starting")) {
      monkeys[monkeys.length - 1].items = trimmedLine
        .split(":")[1]
        .split(",")
        .map((num) => +num);
    }
    if (trimmedLine.startsWith("Operation")) {
      monkeys[monkeys.length - 1].operation = trimmedLine.slice(17).split(" ");
    }
    if (trimmedLine.startsWith("Test:"))
      monkeys[monkeys.length - 1].divisible = +trimmedLine.slice(19);
    if (trimmedLine.startsWith("If true:"))
      monkeys[monkeys.length - 1].true = +trimmedLine.slice(25);
    if (trimmedLine.startsWith("If false:"))
      monkeys[monkeys.length - 1].false = +trimmedLine.slice(26);
  });
  return monkeys;
}

function handleData(d, rounds, part = 1) {
  const data = d.split("\n");
  const monkeys = getMonkeys(data);
  for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
      let length = monkey.items.length;
      for (let j = 0; j < length; j++) {
        monkey.activity++;
        let item = monkey.items.shift();
        item =
          isNaN(monkey.operation[2]) === true
            ? getOperation[monkey.operation[1]](item, item)
            : getOperation[monkey.operation[1]](item, +monkey.operation[2]);
        if (part === 1) {
          item = Math.floor(item / 3);
        } else if (part === 2) {
          const superModulo = monkeys
            .map((m) => m.divisible)
            .reduce((acc, cur) => acc * cur);
          item = item % superModulo;
        }
        item % monkey.divisible === 0
          ? monkeys[monkey.true].items.push(item)
          : monkeys[monkey.false].items.push(item);
      }
    }
  }
  const activityLevels = monkeys
    .reduce((acc, cur) => [...acc, cur.activity], [])
    .sort((a, b) => b - a);
  const monkeyBuisness = activityLevels[0] * activityLevels[1];
  part === 1
    ? console.log(`Part One: ${monkeyBuisness}`)
    : console.log(`Part Two: ${monkeyBuisness}`);
}
