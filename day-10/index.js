const fs = require("node:fs");

/** @type {Array<{shape: string, move: {from: string, to: string, dx: number, dy: number}[]}>} */
const pipes = [
  {
    shape: "|",
    move: [
      { from: "N", to: "S", dx: 0, dy: 1 },
      { from: "S", to: "N", dx: 0, dy: -1 },
    ],
  },
  {
    shape: "-",
    move: [
      { from: "E", to: "W", dx: -1, dy: 0 },
      { from: "W", to: "E", dx: 1, dy: 0 },
    ],
  },
  {
    shape: "L",
    move: [
      { from: "N", to: "E", dx: 1, dy: 0 },
      { from: "E", to: "N", dx: 0, dy: -1 },
    ],
  },
  {
    shape: "J",
    move: [
      { from: "N", to: "W", dx: -1, dy: 0 },
      { from: "W", to: "N", dx: 0, dy: -1 },
    ],
  },
  {
    shape: "7",
    move: [
      { from: "W", to: "S", dx: 0, dy: 1 },
      { from: "S", to: "W", dx: -1, dy: 0 },
    ],
  },
  {
    shape: "F",
    move: [
      { from: "E", to: "S", dx: 0, dy: 1 },
      { from: "S", to: "E", dx: 1, dy: 0 },
    ],
  },
];

/**
 *
 * @param {string} direction
 */
const opposite = (direction) => {
  switch (direction) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "E":
      return "W";
    case "W":
      return "E";
  }
  throw Error(`invalid direction ${direction}`);
};

/**
 * @param {string[][]} map
 * @param {number} x
 * @param {number} y
 * @param {"N" | "E" | "S" | "W"} from
 * @param {number} distance
 * @param {boolean[][]} visited
 * @returns {number}
 */
function walk(map, x, y, from, distance, visited) {
  if (map[y][x] === "S") {
    return distance;
  }

  if (visited[y][x]) {
    throw Error(
      `this pipe has already been visited, coordinates: (${x}, ${y})`
    );
  }

  visited[y][x] = true;

  const pipe = pipes.find((p) => p.shape === map[y][x]);

  if (!pipe) {
    throw Error(`unknown pipe ${map[y][x]}`);
  }

  const movement = pipe.move.find((m) => m.from === from);

  if (!movement) {
    throw Error(`unknown movement from ${from} for pipe ${pipe.shape}`);
  }

  return walk(
    map,
    x + movement.dx,
    y + movement.dy,
    opposite(movement.to),
    distance + 1,
    visited
  );
}

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

/** @type {{x: number, y: number} | null} */
let start = null;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("S")) {
    console.log(
      `The starting point is at line ${i + 1}, column ${
        lines[i].indexOf("S") + 1
      }`
    );
    start = { x: lines[i].indexOf("S") || -1, y: i };
    break;
  }
}

if (!start) {
  throw Error("could not find a starting point");
}

const map = lines.map((line) => line.split(""));

/** @type {boolean[][]} */
const visited = new Array(lines.length);

for (let i = 0; i < visited.length; i++) {
  visited[i] = new Array(lines[0].length).fill(false);
}

visited[start.y][start.x] = true;
const res = walk(map, start.x, start.y + 1, "N", 1, visited);

console.log({ res });
