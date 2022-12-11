const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  partOne(data);
  partTwo(data);
});

/***
 *
 * All credit goes to github.com/shahata for this algorithm.
 * I am just posting so I can study it.
 *
 */

function partOne(d, len = 2, message = "Part One:") {
  /*
  create steps, which is an array of arrays containing the directions provided.
  create knots, an array of length provided where each item is an object with x and y set to 0.
  create visited, 
  */
  const steps = d.split("\n").map((line) => line.split(" "));
  const knots = new Array(len).fill().map(() => ({ x: 0, y: 0 }));
  //create a set to store unique locations that tail has visited.
  //the set is initialized with an array to store the whole string and not split it.
  const visited = new Set([`0,0`]);
  for (const [direction, count] of steps) {
    //for each step loop number of times to move,
    //move first knot (head) in direction of step
    for (let i = 0; i < +count; i++) {
      if (direction === "R") knots[0].x++;
      if (direction === "L") knots[0].x--;
      if (direction === "D") knots[0].y++;
      if (direction === "U") knots[0].y--;
      /*
      for this next part, imageine the number of knots is 3. 
      the for loop will run twice, on the first pass grab knots 
      1 and 2 and use 1 to figure where 2 should move, then on the 
      second pass, grab knots 2 and 3 and run the same logic for them.
      */
      for (let j = 1; j < knots.length; j++) {
        const [H, T] = [knots[j - 1], knots[j]];
        if (Math.abs(H.x - T.x) === 2 || Math.abs(H.y - T.y) === 2) {
          T.x = H.x === T.x ? T.x : H.x > T.x ? T.x + 1 : T.x - 1;
          T.y = H.y === T.y ? T.y : H.y > T.y ? T.y + 1 : T.y - 1;
        }
      }
      //after moving all knots one step, attempt to add string position of
      // last knot (tail) to the visited set
      visited.add(`${knots[len - 1].x},${knots[len - 1].y}`);
    }
  }
  console.log(`${message} ${visited.size}`);
}

function partTwo(d) {
  return partOne(d, 10, "Part Two:");
}
