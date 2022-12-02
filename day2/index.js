const fs = require("fs");
const { cursorTo } = require("readline");

const options = {
  rock: {
    name: "rock",
    score: 1,
    loosesTo: "paper",
    defeats: "scissors",
  },
  paper: {
    name: "paper",
    score: 2,
    loosesTo: "scissors",
    defeats: "rock",
  },
  scissors: {
    name: "scissors",
    score: 3,
    loosesTo: "rock",
    defeats: "paper",
  },
};

const hands = {
  A: { ...options.rock },
  B: { ...options.paper },
  C: { ...options.scissors },
  X: { ...options.rock, outcome: "lose" },
  Y: { ...options.paper, outcome: "draw" },
  Z: { ...options.scissors, outcome: "win" },
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  handleData(data);
});

function handleData(data) {
  let splitData = data.split("\n");
  partOne(splitData);
  partTwo(splitData);
}

function partOne(data) {
  const scores = [];
  let roundScore = 0;
  data.forEach((round) => {
    let opponent = hands[round[0]];
    let player = hands[round[2]];
    if (opponent.defeats === player.name) {
      roundScore += player.score;
      scores.push(roundScore);
      roundScore = 0;
    } else if (opponent.loosesTo === player.name) {
      roundScore += player.score + 6;
      scores.push(roundScore);
      roundScore = 0;
    } else {
      roundScore += player.score + 3;
      scores.push(roundScore);
      roundScore = 0;
    }
  });
  const totalScore = scores.reduce((acc, cur) => acc + cur);
  console.log("Part 1: ", totalScore);
}

function partTwo(data) {
  const scores = [];
  let roundScore = 0;
  data.forEach((round) => {
    let opponent = hands[round[0]];
    let player = hands[round[2]];
    if (player.outcome === "lose") {
      player = options[opponent.defeats];
      roundScore += player.score;
      scores.push(roundScore);
      roundScore = 0;
    } else if (player.outcome === "draw") {
      player = options[opponent.name];
      roundScore += player.score + 3;
      scores.push(roundScore);
      roundScore = 0;
    } else if (player.outcome === "win") {
      player = options[opponent.loosesTo];
      roundScore += player.score + 6;
      scores.push(roundScore);
      roundScore = 0;
    }
  });
  const totalScore = scores.reduce((acc, cur) => acc + cur);
  console.log("Part 2: ", totalScore);
}
