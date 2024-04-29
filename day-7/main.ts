import fs from "node:fs";
import { compareHands } from "./lib";

function part1() {
  const file = fs.readFileSync("input.txt", "utf-8");
  const inputs: { hand: string; bid: number }[] = [];

  for (const line of file.split("\n")) {
    const [hand, bid] = line.split(" ");
    inputs.push({ hand, bid: Number.parseInt(bid) });
  }

  inputs.sort((a, b) => -compareHands(a.hand, b.hand));

  let result = 0;

  for (let i = 0; i < inputs.length; i++) {
    result += inputs[i].bid * (i + 1);
  }

  console.log(`part 1 = ${result}`);
}

part1();
