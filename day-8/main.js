import fs from "node:fs";

function part1() {
  const file = fs.readFileSync("input.txt", "utf-8");
  const lines = file.split("\n");
  const directions = lines[0].split("");

  /** @type Map<string, [string, string]>*/
  const map = new Map();

  for (let i = 2; i < lines.length; i++) {
    const matches = [...lines[i].matchAll(/[A-Z]{3}/g)].map(String);
    map.set(matches[0], [matches[1], matches[2]]);
  }

  let i = 0;
  let current = "AAA";

  while (current != "ZZZ") {
    const choices = map.get(current);
    if (!choices) {
      throw Error(`map does not have an entry with the key '${current}'`);
    }

    const [left, right] = choices;
    const direction = directions[i % directions.length];

    if (direction === "L") {
      current = left;
    } else if (direction === "R") {
      current = right;
    } else {
      throw Error(`unexpected direction value '${direction}'`);
    }

    i++;
  }

  console.log(`part 1 = ${i}`);
}

function part2BruteForce() {
  const file = fs.readFileSync("input.txt", "utf-8");
  const lines = file.split("\n");
  const directions = lines[0].split("");

  /** @type Map<string, [string, string]>*/
  const map = new Map();
  /** @type string[] */
  const currents = [];

  for (let i = 2; i < lines.length; i++) {
    const matches = [...lines[i].matchAll(/[A-Z]{3}/g)].map(String);
    map.set(matches[0], [matches[1], matches[2]]);
    if (matches[0].endsWith("A")) {
      currents.push(matches[0]);
    }
  }

  let i = 0;

  while (!currents.every((current) => current.endsWith("Z"))) {
    const direction = directions[i % directions.length];

    for (let i = 0; i < currents.length; i++) {
      const current = currents[i];
      const choices = map.get(current);
      if (!choices) {
        throw Error(`map does not have an entry with the key '${current}'`);
      }

      const [left, right] = choices;

      if (direction === "L") {
        currents[i] = left;
      } else if (direction === "R") {
        currents[i] = right;
      } else {
        throw Error(`unexpected direction value '${direction}'`);
      }
    }

    let count = 0;
    for (const current of currents) {
      if (current.endsWith("Z")) {
        count++;
      }
    }
    if (count > 2) {
      console.log(count, "> 1 @ ", i);
    }

    i++;
  }

  console.log(`part 2 = ${i}`);
}

function part2LCM() {
  const file = fs.readFileSync("input.txt", "utf-8");
  const lines = file.split("\n");
  const directions = lines[0].split("");

  /** @type Map<string, [string, string]>*/
  const map = new Map();
  /** @type string[] */
  const starts = [];

  for (let i = 2; i < lines.length; i++) {
    const matches = [...lines[i].matchAll(/[A-Z]{3}/g)].map(String);
    map.set(matches[0], [matches[1], matches[2]]);
    if (matches[0].endsWith("A")) {
      starts.push(matches[0]);
    }
  }

  const stepsToReachEnd = [];

  for (const start of starts) {
    let current = start;
    let i = 0;

    while (!current.endsWith("Z")) {
      const direction = directions[i % directions.length];

      const choices = map.get(current);
      if (!choices) {
        throw Error(`map does not have an entry with the key '${current}'`);
      }

      const [left, right] = choices;
      if (direction === "L") {
        current = left;
      } else if (direction === "R") {
        current = right;
      } else {
        throw Error(`unexpected direction value '${direction}'`);
      }

      i++;
    }

    stepsToReachEnd.push(i);
  }

  console.log(`part 2 = LCM(${stepsToReachEnd.join(", ")})`);
}

part1();
// part2BruteForce();
part2LCM();
