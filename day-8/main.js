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

part1();
